package com.ifmo.adda.dao

import com.ifmo.adda.dto.OrderDto
import com.ifmo.adda.dto.ProductDto

fun Product.toDto() = ProductDto(id!!, name, "$price SLG")

// TODO: finish with products list (need a separate table for this)
fun Order.toDto() = OrderDto(id!!, client, false, "", listOf(), dateOfOrder.toEpochMilli(), dateOfReceive.toEpochMilli(), status)

fun CustomOrder.toDto() = OrderDto(id!!, client, true, description, listOf(), dateOfOrder.toEpochMilli(), dateOfReceive.toEpochMilli(), status)
