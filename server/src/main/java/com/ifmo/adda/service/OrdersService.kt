package com.ifmo.adda.service

import com.ifmo.adda.dao.*
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
    private val userService: UserService
) {

    fun getOrders(): List<OrderDto> =
        ordersRepository.findAll().map { it.toDto() } + customOrdersRepository.findAll().map { it.toDto() }

    fun getOrdersForClient(clientId: Int): List<OrderDto> =
        ordersRepository.findAllByClient(clientId).map { it.toDto() } +
                customOrdersRepository.findAllByClient(clientId).map { it.toDto() }

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
            /// TODO: replace with selection of workers
            workers = mutableListOf()
        )
        val saved = customOrdersRepository.save(new)
        return saved.toDto()
    }

    fun makeNormalOrder(cart: Cart): OrderDto {
        val new = Order(
            client = cart.client,
            dateOfOrder = Instant.now(),
            dateOfReceive = Instant.now().plusMillis(EXPECTED_DELIVERY_TIME),
            status = 10,
            products = cart.products.toMutableList(),
            /// TODO: replace with selection of workers
            workers = mutableListOf()
        )
        val saved = ordersRepository.save(new)
        return saved.toDto()
    }

    fun cancelOrder(orderId: Int): OrderDto {
        val order = ordersRepository.findById(orderId)
        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = getStatusIntItem(Status.CANCELED),
            workers = order.get().workers
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun acceptOrder(orderId: Int): OrderDto {
        val order = ordersRepository.findById(orderId)

        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = order.get().status + 2,
            workers = order.get().workers
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun declineOrder(orderId: Int, isAdmin: Boolean): OrderDto {
        val order = ordersRepository.findById(orderId)
        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = order.get().status + if (isAdmin) 1 else 2,
            workers = order.get().workers
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun startOrder(orderId: Int): OrderDto {
        val order = ordersRepository.findById(orderId)
        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = order.get().status + 1,
            workers = order.get().workers
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    fun sendOrderOnCheck(orderId: Int): OrderDto {
        val order = ordersRepository.findById(orderId)
        var newStatus = order.get().status + 1
        while (getStatusEnumItem(newStatus) == Status.UNKNOWN) {
            newStatus += 1
        }
        val newOrder = Order(
            id = order.get().id,
            client = order.get().client,
            dateOfOrder = order.get().dateOfOrder,
            dateOfReceive = order.get().dateOfReceive,
            products = order.get().products,
            status = newStatus,
            workers = order.get().workers
        )
        ordersRepository.save(newOrder)
        return newOrder.toDto()
    }

    companion object {
        val EXPECTED_DELIVERY_TIME = Duration.ofDays(30).toMillis()
    }
}