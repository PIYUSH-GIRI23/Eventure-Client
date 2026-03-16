"use client"

import React from "react"
import Link from "next/link"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import formatDateTime from "@/app/utils/formatDateTime"

const EventsModal = ({ events, isOpen, onClose, theme }) => {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div
                className="rounded-lg p-6 max-w-2xl w-full max-h-96 overflow-y-auto border"
                style={{
                    backgroundColor: theme.bgColor,
                    borderColor: theme.divColor2,
                    borderTop: `4px solid ${theme.textColor2}`
                }}
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold" style={{ color: theme.textColor }}>
                        Organized Events
                    </h2>
                    <button onClick={onClose} className="text-2xl" style={{ color: theme.textColor }}>
                        ×
                    </button>
                </div>

                {events && events.length > 0 ? (
                    <div className="space-y-3">
                        {events.map((event) => (
                            <Link key={event.event_id} href={`/event/${event.event_id}`}>
                                <div
                                    className="p-3 rounded-lg hover:opacity-80 cursor-pointer transition border"
                                    style={{
                                        backgroundColor: theme.divColor,
                                        borderColor: theme.divColor2
                                    }}
                                >
                                    <h3 className="font-semibold" style={{ color: theme.textColor }}>
                                        {event.event_name}
                                    </h3>
                                    <p className="text-sm" style={{ color: theme.textColor2 }}>
                                        Created: {formatDateTime(event.created_at)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: theme.textColor2 }}>No organized events</p>
                )}
            </div>
        </div>
    )
}

const ManagerView = ({
    manager,
    loading,
    error,
    activeTheme,
    selectedEventIndex,
    setSelectedEventIndex
}) => {

    if (!manager && loading) return <LoadingSpinner />

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: activeTheme.bgColor }}>
                <p className="text-lg font-semibold" style={{ color: "#ef4444" }}>{error}</p>
            </div>
        )
    }

    if (!manager) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: activeTheme.bgColor }}>
                <p style={{ color: activeTheme.textColor2 }}>No manager data available</p>
            </div>
        )
    }

    const {
        email,
        username,
        firstName,
        lastName,
        country,
        city,
        companyName,
        companyType,
        companySize,
        foundedYear,
        total_events_organised,
        organised_events
    } = manager

    const completion =
        (companyName ? 25 : 0) +
        (companyType ? 25 : 0) +
        (city ? 25 : 0) +
        (country ? 25 : 0)

    return (
        <div className="min-h-[89vh] md:h-[89vh] overflow-y-auto w-full pt-2" style={{ backgroundColor: activeTheme.bgColor }}>
            <div className="max-w-7xl mx-auto px-4">

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

                    {/* LEFT SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div
                            className="sticky top-20 rounded-lg p-6 border space-y-4"
                            style={{
                                backgroundColor: activeTheme.divColor,
                                borderColor: activeTheme.divColor2
                            }}
                        >

                            <h3 className="font-bold text-lg" style={{ color: activeTheme.textColor }}>
                                Quick Stats
                            </h3>

                            <div
                                className="rounded-lg p-4 border text-center"
                                style={{
                                    backgroundColor: activeTheme.bgColor,
                                    borderColor: activeTheme.divColor2
                                }}
                            >
                                <p className="text-3xl font-bold" style={{ color: activeTheme.textColor2 }}>
                                    {total_events_organised || 0}
                                </p>
                                <p className="text-sm" style={{ color: activeTheme.textColor2 }}>
                                    Events Organized
                                </p>
                            </div>

                            {companyName && (
                                <div
                                    className="rounded-lg p-4 border"
                                    style={{
                                        backgroundColor: activeTheme.bgColor,
                                        borderColor: activeTheme.divColor2
                                    }}
                                >
                                    <p className="font-semibold text-sm mb-2" style={{ color: activeTheme.textColor }}>
                                        Company
                                    </p>
                                    <p className="text-sm font-medium" style={{ color: activeTheme.textColor2 }}>
                                        {companyName}
                                    </p>
                                </div>
                            )}

                            <div
                                className="rounded-lg p-4 border text-center"
                                style={{
                                    backgroundColor: activeTheme.bgColor,
                                    borderColor: activeTheme.divColor2
                                }}
                            >
                                <p className="text-xs mb-2" style={{ color: activeTheme.textColor2 }}>
                                    Location
                                </p>
                                <p className="font-semibold text-sm" style={{ color: activeTheme.textColor }}>
                                    {city}, {country}
                                </p>
                            </div>

                        </div>
                    </div>


                    {/* MAIN CONTENT */}
                    <div className="lg:col-span-2">

                        <div
                            className="rounded-lg shadow-lg p-8 mb-6 border"
                            style={{
                                backgroundColor: activeTheme.divColor,
                                borderColor: activeTheme.divColor2
                            }}
                        >

                            <div
                                className="mb-6 pb-6"
                                style={{ borderBottom: `2px solid ${activeTheme.divColor2}` }}
                            >
                                <h1 className="text-3xl font-bold mb-2" style={{ color: activeTheme.textColor }}>
                                    {firstName} {lastName}
                                </h1>
                                <p style={{ color: activeTheme.textColor2 }}>@{username}</p>
                            </div>

                            {/* CONTACT */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div>
                                    <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                        Email
                                    </label>
                                    <p style={{ color: activeTheme.textColor }}>{email}</p>
                                </div>

                                <div>
                                    <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                        Location
                                    </label>
                                    <p style={{ color: activeTheme.textColor }}>{city}, {country}</p>
                                </div>
                            </div>


                            {/* COMPANY */}
                            <div
                                className="rounded-lg p-6 mb-6 border"
                                style={{
                                    backgroundColor: activeTheme.bgColor,
                                    borderColor: activeTheme.divColor2
                                }}
                            >

                                <h2 className="text-lg font-semibold mb-4" style={{ color: activeTheme.textColor }}>
                                    Company Details
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                                    <div>
                                        <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                            Company Name
                                        </label>
                                        <p style={{ color: activeTheme.textColor }}>
                                            {companyName || "Not updated"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                            Company Type
                                        </label>
                                        <p style={{ color: activeTheme.textColor }}>
                                            {companyType || "Not updated"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                            Company Size
                                        </label>
                                        <p style={{ color: activeTheme.textColor }}>
                                            {companySize || "Not updated"}
                                        </p>
                                    </div>

                                    <div>
                                        <label className="text-sm font-semibold" style={{ color: activeTheme.textColor2 }}>
                                            Founded Year
                                        </label>
                                        <p style={{ color: activeTheme.textColor }}>
                                            {foundedYear || "Not updated"}
                                        </p>
                                    </div>

                                </div>
                            </div>


                            {/* EVENTS BUTTON */}
                            <button
                                onClick={() => setSelectedEventIndex(0)}
                                className="flex items-center gap-2 p-4 rounded-lg transition border hover:opacity-80"
                                style={{
                                    backgroundColor: activeTheme.bgColor,
                                    color: activeTheme.textColor2,
                                    borderColor: activeTheme.textColor2,
                                    borderWidth: "2px"
                                }}
                            >
                                <span className="text-2xl font-bold">{total_events_organised || 0}</span>
                                <span className="text-lg font-semibold">Events Organized</span>
                            </button>

                        </div>
                    </div>


                    {/* RIGHT SIDEBAR */}
                    <div className="lg:col-span-1">
                        <div
                            className="sticky top-20 rounded-lg p-6 border space-y-4"
                            style={{
                                backgroundColor: activeTheme.divColor,
                                borderColor: activeTheme.divColor2
                            }}
                        >
                            <h3 className="font-bold text-lg" style={{ color: activeTheme.textColor }}>
                                Recent Events
                            </h3>

                            {organised_events && organised_events.length > 0 ? (
                                <div className="space-y-3">
                                    {organised_events.slice(0, 2).map((event) => (
                                        <Link key={event.event_id} href={`/event/${event.event_id}`}>
                                            <div
                                                className="p-3 rounded-lg border hover:opacity-80 cursor-pointer transition"
                                                style={{
                                                    backgroundColor: activeTheme.bgColor,
                                                    borderColor: activeTheme.divColor2
                                                }}
                                            >
                                                <p className="font-semibold text-sm" style={{ color: activeTheme.textColor }}>
                                                    {event.event_name}
                                                </p>
                                                <p className="text-xs" style={{ color: activeTheme.textColor2 }}>
                                                    {formatDateTime(event.created_at)}
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: activeTheme.textColor2 }}>No events yet</p>
                            )}
                        </div>
                    </div>

                </div>

            </div>

            <EventsModal
                events={organised_events}
                isOpen={selectedEventIndex !== null}
                onClose={() => setSelectedEventIndex(null)}
                theme={activeTheme}
            />
        </div>
    )
}

export default ManagerView