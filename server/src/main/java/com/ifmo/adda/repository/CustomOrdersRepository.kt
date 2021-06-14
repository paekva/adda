package com.ifmo.adda.repository

import com.ifmo.adda.dao.CustomOrder
import com.ifmo.adda.dao.User
import org.springframework.data.jpa.repository.JpaRepository

interface CustomOrdersRepository : JpaRepository<CustomOrder, Int> {
    fun findAllByClient(c: Int): List<CustomOrder>
    fun findAllByWorkersIsContaining(u: User): List<CustomOrder>

}