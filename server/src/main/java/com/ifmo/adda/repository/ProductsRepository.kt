package com.ifmo.adda.repository

import com.ifmo.adda.dao.Product
import org.springframework.data.jpa.repository.JpaRepository

interface ProductsRepository : JpaRepository<Product, Int>