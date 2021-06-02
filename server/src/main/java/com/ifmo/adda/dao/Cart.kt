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
        val client: Int,

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                name = "product_to_cart",
                joinColumns = [JoinColumn(name = "cart_id", referencedColumnName = "ID")],
                inverseJoinColumns = [JoinColumn(name = "product_id", referencedColumnName = "ID")]
        )
        var products: Collection<Product>? = null
)