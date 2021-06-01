package com.ifmo.adda.service

import com.ifmo.adda.controller.OrdersList
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.repository.CustomOrdersRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class OrdersService(
    private val ordersRepository: OrdersRepository,
    private val customOrdersRepository: CustomOrdersRepository
) {

    fun getOrders() = OrdersList(
        ordersRepository.findAll().map { it.toDto() } + customOrdersRepository.findAll().map { it.toDto() }
    )

    @Throws(Exception::class)
    fun getOrdersForClient(clientId: Int):OrdersList {
        val orders = ordersRepository.findNormalForClient(clientId).map { it.toDto() } +
                customOrdersRepository.findCustomForClient(clientId).map { it.toDto() }
        if (orders.isEmpty()) throw Exception("Orders for client with id $clientId not found")
        else return OrdersList(orders)
    }
}