"use client"

import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/navigation"
import { registerAction } from "@/app/actions/authAction"
import { login, changeType } from "@/app/state/slices/userdataSlice"

export const useRegister = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const userType = useSelector((state) => state.userdata.type)

  const [currentStep, setCurrentStep] = useState(1)

  const [payload, setPayload] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    country: "",
    city: "",
    pinCode: "",
    contact: "",
    type: userType,
    rememberMe: false,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

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

  const validateStep1 = () => {
    if (!payload.email || !payload.email.includes("@")) {
      setError({
        status: true,
        message: "Valid email is required",
      })
      return false
    }

    if (!payload.username) {
      setError({
        status: true,
        message: "Username is required",
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

    if (!payload.confirmPassword) {
      setError({
        status: true,
        message: "Confirm password is required",
      })
      return false
    }

    if (payload.password !== payload.confirmPassword) {
      setError({
        status: true,
        message: "Passwords do not match",
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

  const validateStep2 = () => {
    if (!payload.firstName) {
      setError({
        status: true,
        message: "First name is required",
      })
      return false
    }

    if (!payload.lastName) {
      setError({
        status: true,
        message: "Last name is required",
      })
      return false
    }

    if (!payload.contact) {
      setError({
        status: true,
        message: "Contact number is required",
      })
      return false
    }

    if (!payload.country) {
      setError({
        status: true,
        message: "Country is required",
      })
      return false
    }

    if (!payload.city) {
      setError({
        status: true,
        message: "City is required",
      })
      return false
    }

    if (!payload.pinCode) {
      setError({
        status: true,
        message: "Pin code is required",
      })
      return false
    }

    return true
  }

  const handleNextStep = (e) => {
    e?.preventDefault()

    setError({
      status: false,
      message: "",
    })

    if (!validateStep1()) {
      return
    }

    setCurrentStep(2)
  }

  const handleSubmit = async (e) => {
    e?.preventDefault()

    setError({
      status: false,
      message: "",
    })

    if (!validateStep2()) {
      return
    }

    setLoading(true)

    try {
      const registerPayload = {
        email: payload.email,
        username: payload.username,
        password: payload.password,
        confirmPassword: payload.confirmPassword,
        firstName: payload.firstName,
        lastName: payload.lastName,
        country: payload.country,
        city: payload.city,
        pinCode: payload.pinCode,
        contact: payload.contact,
        type: payload.type,
        rememberMe: payload.rememberMe,
      }

      const res = await registerAction(registerPayload)

      if (!res.success) {
        setError({
          status: true,
          message: res.message || "Registration failed",
        })
        setLoading(false)
        return
      }

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
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        firstName: "",
        lastName: "",
        country: "",
        city: "",
        pinCode: "",
        contact: "",
        type: userType,
        rememberMe: false,
      })

      router.push("/")
    } catch (err) {
      console.error("Registration error:", err)
      setError({
        status: true,
        message: err.message || "An error occurred during registration",
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
    handleNextStep,
    currentStep,
    setCurrentStep,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    setError,
    loading,
  }
}
