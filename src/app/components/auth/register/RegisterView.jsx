import React from "react"
import Link from "next/link"
import LoadingSpinner from "@/app/components/LoadingSpinner"

const RegisterView = ({
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
}) => {
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 lg:bg-white">
        <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 text-black shadow-sm">
          <div className="mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-xs text-zinc-500 hover:text-black"
            >
              ← Back to home
            </Link>
          </div>

          <div className="mb-6 flex items-center justify-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <span className="hidden sm:block text-2xl font-bold bg-linear-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
                Eventure AI
              </span>
            </Link>
          </div>

          <h1 className="mb-1 text-2xl font-semibold text-center">
            Create Account
          </h1>
          <p className="mb-2 text-sm text-zinc-500 text-center">
            Step {currentStep} of 2: {currentStep === 1 ? "Account Details" : "Personal Information"}
          </p>

          {/* Progress bar */}
          <div className="mb-6 h-2 w-full bg-zinc-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-linear-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${(currentStep / 2) * 100}%` }}
            ></div>
          </div>

          {error.status && (
            <p className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
              {error.message}
            </p>
          )}

          <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit} className="space-y-3">
            {currentStep === 1 ? (
              <>
                {/* Step 1: Account Details */}
                {/* Email */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={payload.email}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                    disabled={loading}
                  />
                </div>

                {/* Username */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    placeholder="alexsharma"
                    value={payload.username}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                    disabled={loading}
                  />
                </div>

                {/* Account Type */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Account Type
                  </label>
                  <select
                    name="type"
                    value={payload.type}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                  >
                    <option value="volunteer">Volunteer - Join & find events</option>
                    <option value="manager">Event Manager - Create events</option>
                  </select>
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={payload.password}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-black"
                    >
                      {showPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      placeholder="••••••••"
                      value={payload.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-black"
                    >
                      {showConfirmPassword ? "🙈" : "👁️"}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Step 2: Personal Information */}
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="Alex"
                      value={payload.firstName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Sharma"
                      value={payload.lastName}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Contact */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    name="contact"
                    placeholder="9876543210"
                    value={payload.contact}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                    disabled={loading}
                  />
                </div>

                {/* Location Fields */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      placeholder="India"
                      value={payload.country}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium">
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="Gurgaon"
                      value={payload.city}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Pin Code */}
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Pin Code
                  </label>
                  <input
                    type="text"
                    name="pinCode"
                    placeholder="122001"
                    value={payload.pinCode}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                    disabled={loading}
                  />
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <label className="flex cursor-pointer items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={payload.rememberMe}
                      onChange={handleInputChange}
                      className="h-4 w-4 accent-black"
                      disabled={loading}
                    />
                    Remember me
                  </label>
                </div>
              </>
            )}

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              {currentStep === 2 && (
                <button
                  type="button"
                  onClick={() => {
                    setCurrentStep(1)
                    setError({ status: false, message: "" })
                  }}
                  disabled={loading}
                  className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition border border-zinc-300
                    ${loading ? "cursor-not-allowed opacity-60" : "hover:bg-zinc-100"}
                    bg-white text-black`}
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 cursor-pointer rounded-lg py-2 text-sm font-medium transition
                  ${loading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"}
                  bg-linear-to-r from-emerald-500 to-teal-500 text-white`}
              >
                {loading ? (currentStep === 1 ? "Loading..." : "Creating account...") : (currentStep === 1 ? "Next" : "Sign Up")}
              </button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Already have an account?{" "}
            <Link
              href="/login"
              className="cursor-pointer font-medium text-zinc-800 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default RegisterView
