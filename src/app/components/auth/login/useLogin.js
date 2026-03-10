"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { loginAction } from "@/app/actions/authAction"
import { login, changeType } from "@/app/state/slices/userdataSlice"

export const useLogin = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userType = useSelector((state) => state.userdata.type)

  const [payload, setPayload] = useState({
    identifier: "",
    password: "",
    type: userType,
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState({
    status: false,
    message: "",
  })

  const [loading, setLoading] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    const newValue = type === "checkbox" ? checked : value
    
    setPayload((prev) => ({
      ...prev,
      [name]: newValue,
    }))

    // Dispatch changeType when type field changes
    if (name === "type") {
      dispatch(changeType({ type: newValue }))
    }
  }

  const validateForm = () => {
    if (!payload.identifier) {
      setError({
        status: true,
        message: "Email or username is required",
      })
      return false
    }

    if (!payload.password) {
      setError({
        status: true,
        message: "Password is required",
      })
      return false
    }

    if (!payload.type) {
      setError({
        status: true,
        message: "Please select account type",
      })
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()

    setError({
      status: false,
      message: "",
    })

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const loginPayload = {
        identifier: payload.identifier,
        password: payload.password,
        type: payload.type,
        rememberMe: payload.rememberMe,
      }

      const res = await loginAction(loginPayload)

      if (!res.success) {
        setError({
          status: true,
          message: res.message || "Login failed",
        })
        setLoading(false)
        return
      }
      console.log(res);
      const { tokens, user } = res.data

      // Store tokens in localStorage
      if (tokens.accessToken) {
        localStorage.setItem("access_token", tokens.accessToken)
      }
      if (tokens.refreshToken) {
        localStorage.setItem("refresh_token", tokens.refreshToken)
      }

      // Dispatch user data to Redux
      dispatch(
        login({
          email: user.email,
          contact: user.contact,
          firstName: user.firstName,
          lastName: user.lastName,
          lastLogin: user.lastLogin,
          dateOfJoining: user.dateOfJoining,
          dateOfBirth: user.dateOfBirth,
          country: user.country,
          city: user.city,
          pinCode: user.pinCode,
        })
      )

      // Reset form
      setPayload({
        identifier: "",
        password: "",
        type: userType,
        rememberMe: false,
      })

      router.push("/")
    } catch (err) {
      console.error("Login error:", err)
      setError({
        status: true,
        message: err.message || "An error occurred during login",
      })
    } finally {
      setLoading(false)
    }
  }

  return {
    payload,
    setPayload,
    handleInputChange,
    handleSubmit,
    showPassword,
    setShowPassword,
    error,
    setError,
    loading,
  }
}
