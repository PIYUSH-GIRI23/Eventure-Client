"use client"

import React, { useState } from "react"
import { MdDelete } from "react-icons/md"
import { IoAdd } from "react-icons/io5"
import LoadingSpinner from "@/app/components/LoadingSpinner"

const UpdateModal = ({
    volunteer,
    activeTheme,
    onClose,
    onUpdate,
    updating,
    updateError,
    setUpdateError
}) => {
    const [formData, setFormData] = useState({
        introduction: volunteer?.introduction || "",
        skills: volunteer?.skills || [],
        education: volunteer?.education || []
    })
    const [currentSkill, setCurrentSkill] = useState("")

    const handleIntroductionChange = (e) => {
        const { value } = e.target
        setFormData((prev) => ({
            ...prev,
            introduction: value
        }))
        setUpdateError(null)
    }

    const addSkill = (skill) => {
        if (skill.trim() && !formData.skills.includes(skill.trim())) {
            setFormData((prev) => ({
                ...prev,
                skills: [...prev.skills, skill.trim()]
            }))
            setCurrentSkill("")
            setUpdateError(null)
        }
    }

    const removeSkill = (index) => {
        setFormData((prev) => ({
            ...prev,
            skills: prev.skills.filter((_, i) => i !== index)
        }))
    }

    const handleSkillKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            addSkill(currentSkill)
        }
    }

    const addEducation = () => {
        setFormData((prev) => ({
            ...prev,
            education: [
                ...prev.education,
                {
                    institutionName: "",
                    startYear: "",
                    endYear: "",
                    percentage: "",
                    specialization: ""                    
                }
            ]
        }))
    }

    const removeEducation = (index) => {
        setFormData((prev) => ({
            ...prev,
            education: prev.education.filter((_, i) => i !== index)
        }))
    }

    const handleEducationChange = (index, field, value) => {
        setFormData((prev) => ({
            ...prev,
            education: prev.education.map((edu, i) =>
                i === index ? { ...edu, [field]: value } : edu
            )
        }))
        setUpdateError(null)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Validation
        if (!formData.introduction.trim()) {
            setUpdateError("Introduction is required")
            return
        }
        if (formData.skills.length === 0) {
            setUpdateError("At least one skill is required")
            return
        }
        if (formData.education.length === 0) {
            setUpdateError("At least one education entry is required")
            return
        }

        // Validate education fields
        for (let edu of formData.education) {
            if (!edu.institutionName.trim()) {
                setUpdateError("Institution name is required for all education entries")
                return
            }
            if (!edu.startYear || !edu.endYear) {
                setUpdateError("Start and end year are required for all education entries")
                return
            }
            if (!edu.percentage) {
                setUpdateError("Percentage is required for all education entries")
                return
            }
            if (!edu.specialization.trim()) {
                setUpdateError("Specialization is required for all education entries")
                return
            }
        }

        // Convert all numeric fields to numbers
        const submitData = {
            ...formData,
            education: formData.education.map((edu) => ({
                ...edu,
                startYear: String(edu.startYear),
                endYear: String(edu.endYear),
                percentage: Number(edu.percentage)
            }))
        }

        const success = await onUpdate(submitData)
        if (success) {
            // Don't close, let parent handle navigation to profile
        }
    }

    return (
        <>
            {updating && <LoadingSpinner />}
            <div
                className="p-6 rounded-lg overflow-y-auto max-h-[70vh]"
                style={{ backgroundColor: activeTheme.divColor }}
            >
                <h2
                    className="font-bold text-xl mb-6"
                    style={{ color: activeTheme.textColor }}
                >
                    Update Volunteer Details
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

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Introduction */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Introduction
                        </label>
                        <textarea
                            name="introduction"
                            value={formData.introduction}
                            onChange={handleIntroductionChange}
                            disabled={updating}
                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50 resize-none"
                            style={{
                                borderColor: activeTheme.divColor2,
                                backgroundColor: activeTheme.bgColor,
                                color: activeTheme.textColor2
                            }}
                            placeholder="Tell us about yourself..."
                            rows={4}
                        />
                    </div>

                    {/* Skills */}
                    <div>
                        <label
                            className="block text-sm font-medium mb-2"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            Skills
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={currentSkill}
                                onChange={(e) => setCurrentSkill(e.target.value)}
                                onKeyDown={handleSkillKeyDown}
                                disabled={updating}
                                className="flex-1 px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                style={{
                                    borderColor: activeTheme.divColor2,
                                    backgroundColor: activeTheme.bgColor,
                                    color: activeTheme.textColor2
                                }}
                                placeholder="Enter skill and press Enter or Space"
                            />
                            <button
                                type="button"
                                onClick={() => addSkill(currentSkill)}
                                disabled={updating || !currentSkill.trim()}
                                className="px-3 py-2 rounded-lg font-medium transition-opacity disabled:opacity-50"
                                style={{
                                    backgroundColor: activeTheme.textColor2,
                                    color: activeTheme.bgColor
                                }}
                            >
                                Add
                            </button>
                        </div>
                        {formData.skills.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2"
                                        style={{
                                            backgroundColor: activeTheme.bgColor,
                                            color: activeTheme.textColor2,
                                            border: `1px solid ${activeTheme.divColor2}`
                                        }}
                                    >
                                        {skill}
                                        <button
                                            type="button"
                                            onClick={() => removeSkill(index)}
                                            disabled={updating}
                                            className="hover:opacity-75 transition-opacity disabled:opacity-50"
                                        >
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Education */}
                    <div>
                        <div className="flex items-center justify-between mb-3">
                            <label
                                className="block text-sm font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Education ({formData.education.length})
                            </label>
                            <button
                                type="button"
                                onClick={addEducation}
                                disabled={updating}
                                className="p-2 rounded-lg hover:opacity-75 transition-opacity disabled:opacity-50"
                                style={{
                                    backgroundColor: activeTheme.textColor2,
                                    color: activeTheme.bgColor
                                }}
                                title="Add education"
                            >
                                <IoAdd size={20} />
                            </button>
                        </div>
                        <div className="space-y-4">
                            {formData.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="p-4 rounded-lg border"
                                    style={{
                                        backgroundColor: activeTheme.bgColor,
                                        borderColor: activeTheme.divColor2
                                    }}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <h4
                                            className="font-medium text-sm"
                                            style={{ color: activeTheme.textColor2 }}
                                        >
                                            Education #{index + 1}
                                        </h4>
                                        {formData.education.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeEducation(index)}
                                                disabled={updating}
                                                className="p-1 hover:opacity-75 transition-opacity disabled:opacity-50"
                                                style={{ color: "#ef4444" }}
                                                title="Delete education"
                                            >
                                                <MdDelete size={18} />
                                            </button>
                                        )}
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="text"
                                            placeholder="Institution Name"
                                            value={edu.institutionName}
                                            onChange={(e) =>
                                                handleEducationChange(index, "institutionName", e.target.value)
                                            }
                                            disabled={updating}
                                            className="w-full px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                            style={{
                                                borderColor: activeTheme.divColor2,
                                                backgroundColor: activeTheme.divColor,
                                                color: activeTheme.textColor2
                                            }}
                                        />
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number"
                                                placeholder="Start Year"
                                                value={edu.startYear}
                                                onChange={(e) =>
                                                    handleEducationChange(index, "startYear", e.target.value)
                                                }
                                                disabled={updating}
                                                className="px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                                style={{
                                                    borderColor: activeTheme.divColor2,
                                                    backgroundColor: activeTheme.divColor,
                                                    color: activeTheme.textColor2
                                                }}
                                            />
                                            <input
                                                type="number"
                                                placeholder="End Year"
                                                value={edu.endYear}
                                                onChange={(e) =>
                                                    handleEducationChange(index, "endYear", e.target.value)
                                                }
                                                disabled={updating}
                                                className="px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                                style={{
                                                    borderColor: activeTheme.divColor2,
                                                    backgroundColor: activeTheme.divColor,
                                                    color: activeTheme.textColor2
                                                }}
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-2">
                                            <input
                                                type="number"
                                                placeholder="Percentage"
                                                min="0"
                                                max="100"
                                                value={edu.percentage}
                                                onChange={(e) =>
                                                    handleEducationChange(index, "percentage", e.target.value)
                                                }
                                                disabled={updating}
                                                className="px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                                style={{
                                                    borderColor: activeTheme.divColor2,
                                                    backgroundColor: activeTheme.divColor,
                                                    color: activeTheme.textColor2
                                                }}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Specialization"
                                                value={edu.specialization}
                                                onChange={(e) =>
                                                    handleEducationChange(index, "specialization", e.target.value)
                                                }
                                                disabled={updating}
                                                className="px-3 py-2 rounded-lg border outline-none transition text-sm disabled:opacity-50"
                                                style={{
                                                    borderColor: activeTheme.divColor2,
                                                    backgroundColor: activeTheme.divColor,
                                                    color: activeTheme.textColor2
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
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
