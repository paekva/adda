package com.ifmo.adda.repository

import com.ifmo.adda.dao.Cart
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param
import java.math.BigInteger

interface CartRepository: JpaRepository<Cart, BigInteger> {

    @Query(
            "SELECT DISTINCT cart FROM Cart cart " +
                    "INNER JOIN FETCH cart.products as products " +
                    "WHERE cart.client = :clientId"
    )
    fun findNormalForClient(@Param("clientId") clientId: BigInteger): List<Cart>

    @Query(
            "SELECT case when count(cart) > 0 then false else true end FROM Cart cart WHERE cart.client = :clientId"
    )
    fun cartIsEmpty(@Param("clientId") clientId: BigInteger): Boolean

    @Modifying
    @Query(
            value = "INSERT INTO cart (client) values (:clientId)", nativeQuery = true
    )
    fun addProductToCart(@Param("clientId") clientId: BigInteger): Unit
}