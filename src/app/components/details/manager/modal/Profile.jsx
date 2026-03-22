"use client"

import React from "react"
import { useRouter } from "next/navigation"
import formatDateTime from "@/app/utils/formatDateTime"

const ProfileModal = ({ manager, activeTheme, onClose }) => {
    const router = useRouter()
    // Get the last 2 events
    const recentEvents = manager?.organised_events?.slice(0, 2) || []

    return (
        <div
            className="p-6 rounded-lg overflow-y-auto max-h-[70vh]"
            style={{ backgroundColor: activeTheme.divColor }}
        >
            <h2
                className="font-bold text-xl mb-6"
                style={{ color: activeTheme.textColor }}
            >
                Manager Profile
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
                                {manager.firstName || "N/A"}
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
                                {manager.lastName || "N/A"}
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
                                {manager.email || "N/A"}
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
                                {manager.username || "N/A"}
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
                                {manager.contact || "N/A"}
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
                                {manager.country || "N/A"}
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
                                {manager.city || "N/A"}
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
                                {manager.pinCode || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Company Information */}
                <div
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: activeTheme.bgColor }}
                >
                    <h3
                        className="font-semibold text-lg mb-4"
                        style={{ color: activeTheme.textColor }}
                    >
                        Company Information
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Company Name
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.companyName || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Company Type
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.companyType || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Company Size
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.companySize || "N/A"}
                            </p>
                        </div>
                        <div>
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                Founded Year
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.foundedYear || "N/A"}
                            </p>
                        </div>
                        <div className="sm:col-span-2">
                            <p
                                className="text-sm opacity-75"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                GSTIN
                            </p>
                            <p
                                className="font-medium"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.gstin || "N/A"}
                            </p>
                        </div>
                    </div>
                </div>
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
                                Total Events Organized
                            </p>
                            <p
                                className="font-medium text-lg"
                                style={{ color: activeTheme.textColor2 }}
                            >
                                {manager.total_events_organised || 0}
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
                                {manager.dateOfJoining
                                    ? formatDateTime(new Date(manager.dateOfJoining))
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
                                {manager.lastLogin
                                    ? formatDateTime(new Date(manager.lastLogin))
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
                                        {event.title || event.description?.substring(0, 50) || "N/A"}
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
