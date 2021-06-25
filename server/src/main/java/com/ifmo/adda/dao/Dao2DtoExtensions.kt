package com.ifmo.adda.dao

import com.ifmo.adda.dto.*

fun Product.toDto(imageId: Int?) = ProductDto(id!!, name, "$price SLG", imageId)

fun CustomOrder.toDto() = OrderDto(
    id!!,
    client,
    true,
    description,
    listOf(),
    dateOfOrder.toEpochMilli(),
    dateOfReceive.toEpochMilli(),
    getStatusEnumItem(status),
    price,
    lastError
)

fun getStatusEnumItem(status: Int): Status =
    when (status) {
        // 1 - no status as admin is a worker of this step
        // 2 - no status as admin is a worker of this step
        3 -> Status.ACCEPTANCE
        4 -> Status.RETURNED

        5 -> Status.BUY_WAIT
        6 -> Status.BUY
        7 -> Status.BUY_WAIT_ACCEPTANCE
        8 -> Status.BUY_ERROR

        9 -> Status.LOAD_WAIT
        10 -> Status.LOAD
        // 11 - no status as admin do not monitor this step
        12 -> Status.LOAD_ERROR

        // 13 - this step is out of our controls
        14 -> Status.ON_THE_WAY
        // 15 - this step is out of our controls
        // 16 - this step is out of our controls

        17 -> Status.UNLOAD_WAIT
        18 -> Status.UNLOAD
        19 -> Status.UNLOAD_WAIT_ACCEPTANCE
        20 -> Status.UNLOAD_ERROR

        21 -> Status.DELIVERY_WAIT
        22 -> Status.DELIVERY
        23 -> Status.DELIVERY_WAIT_ACCEPTANCE
        24 -> Status.DELIVERY_ERROR

        // additional steps
        25 -> Status.DELIVERED
        26 -> Status.CANCELED
        27 -> Status.PAID

        else -> Status.UNKNOWN
    }

fun getStatusIntItem(status: Status): Int =
    when (status) {
        // 1 - no status as admin is a worker of this step
        // 2 - no status as admin is a worker of this step
        Status.ACCEPTANCE -> 3
        Status.RETURNED -> 4

        Status.BUY_WAIT -> 5
        Status.BUY -> 6
        Status.BUY_WAIT_ACCEPTANCE -> 7
        Status.BUY_ERROR -> 8

        Status.LOAD_WAIT -> 9
        Status.LOAD -> 10
        // 11 - no status as admin do not monitor this step
        Status.LOAD_ERROR -> 12

        // 13 - this step is out of our controls
        Status.ON_THE_WAY -> 14
        // 15 - this step is out of our controls
        // 16 - this step is out of our controls

        Status.UNLOAD_WAIT -> 17
        Status.UNLOAD -> 18
        Status.UNLOAD_WAIT_ACCEPTANCE -> 19
        Status.UNLOAD_ERROR -> 20

        Status.DELIVERY_WAIT -> 21
        Status.DELIVERY -> 22
        Status.DELIVERY_WAIT_ACCEPTANCE -> 23
        Status.DELIVERY_ERROR -> 24

        // additional steps
        Status.DELIVERED -> 25
        Status.CANCELED -> 26
        Status.PAID -> 27

        else -> 0
    }

val orderStartMap = mapOf(
    5 to 6,
    9 to 10,
    17 to 18,
    21 to 22,
    8 to 6,
    20 to 18,
    24 to 22
)

val orderSendToCheckMap = mapOf(
    6 to 7,
    10 to 14,
    18 to 19,
    22 to 23
)

val orderAcceptMap = mapOf(
    3 to 5,
    7 to 9,
    19 to 21,
    23 to 25
)

val orderDeclineMap = mapOf(
    3 to 4,
    7 to 8,
    19 to 20,
    23 to 24
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
        getStatusEnumItem(status),
        "",
        lastError
    )
}

