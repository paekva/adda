package com.ifmo.adda.dao

import java.math.BigInteger
import javax.persistence.*

@Entity
@Table(name = "CART")
data class Cart(
        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(nullable = false)
        var id: Int? = null,

        @Column(nullable = false)
        val client: BigInteger,

        @ManyToMany(fetch = FetchType.LAZY)
        @JoinTable(
                name = "cart_to_order",
                joinColumns = [JoinColumn(name = "card_id", referencedColumnName = "ID")],
                inverseJoinColumns = [JoinColumn(name = "product_id", referencedColumnName = "ID")]
)
        private var products: Collection<Product>? = null
)