package com.ifmo.adda.dao

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.ProductDto

fun Product.toDto() = ProductDto(id!!, name, "$price SLG")

// TODO: finish with products list (need a separate table for this)
fun Order.toDto() = OrderDto(id!!, client, listOf(), dateOfOrder.toEpochMilli(), dateOfReceive.toEpochMilli(), status)
