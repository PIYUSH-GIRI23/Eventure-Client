import React from "react"
import Link from "next/link"
import { BiBell, BiMessage } from "react-icons/bi"
import { BiRefresh } from "react-icons/bi"
import { IoAdd } from "react-icons/io5"
import { performLogout } from "@/app/utils/logoutUtil"
import CreateEventModalContainer from "./CreateEventModalContainer"

const HeaderView = ({
    isLoggedIn,
    username,
    type,
    activeTheme,
    profileOpen,
    setProfileOpen,
    profileRef,
    onRefresh,
    isRefreshing,
    onCreateEventClick,
    showCreateModal,
    setShowCreateModal,
    isHomeRoute
}) => {
    return (
        <>
            <header
                className="border-b"
                style={{
                    backgroundColor: activeTheme.bgColor,
                    borderColor: activeTheme.divColor2,
                    color: activeTheme.textColor2
                }}
            >
                <div className="mx-auto flex items-center justify-between gap-3 px-4 py-3">

                    {/* Left Section - Logo */}
                    <div className="flex items-center gap-6 text-xs sm:text-sm">
                        <Link href="/" className="flex flex-col gap-0">
                            <span className="font-bold" style={{ color: activeTheme.textColor }}>
                                Eventure AI
                            </span>
                        </Link>

                        {isLoggedIn && (
                            <>
                                {/* Refresh Button - Only show on home route */}
                                {isHomeRoute && (
                                    <button
                                        onClick={onRefresh}
                                        disabled={isRefreshing}
                                        className="px-2 py-1 rounded hover:opacity-80 transition-opacity disabled:opacity-50"
                                        title="Refresh events"
                                        style={{ color: activeTheme.textColor }}
                                    >
                                        <BiRefresh size={20} className={isRefreshing ? "animate-spin" : ""} />
                                    </button>
                                )}

                                <Link
                                    href={type === "manager" ? "/created-event" : "/registered-event"}
                                    className="px-2 py-1 rounded hover:opacity-80"
                                    style={{ color: activeTheme.textColor }}
                                >
                                    {type === "manager" ? "Created Events" : "Registered Events"}
                                </Link>

                                <Link
                                    href="/bookmarked-event"
                                    className="px-2 py-1 rounded hover:opacity-80"
                                    style={{ color: activeTheme.textColor }}
                                >
                                    Bookmarked Events
                                </Link>

                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/liked-event"
                                        className="px-2 py-1 rounded hover:opacity-80"
                                        style={{ color: activeTheme.textColor }}
                                    >
                                        Liked Events
                                    </Link>

                                    {/* Create Event Button - Only for managers */}
                                    {type === 'manager' && (
                                        <button
                                            onClick={onCreateEventClick}
                                            className="px-2 py-1 rounded hover:opacity-80 transition-opacity"
                                            title="Create new event"
                                            style={{ color: activeTheme.textColor }}
                                        >
                                            <IoAdd size={20} />
                                        </button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Right Section */}
                    <div className="flex items-center gap-4 text-xs sm:text-sm">

                        {!isLoggedIn ? (
                            <>
                                <Link href="/login" style={{ color: activeTheme.textColor }}>Login</Link>
                                <Link href="/register" style={{ color: activeTheme.textColor }}>Register</Link>
                            </>
                        ) : (
                            <div className="flex items-center gap-3">
                                {/* Notifications and Chat Icons */}
                                <button
                                    className="cursor-pointer hover:opacity-80 transition-opacity"
                                    title="Notifications"
                                    style={{ color: activeTheme.textColor }}
                                >
                                    <BiBell size={20} />
                                </button>

                                <button
                                    className="mx-2 cursor-pointer hover:opacity-80 transition-opacity"
                                    title="Chat"
                                    style={{ color: activeTheme.textColor }}
                                >
                                    <BiMessage size={20} />
                                </button>

                                {/* Profile Dropdown */}
                                <div className="relative" ref={profileRef}>
                                    <button
                                        onClick={() => setProfileOpen(prev => !prev)}
                                        className="cursor-pointer px-2 py-1 rounded hover:opacity-80"
                                        style={{ color: activeTheme.textColor }}
                                    >
                                        @{username} ▾
                                    </button>

                                    {profileOpen && (
                                        <div
                                            className="absolute right-0 top-full mt-2 flex flex-col min-w-40 rounded-md shadow-lg z-20"
                                            style={{
                                                backgroundColor: activeTheme.divColor,
                                                border: `1px solid ${activeTheme.divColor2}`
                                            }}
                                        >
                                            <Link
                                                href="/account"
                                                onClick={() => setProfileOpen(false)}
                                                className="px-3 py-2 hover:opacity-80"
                                                style={{ color: activeTheme.textColor }}
                                            >
                                                Account
                                            </Link>

                                            <button
                                                onClick={() => {
                                                    performLogout()
                                                    setProfileOpen(false)
                                                }}
                                                className="px-3 py-2 text-left hover:opacity-80"
                                                style={{ color: activeTheme.textColor }}
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Create Event Modal */}
            <CreateEventModalContainer
                isOpen={showCreateModal}
                onClose={() => setShowCreateModal(false)}
                activeTheme={activeTheme}
                onEventCreated={() => {
                    setShowCreateModal(false)
                }}
            />
        </>
    )
}

export default HeaderView
