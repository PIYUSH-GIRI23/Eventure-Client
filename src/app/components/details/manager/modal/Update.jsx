"use client"

import React, { useState } from "react"
import LoadingSpinner from "@/app/components/LoadingSpinner"

const UpdateModal = ({
    manager,
    activeTheme,
    onClose,
    onUpdate,
    updating,
    updateError,
    setUpdateError
}) => {
    const [formData, setFormData] = useState({
        companyName: manager?.companyName || "",
        companyType: manager?.companyType || "",
        companySize: manager?.companySize || "",
        foundedYear: manager?.foundedYear || "",
        gstin: manager?.gstin || ""
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
        setUpdateError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!formData.companyName.trim()) {
            setUpdateError("Company name is required")
            return
        }
        if (!formData.companyType.trim()) {
            setUpdateError("Company type is required")
            return
        }
        if (!formData.companySize.trim()) {
            setUpdateError("Company size is required")
            return
        }
        if (!formData.foundedYear) {
            setUpdateError("Founded year is required")
            return
        }
        if (!formData.gstin.trim()) {
            setUpdateError("GSTIN is required")
            return
        }

        const success = await onUpdate(formData)
        if (success) {
            // Don't close, let parent handle navigation to profile
        }
    }

    return (
        <>
            {updating && <LoadingSpinner />}
            <div
                className="p-6 rounded-lg"
                style={{ backgroundColor: activeTheme.divColor }}
            >
                <h2
                    className="font-bold text-xl mb-6"
                    style={{ color: activeTheme.textColor }}
                >
                    Update Company Details
                </h2>

                {updateError && (
                    <p className="mb-4 rounded-md border px-3 py-2 text-sm" style={{
                        borderColor: `${activeTheme.textColor}40`,
                        backgroundColor: `${activeTheme.textColor}10`,
                        color: activeTheme.textColor
                    }}>
                        {updateError}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Company Name
                        </label>
                        <input
                            type="text"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleInputChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="Enter company name"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Company Type
                        </label>
                        <input
                            type="text"
                            name="companyType"
                            value={formData.companyType}
                            onChange={handleInputChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="e.g., Non Profit Organisation"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Company Size
                        </label>
                        <input
                            type="text"
                            name="companySize"
                            value={formData.companySize}
                            onChange={handleInputChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="e.g., 10-20 employees"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Founded Year
                        </label>
                        <input
                            type="number"
                            name="foundedYear"
                            value={formData.foundedYear}
                            onChange={handleInputChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="e.g., 2022"
                        />
                    </div>

                    <div>
                        <label
                            className="block text-sm font-medium mb-1"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            GSTIN
                        </label>
                        <input
                            type="text"
                            name="gstin"
                            value={formData.gstin}
                            onChange={handleInputChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="e.g., 22AAAAA0000A1Z5"
                        />
                    </div>

                    <div className="flex gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex-1 px-4 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50"
                            style={{
                                backgroundColor: activeTheme.textColor2,
                                color: activeTheme.bgColor
                            }}
                        >
                            {updating ? "Updating..." : "Update"}
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={updating}
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

export default UpdateModal
