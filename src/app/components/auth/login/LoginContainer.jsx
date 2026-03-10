"use client"

import React from "react"
import { useLogin } from "./useLogin"
import LoginView from "./LoginView"
import Theme from "../theme/Theme"

const LoginContainer = () => {
  const {
    payload,
    handleInputChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    error,
    loading,
  } = useLogin()

  return (
    <div>
      <LoginView
        payload={payload}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        error={error}
        loading={loading}
      />
    </div>
  )
}

export default LoginContainer
