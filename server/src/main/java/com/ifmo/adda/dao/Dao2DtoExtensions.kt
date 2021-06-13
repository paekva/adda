package com.ifmo.adda.dao

import com.ifmo.adda.dto.CartDto
import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.ProductDto
import com.ifmo.adda.dto.ProductToQuantity

fun Product.toDto() = ProductDto(id!!, name, "$price SLG")

fun CustomOrder.toDto() = OrderDto(
    id!!,
    client,
    true,
    description,
    listOf(),
    dateOfOrder.toEpochMilli(),
    dateOfReceive.toEpochMilli(),
    status
)

fun Cart.toDto(): CartDto {
    val productsWithQuantities: List<ProductToQuantity> = if (products.isEmpty()) {
        listOf()
    } else {
        products.groupBy { it.id }.map {
            ProductToQuantity(it.key!!, it.value.size)
        }
    }
    return CartDto(id!!, client, productsWithQuantities)
}

fun Order.toDto(): OrderDto {
    val productsWithQuantities: List<ProductToQuantity> = if (products.isEmpty()) {
        listOf()
    } else {
        products.groupBy { it.id }.map {
            ProductToQuantity(it.key!!, it.value.size)
        }
    }
    return OrderDto(
        id!!,
        client,
        false,
        "",
        productsWithQuantities,
        dateOfOrder.toEpochMilli(),
        dateOfReceive.toEpochMilli(),
        status
    )
}

