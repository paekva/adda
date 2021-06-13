package com.ifmo.adda.service

import com.ifmo.adda.dao.Cart
import com.ifmo.adda.dao.toDto
import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.exception.BadRequestException
import com.ifmo.adda.repository.CartRepository
import org.springframework.stereotype.Service

@Service
class CartService(
    private val cartRepository: CartRepository,
    private val productsService: ProductsService,
    private val ordersService: OrdersService
) {

    fun addProduct(clientId: Int, productId: Int): CartDto {
        val cart = getCartForUser(clientId)
        cart.products.add(productsService.getProduct(productId))
        cartRepository.save(cart)
        return getCartDtoForUser(clientId)
    }

    fun deleteProduct(clientId: Int, productId: Int): CartDto {
        val cart = getCartForUser(clientId)
        cart.products.removeIf { it.id == productId }
        cartRepository.save(cart)
        return getCartDtoForUser(clientId)
    }

    fun getCartContents(clientId: Int): CartDto {
        return getCartDtoForUser(clientId)
    }

    fun clearCart(clientId: Int): CartDto {
        val cart = getCartForUser(clientId)
        cart.products.clear()
        cartRepository.save(cart)
        return getCartDtoForUser(clientId)
    }

    fun getCartForUser(clientId: Int): Cart {
        val cart = cartRepository.findByClient(clientId)
        return if (cart == null) {
            val newCart = Cart(client = clientId, products = ArrayList())
            cartRepository.save(newCart)
            getCartForUser(clientId)
        } else {
            cart
        }
    }

    fun convertCartToOrder(clientId: Int): OrderDto {
        val cart = getCartForUser(clientId)
        if (cart.products.isEmpty()) throw BadRequestException("unable to create order from empty cart")
        val order = ordersService.makeNormalOrder(cart)
        clearCart(clientId)
        return order
    }

    fun getCartDtoForUser(clientId: Int): CartDto {
        return getCartForUser(clientId).toDto()
    }
}