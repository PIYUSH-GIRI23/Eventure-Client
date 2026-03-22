"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import { MdWarning } from "react-icons/md"

const DeleteModal = ({
    activeTheme,
    onClose,
    onDelete,
    deleteLoading,
    deleteError,
    setDeleteError
}) => {
    const router = useRouter()
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    })
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        setDeleteError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!formData.password.trim()) {
            setDeleteError("Password is required")
            return
        }
        if (!formData.confirmPassword.trim()) {
            setDeleteError("Please confirm your password")
            return
        }
        if (formData.password !== formData.confirmPassword) {
            setDeleteError("Passwords do not match")
            return
        }

        const success = await onDelete(formData.password)
        if (success) {
            // Navigate to home after successful deletion
            router.push("/")
        }
    }

    return (
        <>
            {deleteLoading && <LoadingSpinner />}
            <div
                className="p-6 rounded-lg border-2"
                style={{
                    backgroundColor: activeTheme.divColor,
                    borderColor: `#ef4444`
                }}
            >
                <div className="flex items-start gap-3 mb-6">
                    <MdWarning size={24} className="text-red-500 mt-1 flex-shrink-0" />
                    <div>
                        <h2
                            className="font-bold text-xl"
                            style={{ color: activeTheme.textColor }}
                        >
                            Delete Account
                        </h2>
                        <p
                            className="text-sm mt-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            This action cannot be undone. All your data will be permanently deleted.
                        </p>
                    </div>
                </div>

                {deleteError && (
                    <p className="mb-4 rounded-md border px-3 py-2 text-sm" style={{
                        borderColor: `#ef4444`,
                        backgroundColor: `#ef444420`,
                        color: "#ef4444"
                    }}>
                        {deleteError}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                disabled={deleteLoading}
                                className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm pr-10 disabled:opacity-50"
                                style={{
                                    borderColor: activeTheme.divColor2,
                                    backgroundColor: activeTheme.bgColor,
                                    color: activeTheme.textColor2
                                }}
                                placeholder="Enter your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {showPassword ? "👁️" : "🔒"}
                            </button>
                        </div>
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleInputChange}
                                disabled={deleteLoading}
                                className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm pr-10 disabled:opacity-50"
                                style={{
                                    borderColor: activeTheme.divColor2,
                                    backgroundColor: activeTheme.bgColor,
                                    color: activeTheme.textColor2
                                }}
                                placeholder="Confirm your password"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {showConfirmPassword ? "👁️" : "🔒"}
                            </button>
                        </div>
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={deleteLoading}
                            className="flex-1 px-4 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50 text-white"
                            style={{ backgroundColor: "#ef4444" }}
                        >
                            {deleteLoading ? "Deleting..." : "Delete Account"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={deleteLoading}
                            className="flex-1 px-4 py-2 rounded-lg font-medium border transition-opacity disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                color: activeTheme.textColor2
                            }}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default DeleteModal
