package com.ifmo.adda.dao

import java.math.BigDecimal
import javax.persistence.*

@Entity
@Table(name = "product")
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    val name: String,

    @Column(nullable = false)
    val price: BigDecimal
)