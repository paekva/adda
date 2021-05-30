package com.ifmo.adda.dao

import com.ifmo.adda.dto.ProductDto

fun Product.toDto() = ProductDto(id!!, name, "$price SLG")
