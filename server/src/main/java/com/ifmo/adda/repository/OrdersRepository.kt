package com.ifmo.adda.repository

import com.ifmo.adda.dao.Order
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.math.BigInteger

interface OrdersRepository : JpaRepository<Order, BigInteger> {

    @Query(
            "SELECT DISTINCT order_item FROM Order order_item " +
                    "INNER JOIN FETCH order_item.products as products " +
                    "WHERE order_item.client = :clientId"
    )
    fun findNormalForClient(@Param("clientId") clientId: BigInteger): List<Order>

}