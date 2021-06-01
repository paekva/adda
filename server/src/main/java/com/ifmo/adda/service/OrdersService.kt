package com.ifmo.adda.service

import com.ifmo.adda.controller.OrdersList
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service

@Service
class OrdersService(
    private val ordersRepository: OrdersRepository
) {

    fun getOrders() = OrdersList(
        ordersRepository.findAll().map { it.toDto() }
    )
}