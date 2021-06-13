package com.ifmo.adda.service

import com.ifmo.adda.dao.toDto
import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.dto.toOrderDto
import com.ifmo.adda.repository.CartRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class CartService(
    private val cartRepository: CartRepository,
    private val ordersRepository: OrdersRepository
) {
    @Transactional
    fun addProduct(clientId: Int, productId: Int): CartDto {
        if (cartRepository.cartIsEmpty(clientId)) cartRepository.addNewCart(clientId)

        val id = cartRepository.getCartId(clientId)
        cartRepository.addProductToCart(id, productId)

        return getCartForTheUser(clientId)
    }

    @Throws(Exception::class)
    fun getCartContents(clientId: Int): CartDto {
        return getCartForTheUser(clientId)
    }

    @Transactional
    fun clearCart(clientId: Int): CartDto {
        cartRepository.clearCart(clientId)
        return getCartForTheUser(clientId)
    }

    fun makeOrder(clientId: Int) = ordersRepository.createNormalOrder(getCartContents(clientId).toOrderDto())

    fun getCartForTheUser(clientId: Int): CartDto {
        val cart = cartRepository.listCartForClient(clientId)
        if (cart.isEmpty()) throw Exception("Cart is empty")
        else return cart[0].toDto()
    }
}