package com.ifmo.adda.service

import com.ifmo.adda.dao.*
import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.repository.CustomOrdersRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import java.time.Duration
import java.time.Instant

@Service
class OrdersService(
    private val ordersRepository: OrdersRepository,
    private val customOrdersRepository: CustomOrdersRepository
) {

    fun getOrders(): List<OrderDto> =
        ordersRepository.findAll().map { it.toDto() } + customOrdersRepository.findAll().map { it.toDto() }

    fun getOrdersForClient(clientId: Int): List<OrderDto> =
        ordersRepository.findAllByClient(clientId).map { it.toDto() } +
                customOrdersRepository.findAllByClient(clientId).map { it.toDto() }

    fun makeCustomOrder(orderDto: OrderDto): OrderDto {
        val new = CustomOrder(
            client = orderDto.client,
            description = orderDto.description!!,
            dateOfOrder = Instant.ofEpochMilli(orderDto.dateOfOrder),
            dateOfReceive = Instant.ofEpochMilli(orderDto.dateOfReceive),
            status = getStatusIntItem(orderDto.status)
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
            products = cart.products.toMutableList()
        )
        val saved = ordersRepository.save(new)
        return saved.toDto()
    }

    companion object {
        val EXPECTED_DELIVERY_TIME = Duration.ofDays(30).toMillis()
    }
}