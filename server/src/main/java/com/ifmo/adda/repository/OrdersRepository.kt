package com.ifmo.adda.repository

import com.ifmo.adda.dao.Order
import org.springframework.data.jpa.repository.JpaRepository

interface OrdersRepository : JpaRepository<Order, Int>