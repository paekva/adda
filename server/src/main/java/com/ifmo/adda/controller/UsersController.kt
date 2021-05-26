package com.ifmo.adda.controller

import com.ifmo.adda.dto.UserDto
import com.ifmo.adda.service.UserService
import feign.RequestLine
import org.springframework.http.MediaType
import org.springframework.security.access.prepost.PreAuthorize
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping(value = ["/api/1.0/user/"], produces = [MediaType.APPLICATION_JSON_VALUE])
class UsersController(
  private val userService: UserService
) : UsersApi {

  @GetMapping("/me")
  override fun me(): UserDto = userService.me()

  @GetMapping("/meAsManager")
  @PreAuthorize("hasAuthority('MANAGER')")
  override fun meAsManager(): UserDto = userService.me()
}

interface UsersApi {
  @RequestLine("GET /me")
  fun me(): UserDto

  @RequestLine("GET /meAsManager")
  fun meAsManager(): UserDto
}