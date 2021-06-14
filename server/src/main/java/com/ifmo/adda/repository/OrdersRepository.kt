package com.ifmo.adda.repository

import com.ifmo.adda.dao.Order
import com.ifmo.adda.dao.User
import org.springframework.data.jpa.repository.JpaRepository

interface OrdersRepository : JpaRepository<Order, Int> {
    fun findAllByClient(c: Int): List<Order>

    fun findAllByWorkersIsContaining(u: User): List<Order>
}