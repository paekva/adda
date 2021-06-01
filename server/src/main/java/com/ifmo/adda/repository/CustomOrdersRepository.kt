package com.ifmo.adda.repository

import com.ifmo.adda.dao.CustomOrder
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface CustomOrdersRepository : JpaRepository<CustomOrder, Int> {

    @Query(
            "SELECT DISTINCT custom_order_item FROM CustomOrder custom_order_item WHERE custom_order_item.client = :clientId"
    )
    fun findCustomForClient(@Param("clientId") clientId: Int): List<CustomOrder>

}