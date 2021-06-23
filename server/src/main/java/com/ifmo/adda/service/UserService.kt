package com.ifmo.adda.service

import com.ifmo.adda.dao.Authority
import com.ifmo.adda.dao.User
import com.ifmo.adda.dto.UserDto
import com.ifmo.adda.exception.BadRequestException
import com.ifmo.adda.repository.UserRepository
import com.ifmo.adda.util.SecurityContextUtils
import org.springframework.data.repository.findByIdOrNull
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.security.core.userdetails.UsernameNotFoundException
import org.springframework.stereotype.Service
import org.springframework.transaction.annotation.Transactional

@Service
class UserService(
    private val userRepository: UserRepository
) : UserDetailsService {

    @Transactional(readOnly = true)
    @Throws(UsernameNotFoundException::class)
    override fun loadUserByUsername(username: String): UserDetails {
        val user = loadUserByUsernameOrNull(username)
        if (user != null) {
            return user
        }
        throw UsernameNotFoundException(username)
    }

    fun loadUserByUsernameOrNull(username: String): User? {
        return userRepository.findByUsername(username)
    }

    fun loadUserById(userId: Int): User {
        return userRepository.findByIdOrNull(userId) ?: throw BadRequestException("no user for id $userId")
    }

    fun me(): UserDto {
        val user = SecurityContextUtils.getUserFromContext()
        return UserDto(user.username, user.authorities.map { it.authority })
    }

    fun meAsEntity(): User {
        val user = SecurityContextUtils.getUserFromContext()
        return userRepository.findByUsername(user.username)!!
    }

    fun myId(): Int {
        return meAsEntity().id!!
    }

    fun iAmAdmin(): Boolean {
        return me().roles.filter { it.contains("ADMIN") }.isNotEmpty()
    }

    fun iAmWorker(): Boolean {
        return me().roles.filter { it.contains("ADMIN") || it.contains("USER") }.isEmpty()
    }

    fun getAllWorkers(): List<User>? {
        val workersAuthorities = listOf(3, 4, 5, 6)
        val users = userRepository.findAll()
        return users.filter { it -> it.authorities.map { a -> a.id }.intersect(workersAuthorities).isNotEmpty() }
    }
}