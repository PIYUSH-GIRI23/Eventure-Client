import React from "react"
import Link from "next/link"
import LoadingSpinner from "@/app/components/LoadingSpinner"

const LoginView = ({
  payload,
  handleInputChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  error,
  loading,
}) => {
  return (
    <>
      {loading && <LoadingSpinner />}
      <div className="flex min-h-screen items-center justify-center px-4 bg-linear-to-br from-emerald-50 via-teal-50 to-cyan-50 lg:bg-white">
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
            Welcome back
          </h1>
          <p className="mb-6 text-sm text-zinc-500 text-center">
            Login to your account and explore events
          </p>

          {error.status && (
            <p className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-500">
              {error.message}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Account Type Selector */}
            <div className="mb-4">
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
                <option value="volunteer">Volunteer</option>
                <option value="manager">Event Manager</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="mb-1 block text-sm font-medium">
                Email or Username
              </label>
              <input
                autoFocus
                type="text"
                name="identifier"
                placeholder="you@example.com"
                value={payload.identifier}
                onChange={handleInputChange}
                onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit(e)}
                className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-zinc-500"
                disabled={loading}
              />
            </div>

            <div className="mb-4">
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
                  onKeyDown={(e) => e.key === "Enter" && !loading && handleSubmit(e)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 pr-10 text-sm outline-none transition focus:border-zinc-500"
                  disabled={loading}
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-zinc-500 hover:text-black"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? "🙈" : "👁️"}
                </button>
              </div>
            </div>

            <div className="mb-6 flex items-center justify-between">
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

              <Link
                href="/resetpassword"
                className="cursor-pointer text-sm text-zinc-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full cursor-pointer rounded-lg py-2 text-sm font-medium transition
                ${loading ? "cursor-not-allowed opacity-60" : "hover:opacity-90"}
                bg-linear-to-r from-emerald-500 to-teal-500 text-white`}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/register"
              className="cursor-pointer font-medium text-zinc-800 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default LoginView
