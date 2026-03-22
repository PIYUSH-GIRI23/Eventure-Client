"use client"

import React from "react"
import { useRouter } from "next/navigation"
import formatDateTime from "@/app/utils/formatDateTime"

const ProfileModal = ({ volunteer, activeTheme, onClose }) => {
    const router = useRouter()
    // Get the last 2 participated events
    const recentEvents = volunteer?.participated_events?.slice(0, 2) || []

    return (
        <div
            className="p-6 rounded-lg overflow-y-auto max-h-[70vh]"
            style={{ backgroundColor: activeTheme.divColor }}
        >
            <h2
                className="font-bold text-xl mb-6"
                style={{ color: activeTheme.textColor }}
            >
                Volunteer Profile
            </h2>

            <div className="space-y-6">
                {/* Personal Information */}
                <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: activeTheme.bgColor }}
                >
                    <h3
                        className="font-semibold text-lg mb-4"
                        style={{ color: activeTheme.textColor }}
                    >
                        Personal Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                First Name
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.firstName || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Last Name
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.lastName || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Email
                            </p>
                            <p
                                className="font-medium break-all text-sm"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.email || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Username
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.username || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Contact
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.contact || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Location Information */}
                <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: activeTheme.bgColor }}
                >
                    <h3
                        className="font-semibold text-lg mb-4"
                        style={{ color: activeTheme.textColor }}
                    >
                        Location Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Country
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.country || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                City
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.city || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Pin Code
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.pinCode || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Introduction */}
                {volunteer.introduction && (
                    <div
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: activeTheme.bgColor }}
                    >
                        <h3
                            className="font-semibold text-lg mb-4"
                            style={{ color: activeTheme.textColor }}
                        >
                            Introduction
                        </h3>
                        <p
                            className="text-sm leading-relaxed"
                            style={{ color: activeTheme.textColor2 }}
                        >
                            {volunteer.introduction}
                        </p>
                    </div>
                )}

                {/* Skills */}
                {volunteer.skills && volunteer.skills.length > 0 && (
                    <div
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: activeTheme.bgColor }}
                    >
                        <h3
                            className="font-semibold text-lg mb-4"
                            style={{ color: activeTheme.textColor }}
                        >
                            Skills ({volunteer.skills.length})
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {volunteer.skills.map((skill, index) => (
                                <span
                                    key={index}
                                    className="px-3 py-1 rounded-full text-sm font-medium"
                                    style={{
                                        backgroundColor: activeTheme.divColor,
                                        color: activeTheme.textColor2
                                    }}
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>
                )}

                {/* Education */}
                {volunteer.education && volunteer.education.length > 0 && (
                    <div
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: activeTheme.bgColor }}
                    >
                        <h3
                            className="font-semibold text-lg mb-4"
                            style={{ color: activeTheme.textColor }}
                        >
                            Education ({volunteer.education.length})
                        </h3>
                        <div className="space-y-3">
                            {volunteer.education.map((edu, index) => (
                                <div
                                    key={index}
                                    className="p-3 rounded-lg border"
                                    style={{
                                        backgroundColor: activeTheme.divColor,
                                        borderColor: activeTheme.divColor2
                                    }}
                                >
                                    <p
                                        className="font-medium"
                                        style={{ color: activeTheme.textColor2 }}
                                    >
                                        {edu.institutionName}
                                    </p>
                                    <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                                        <div>
                                            <p
                                                className="opacity-75"
                                                style={{ color: activeTheme.textColor2 }}
                                            >
                                                Period
                                            </p>
                                            <p style={{ color: activeTheme.textColor2 }}>
                                                {edu.startYear} - {edu.endYear}
                                            </p>
                                        </div>
                                        <div>
                                            <p
                                                className="opacity-75"
                                                style={{ color: activeTheme.textColor2 }}
                                            >
                                                Percentage
                                            </p>
                                            <p style={{ color: activeTheme.textColor2 }}>
                                                {edu.percentage}%
                                            </p>
                                        </div>
                                        <div className="col-span-2">
                                            <p
                                                className="opacity-75"
                                                style={{ color: activeTheme.textColor2 }}
                                            >
                                                Specialization
                                            </p>
                                            <p style={{ color: activeTheme.textColor2 }}>
                                                {edu.specialization}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Account Information */}
                <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: activeTheme.bgColor }}
                >
                    <h3
                        className="font-semibold text-lg mb-4"
                        style={{ color: activeTheme.textColor }}
                    >
                        Account Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Total Events Participated
                            </p>
                            <p
                                className="font-medium text-lg"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.total_events_participated || 0}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Date of Joining
                            </p>
                            <p
                                className="font-medium text-xs"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.dateOfJoining
                                    ? formatDateTime(new Date(volunteer.dateOfJoining))
                                    : "N/A"}
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Last Login
                            </p>
                            <p
                                className="font-medium text-xs"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {volunteer.lastLogin
                                    ? formatDateTime(new Date(volunteer.lastLogin))
                                    : "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Recent Events */}
                {recentEvents.length > 0 && (
                    <div
                        className="p-4 rounded-lg"
                        style={{ backgroundColor: activeTheme.bgColor }}
                    >
                        <h3
                            className="font-semibold text-lg mb-4"
                            style={{ color: activeTheme.textColor }}
                        >
                            Recent Events ({recentEvents.length})
                        </h3>
                        <div className="space-y-3">
                            {recentEvents.map((event, index) => (
                                <button
                                    key={index}
                                    onClick={() => router.push(`/event/${event.event_id}`)}
                                    className="p-3 rounded-lg border w-full text-left hover:opacity-80 transition-opacity"
                                    style={{
                                        backgroundColor: activeTheme.divColor,
                                        borderColor: activeTheme.divColor2
                                    }}
                                >
                                    <p
                                        className="font-medium"
                                        style={{ color: activeTheme.textColor2 }}
                                    >
                                        {event.event_name || event.title || "N/A"}
                                    </p>
                                    <p
                                        className="text-xs opacity-75 mt-1"
                                        style={{ color: activeTheme.textColor2 }}
                                    >
                                        Manager: {event.manager_name}
                                    </p>
                                    <p
                                        className="text-xs opacity-75 mt-1"
                                        style={{ color: activeTheme.textColor2 }}
                                    >
                                        📅 {event.start_date} at {event.start_time}
                                    </p>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default ProfileModal
