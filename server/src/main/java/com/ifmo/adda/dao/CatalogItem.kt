package com.ifmo.adda.dao

import java.time.Instant
import javax.persistence.*

@Entity
@Table(name = "CATALOG_ITEM")
data class CatalogItem (
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false)
    var id: Int? = null,

    @Column(nullable = false)
    var name: String,

    @Column(nullable = false)
    val description: String,

    @Column(nullable = false)
    val price: Long

)