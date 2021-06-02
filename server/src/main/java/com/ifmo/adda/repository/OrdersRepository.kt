package com.ifmo.adda.repository

import com.ifmo.adda.dao.Order
import com.ifmo.adda.dto.OrderDto
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.math.BigInteger

interface OrdersRepository : JpaRepository<Order, Int> {

    @Query(
            "SELECT DISTINCT order_item FROM Order order_item " +
                    "INNER JOIN FETCH order_item.products as products " +
                    "WHERE order_item.client = :clientId"
    )
    fun findNormalForClient(@Param("clientId") clientId: Int): List<Order>

    @Modifying
    @Query(
            "INSERT INTO order_item (client, date_of_order, date_of_receive, status) VALUES (:orderDto.client, :orderDto.dateOfOrder, :orderDto.dateOfReceive, :orderDto:status)", nativeQuery = true
    )
    fun createNormalOrder(@Param("orderDto") orderDto: OrderDto)

    @Modifying
    @Query(
            "INSERT INTO custom_order_item (client, description, date_of_order, date_of_receive, status) VALUES (:orderDto.client, :orderDto.description, :orderDto.dateOfOrder, :orderDto.dateOfReceive, :orderDto:status)", nativeQuery = true
    )
    fun createCustomOrder(@Param("orderDto") orderDto: OrderDto)

}