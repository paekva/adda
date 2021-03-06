package com.ifmo.adda.service

import com.ifmo.adda.dao.*
import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.Status
import com.ifmo.adda.repository.CustomOrdersRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.Instant

@Service
class OrdersService(
    private val ordersRepository: OrdersRepository,
    private val customOrdersRepository: CustomOrdersRepository,
    private val productsService: ProductsService,
    private val userService: UserService
) {

    fun getOrders(): List<OrderDto> =
        ordersRepository.findAll().map { it.toDto() } + customOrdersRepository.findAll().map { it.toDto() }

    fun getOrdersForClient(clientId: Int): List<OrderDto> {
        val or = ordersRepository.findAllByClient(clientId)

        return or.map { it.toDto() } +
                customOrdersRepository.findAllByClient(clientId).map { it.toDto() }
    }

    fun getOrdersForWorker(workerId: Int): List<OrderDto> {
        val worker = userService.loadUserById(workerId)
        return ordersRepository.findAllByWorkersIsContaining(worker).map { it.toDto() } +
                customOrdersRepository.findAllByWorkersIsContaining(worker).map { it.toDto() }
    }

    fun makeCustomOrder(orderDto: OrderDto): OrderDto {
        val new = CustomOrder(
            client = orderDto.client,
            description = orderDto.description!!,
            dateOfOrder = Instant.ofEpochMilli(orderDto.dateOfOrder),
            dateOfReceive = Instant.ofEpochMilli(orderDto.dateOfReceive),
            status = getStatusIntItem(orderDto.status),
            price = orderDto.price!!,
            workers = selectWorkers(),
            lastError = null
        )
        val saved = customOrdersRepository.save(new)
        return saved.toDto()
    }

    fun makeNormalOrder(cart: CartDto): OrderDto {
        val new = Order(
            client = cart.client,
            dateOfOrder = Instant.now(),
            dateOfReceive = Instant.now().plusMillis(EXPECTED_DELIVERY_TIME),
            status = getStatusIntItem(Status.BUY_WAIT),
            products = ArrayList(),
            workers = selectWorkers(),
            lastError = null
        )

        cart.products?.forEach { it ->
            var tmp = it.quantity
            while (tmp > 0) {
                tmp--;
                new.products.add(productsService.getProduct(it.productId))
            }
        }
        val saved = ordersRepository.saveAndFlush(new)
        return saved.toDto()
    }

    fun selectWorkers(): MutableList<User> {
        val selected = mutableListOf<User>()
        val users = userService.getAllWorkers()
        users
            ?.map { it ->
                getWorkerActiveOrders(it)
            }
            ?.sortedBy { it -> it.second }
            ?.forEach { pair ->
                val allSelected = selected.map { it -> it.authorities }
                val newAuthority = pair.first.authorities
                val tmp = allSelected.map { i -> i.elementAt(0).id }.contains(newAuthority.elementAt(0).id)
                if (!tmp)
                    selected.add(pair.first)
            }

        return selected
    }

    fun getWorkerActiveOrders(user: User): Pair<User, Int> {
        val orders =
            user.id?.let { getOrdersForWorker(it) }
        val filtered = orders?.filter { o ->
            checkTaskYetToFinishForUser(
                o.status,
                user.authorities
            )
        }
        return Pair(
            user,
            filtered?.count() ?: 0
        )
    }

    fun checkTaskYetToFinishForUser(status: Status, roles: Collection<Authority>): Boolean {
        val purchaser = roles.contains(Authority(id = 6, name = "PURCHASER")) && getStatusIntItem(status) < 9
        val loader = roles.contains(Authority(id = 3, name = "LOADER")) && getStatusIntItem(status) < 13
        val master = roles.contains(Authority(id = 4, name = "MASTER")) && getStatusIntItem(status) < 21
        val courier = roles.contains(Authority(id = 5, name = "COURIER")) && getStatusIntItem(status) < 25
        return purchaser || loader || master || courier
    }

    fun cancelOrder(orderId: Int, isCustom: Boolean): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.CANCEL, null) else updateOrder(
            orderId,
            Transition.CANCEL,
            null
        )
    }

    fun acceptCustomOrder(orderId: Int, isCustom: Boolean, newPrice: String): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.ACCEPT, null, newPrice) else updateOrder(
            orderId,
            Transition.ACCEPT,
            null
        )
    }

    fun declineCustomOrder(orderId: Int, isCustom: Boolean, reason: String): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.DECLINE, reason) else updateOrder(
            orderId,
            Transition.DECLINE,
            reason
        )
    }

    fun acceptWork(orderId: Int, isCustom: Boolean, isAdmin: Boolean): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.ACCEPT, null) else updateOrder(
            orderId,
            Transition.ACCEPT,
            null
        )
    }

    fun declineWork(orderId: Int, isCustom: Boolean, reason: String?): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.DECLINE, reason) else updateOrder(
            orderId,
            Transition.DECLINE,
            reason
        )
    }

    fun startOrder(orderId: Int, isCustom: Boolean, roles: Collection<Authority>): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.START, null) else updateOrder(
            orderId,
            Transition.START,
            null
        )
    }

    fun sendOrderOnCheck(orderId: Int, isCustom: Boolean, roles: Collection<Authority>): OrderDto {
        return if (isCustom) updateCustomOrder(orderId, Transition.SEND_TO_CHECK, null) else updateOrder(
            orderId,
            Transition.SEND_TO_CHECK,
            null
        )
    }


    fun updateCustomOrder(id: Int, transition: Transition, reason: String?, price: String? = null): OrderDto {
        val order = customOrdersRepository.findById(id)
        val status = getStatusByTransition(order.get().status, transition)

        val newOrder = CustomOrder(
            id = order.get().id,
            client = order.get().client,
            description = order.get().description,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            status = status,
            price = price ?: order.get().price,
            workers = order.get().workers,
            lastError = reason
        )
        customOrdersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun updateOrder(id: Int, transition: Transition, reason: String?): OrderDto {
        val order = ordersRepository.findById(id)

        val status = getStatusByTransition(order.get().status, transition)
        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = status,
            workers = order.get().workers,
            lastError = reason
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun getStatusByTransition(prevStatus: Int, transition: Transition): Int {
        var status = prevStatus
        when (transition) {
            Transition.DECLINE ->
                status = orderDeclineMap[prevStatus]!!
            Transition.ACCEPT ->
                status = orderAcceptMap[prevStatus]!!
            Transition.START ->
                status = orderStartMap[prevStatus]!!
            Transition.SEND_TO_CHECK ->
                status = orderSendToCheckMap[prevStatus]!!
            Transition.CANCEL ->
                status = getStatusIntItem(Status.CANCELED)
            Transition.LANDED ->
                status = getStatusIntItem(Status.UNLOAD_WAIT)
        }
        return status
    }

    companion object {
        val EXPECTED_DELIVERY_TIME = Duration.ofDays(30).toMillis()
    }

    fun setOrdersAreOnMoon(): List<OrderDto> {
        val orders = ordersRepository.findAll()
            .filter { el -> getStatusEnumItem(el.status) == Status.ON_THE_WAY }
            .map { el -> updateOrder(el.id!!, Transition.LANDED, null) }
        val customOrders =
            customOrdersRepository.findAll()
                .filter { el -> getStatusEnumItem(el.status) == Status.ON_THE_WAY }
                .map { el -> updateCustomOrder(el.id!!, Transition.LANDED, null) }

        return orders + customOrders
    }
}

enum class Transition {
    DECLINE,
    ACCEPT,
    START,
    SEND_TO_CHECK,
    CANCEL,
    LANDED,
}