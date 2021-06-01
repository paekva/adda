package com.ifmo.adda.dao

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "ORDER_ITEM")
data class Order(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    val client: Int,

    @Column(nullable = false)
    var dateOfOrder: Instant,

    @Column(nullable = false)
    val dateOfReceive: Instant,

    @Column(nullable = false)
    val status: Int
)