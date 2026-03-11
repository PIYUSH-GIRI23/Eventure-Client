import React from "react"
import Link from "next/link"
import { BiBell, BiMessage } from "react-icons/bi"
import { performLogout } from "@/app/utils/logoutUtil"

const HeaderView = ({
    isLoggedIn,
    username,
    type,
    activeTheme,
    profileOpen,
    setProfileOpen,
    profileRef
}) => {
    return (
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
                            <Link
                                href="/hotpicks"
                                className="px-2 py-1 rounded hover:opacity-80"
                                style={{ color: activeTheme.textColor }}
                            >
                                Hot Picks
                            </Link>

                            <Link
                                href={type === "manager" ? "/created-events" : "/registered-events"}
                                className="px-2 py-1 rounded hover:opacity-80"
                                style={{ color: activeTheme.textColor }}
                            >
                                {type === "manager" ? "Created Events" : "Registered Events"}
                            </Link>
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
    )
}

export default HeaderView
