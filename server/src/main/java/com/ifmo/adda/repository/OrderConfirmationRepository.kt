package com.ifmo.adda.repository

import com.ifmo.adda.dao.OrderConfirmation
import org.springframework.data.jpa.repository.JpaRepository

interface OrderConfirmationRepository : JpaRepository<OrderConfirmation, Int> {
    fun findAllByOrderIdAndStatus(orderId: Int, status: Int): List<OrderConfirmation>
}