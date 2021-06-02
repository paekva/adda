package com.ifmo.adda.dao

import javax.persistence.*

@Entity
@Table(name = "CART")
data class Cart(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false)
        var id: Int? = null,

        @Column(nullable = false)
        val client: Int
)