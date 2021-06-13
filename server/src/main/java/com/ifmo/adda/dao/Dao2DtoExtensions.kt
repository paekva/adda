package com.ifmo.adda.dao

import com.ifmo.adda.dto.*

fun Product.toDto() = ProductDto(id!!, name, "$price SLG")

fun CustomOrder.toDto() = OrderDto(
    id!!,
    client,
    true,
    description,
    listOf(),
    dateOfOrder.toEpochMilli(),
    dateOfReceive.toEpochMilli(),
    getStatusEnumItem(status)
)

fun getStatusEnumItem(status: Int): Status =
    when (status) {
        1 -> Status.ACCEPTANCE
        2 -> Status.BUY
        3 -> Status.LOAD
        4 -> Status.UNLOAD
        5 -> Status.DELIVERY
        6 -> Status.PREPARE
        7 -> Status.ON_THE_WAY
        8 -> Status.UNKNOWN
        else -> Status.UNKNOWN
    }

fun getStatusIntItem(status: Status): Int =
    when (status) {
        Status.ACCEPTANCE -> 1
        Status.BUY -> 2
        Status.LOAD -> 3
        Status.UNLOAD -> 4
        Status.DELIVERY -> 5
        Status.PREPARE -> 6
        Status.ON_THE_WAY -> 7
        Status.UNKNOWN -> 8
        else -> 0
    }


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
        getStatusEnumItem(status)
    )
}

