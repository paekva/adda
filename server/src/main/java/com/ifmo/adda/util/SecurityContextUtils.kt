package com.ifmo.adda.util

import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.core.userdetails.UserDetails

object SecurityContextUtils {
  fun getUserFromContext() =
      SecurityContextHolder.getContext().authentication.principal as UserDetails
}