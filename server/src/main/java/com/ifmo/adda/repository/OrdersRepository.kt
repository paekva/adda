package com.ifmo.adda.repository

import com.ifmo.adda.dao.Order
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface OrdersRepository : JpaRepository<Order, Int> {

    @Query(
            "SELECT DISTINCT order_item FROM Order order_item WHERE order_item.client = :clientId"
    )
    fun findForClient(@Param("clientId") clientId: String): List<Order>
}