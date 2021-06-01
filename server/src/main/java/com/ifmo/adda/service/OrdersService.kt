package com.ifmo.adda.service

import com.ifmo.adda.controller.OrdersList
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class OrdersService(
    private val ordersRepository: OrdersRepository
) {

    fun getOrders() = OrdersList(
        ordersRepository.findAll().map { it.toDto() }
    )

    @Throws(Exception::class)
    fun getOrdersForClient(clientId: Int):OrdersList {
        val list = ordersRepository.findForClient(clientId)
        if (list.isEmpty()) throw Exception("Client with id $clientId not found")
        else return OrdersList(list.map { it.toDto() })
    }
}