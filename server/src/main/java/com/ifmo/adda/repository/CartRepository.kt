package com.ifmo.adda.repository

import com.ifmo.adda.dao.Cart
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.data.jpa.repository.Modifying
import org.springframework.data.jpa.repository.Query
import org.springframework.data.repository.query.Param

interface CartRepository: JpaRepository<Cart, Int> {

    @Query(
            "SELECT DISTINCT cart FROM Cart cart " +
                    "INNER JOIN FETCH cart.products as products " +
                    "WHERE cart.client = :clientId"
    )
    fun listCartForClient(@Param("clientId") clientId: Int): List<Cart>

    @Query(
            "SELECT DISTINCT cart.id FROM Cart cart WHERE cart.client = :clientId"
    )
    fun getCartId(@Param("clientId") clientId: Int): Int

    @Query(
            "SELECT case when count(cart) > 0 then false else true end FROM Cart cart WHERE cart.client = :clientId"
    )
    fun cartIsEmpty(@Param("clientId") clientId: Int): Boolean

    @Modifying
    @Query(
            "INSERT INTO cart (client) values (:clientId)", nativeQuery = true
    )
    fun addNewCart(@Param("clientId") clientId: Int)

    @Modifying
    @Query(
            "INSERT INTO product_to_cart values (:cartId, :productId, 1) ON CONFLICT ON CONSTRAINT product_to_cart_pkey DO UPDATE SET quantity = quantity + 1", nativeQuery = true
    )
    fun addProductToCart(@Param("cartId") cartId: Int, @Param("productId") productId: Int)

    @Modifying
    @Query(
            "DELETE FROM cart WHERE id = :cartId", nativeQuery = true
    )
    fun clearCart(@Param("cartId") cartId: Int)
}