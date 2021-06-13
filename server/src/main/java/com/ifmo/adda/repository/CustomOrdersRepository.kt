package com.ifmo.adda.repository

import com.ifmo.adda.dao.CustomOrder
import org.springframework.data.jpa.repository.JpaRepository

interface CustomOrdersRepository : JpaRepository<CustomOrder, Int> {
    fun findAllByClient(c: Int): List<CustomOrder>
}