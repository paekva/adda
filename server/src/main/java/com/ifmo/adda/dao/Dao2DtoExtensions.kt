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
        2 -> Status.RETURNED
        3 -> Status.BUY_WAIT
        4 -> Status.BUY
        5 -> Status.BUY_WAIT_ACCEPTANCE
        6 -> Status.BUY_ERROR
        7 -> Status.LOAD_WAIT
        8 -> Status.LOAD
        9 -> Status.ON_THE_WAY
        10 -> Status.UNLOAD_WAIT
        11 -> Status.UNLOAD
        12 -> Status.UNLOAD_WAIT_ACCEPTANCE
        13 -> Status.UNLOAD_ERROR
        14 -> Status.DELIVERY_WAIT
        15 -> Status.DELIVERY
        16 -> Status.DELIVERY_WAIT_ACCEPTANCE
        17 -> Status.DELIVERY_ERROR
        18 -> Status.DELIVERED
        19 -> Status.CANCELED
        20 -> Status.PAID
        else -> Status.UNKNOWN
    }

fun getStatusIntItem(status: Status): Int =
    when (status) {
        Status.ACCEPTANCE -> 1
        Status.RETURNED -> 2
        Status.BUY_WAIT -> 3
        Status.BUY -> 4
        Status.BUY_WAIT_ACCEPTANCE -> 5
        Status.BUY_ERROR -> 6
        Status.LOAD_WAIT -> 7
        Status.LOAD -> 8
        Status.ON_THE_WAY -> 9
        Status.UNLOAD_WAIT -> 10
        Status.UNLOAD -> 11
        Status.UNLOAD_WAIT_ACCEPTANCE -> 12
        Status.UNLOAD_ERROR -> 13
        Status.DELIVERY_WAIT -> 14
        Status.DELIVERY -> 15
        Status.DELIVERY_WAIT_ACCEPTANCE -> 16
        Status.DELIVERY_ERROR -> 17
        Status.DELIVERED -> 18
        Status.CANCELED -> 19
        Status.PAID -> 20
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

