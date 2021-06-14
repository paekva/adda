package com.ifmo.adda.repository

import com.ifmo.adda.dao.ProductPhoto
import org.springframework.data.jpa.repository.JpaRepository

interface ProductPhotoRepository : JpaRepository<ProductPhoto, Int>