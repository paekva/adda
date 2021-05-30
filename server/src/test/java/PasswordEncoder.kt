package com.ifmo.adda

import com.ifmo.adda.config.PasswordEncoders

fun main() {
    val pe = PasswordEncoders()
    val e = pe.oauthClientPasswordEncoder()
    while (true) {
        val s = readLine()
        println("'$s'")
        println(e.encode(s))
    }
}