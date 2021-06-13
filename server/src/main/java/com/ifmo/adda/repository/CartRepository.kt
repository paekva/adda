package com.ifmo.adda.repository

import com.ifmo.adda.dao.Cart
import org.springframework.data.jpa.repository.JpaRepository

interface CartRepository : JpaRepository<Cart, Int> {
    fun findByClient(c: Int): Cart?
}