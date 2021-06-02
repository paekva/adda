package com.ifmo.adda.service

import com.ifmo.adda.dao.toDto
import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.toOrderDto
import com.ifmo.adda.repository.CartRepository
import com.ifmo.adda.repository.OrdersRepository
import org.springframework.stereotype.Service
import java.lang.Exception

@Service
class CartService(
        private val cartRepository: CartRepository,
        private val ordersRepository: OrdersRepository
) {
    fun addProduct(clientId: Int, productId: Int) {
        if (cartRepository.cartIsEmpty(clientId)) cartRepository.addNewCart(clientId)
        cartRepository.addProductToCart(cartRepository.getCartId(clientId), productId)
    }

    @Throws(Exception::class)
    fun getCartContents(clientId: Int): CartDto {
        val cart = cartRepository.listCartForClient(clientId)
        if (cart.isEmpty()) throw Exception("Cart is empty")
        else return cart[0].toDto()
    }

    fun clearCart(clientId: Int) = cartRepository.clearCart(clientId)

    fun makeOrder(clientId: Int) = ordersRepository.createNormalOrder(getCartContents(clientId).toOrderDto())
}