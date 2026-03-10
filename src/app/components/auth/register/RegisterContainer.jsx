"use client"

import React from "react"
import { useRegister } from "./useRegister"
import RegisterView from "./RegisterView"
import Theme from "../theme/Theme"

const RegisterContainer = () => {
  const {
    payload,
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
  } = useRegister()

  return (
    <div>
      <RegisterView
        payload={payload}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleNextStep={handleNextStep}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        error={error}
        setError={setError}
        loading={loading}
      />
    </div>
  )
}

export default RegisterContainer
