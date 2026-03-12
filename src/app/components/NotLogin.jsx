"use client"

import React, { useSyncExternalStore } from "react"
import Link from "next/link"
import { useSelector } from "react-redux"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

const NotLogin = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const colorSchemeId = useSelector((state) => state.colorscheme.id)
    const activeTheme = colorSchemeOptions.find((theme) => theme.id === colorSchemeId) || colorSchemeOptions[0]

    if (!isClient) {
        return null
    }

    return (
        <div
            className="min-h-[89.4vh] md:h-[89.4vh] overflow-y-auto w-full"
            style={{ backgroundColor: activeTheme.bgColor }}
        >
            {/* Hero Section */}
            <div className="min-h-screen flex items-center justify-center px-4 md:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    {/* Heading */}
                    <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ color: activeTheme.textColor }}>
                        Welcome to Eventure AI
                    </h1>

                    {/* Subheading */}
                    <p className="text-xl md:text-2xl mb-8 font-medium" style={{ color: activeTheme.textColor2 }}>
                        Discover, Create & Connect with Amazing Events
                    </p>

                    {/* Description */}
                    <p className="text-lg mb-12" style={{ color: activeTheme.textColor, opacity: 0.8 }}>
                        Your ultimate platform for finding events that match your interests, creating memorable experiences, and connecting with like-minded people in your community.
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <Link
                            href="/login"
                            className="px-10 py-4 rounded-lg font-bold text-lg text-white transition-all hover:shadow-lg transform hover:scale-105"
                            style={{ backgroundColor: activeTheme.textColor2 }}
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="px-10 py-4 rounded-lg font-bold text-lg transition-all hover:shadow-lg transform hover:scale-105"
                            style={{
                                backgroundColor: activeTheme.divColor,
                                color: activeTheme.textColor2,
                                border: `2px solid ${activeTheme.textColor2}`
                            }}
                        >
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div
                className="py-16 md:py-24 px-4 md:px-8"
                style={{ backgroundColor: activeTheme.divColor }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: activeTheme.textColor }}>
                        Why Join Eventure AI?
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div
                            className="p-8 rounded-xl text-center"
                            style={{ backgroundColor: activeTheme.bgColor }}
                        >
                            <div className="text-5xl mb-4">🎉</div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: activeTheme.textColor }}>
                                Discover Events
                            </h3>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Browse hundreds of events across different categories and find exactly what interests you
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div
                            className="p-8 rounded-xl text-center"
                            style={{ backgroundColor: activeTheme.bgColor }}
                        >
                            <div className="text-5xl mb-4">📅</div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: activeTheme.textColor }}>
                                Create & Manage
                            </h3>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Easily organize and host your own events with our intuitive event creation tools
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div
                            className="p-8 rounded-xl text-center"
                            style={{ backgroundColor: activeTheme.bgColor }}
                        >
                            <div className="text-5xl mb-4">🤝</div>
                            <h3 className="text-2xl font-bold mb-4" style={{ color: activeTheme.textColor }}>
                                Connect & Network
                            </h3>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Meet people with shared interests and build meaningful connections
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How It Works Section */}
            <div className="py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: activeTheme.textColor }}>
                        How It Works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                        {/* Step 1 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl"
                                style={{ backgroundColor: activeTheme.textColor2 }}
                            >
                                1
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: activeTheme.textColor }}>
                                Sign Up
                            </h4>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Create your account in seconds
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl"
                                style={{ backgroundColor: activeTheme.textColor2 }}
                            >
                                2
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: activeTheme.textColor }}>
                                Explore
                            </h4>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Browse and discover events
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl"
                                style={{ backgroundColor: activeTheme.textColor2 }}
                            >
                                3
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: activeTheme.textColor }}>
                                Join or Create
                            </h4>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Register for events or create your own
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="text-center">
                            <div
                                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 text-white font-bold text-2xl"
                                style={{ backgroundColor: activeTheme.textColor2 }}
                            >
                                4
                            </div>
                            <h4 className="text-xl font-bold mb-3" style={{ color: activeTheme.textColor }}>
                                Connect
                            </h4>
                            <p style={{ color: activeTheme.textColor, opacity: 0.7 }}>
                                Meet new people and have fun
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Categories Section */}
            <div
                className="py-16 md:py-24 px-4 md:px-8"
                style={{ backgroundColor: activeTheme.divColor }}
            >
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: activeTheme.textColor }}>
                        Explore Events by Category
                    </h2>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {["Tech", "Sports", "Music", "Food", "Culture", "Business"].map((category) => (
                            <div
                                key={category}
                                className="p-6 rounded-lg text-center font-semibold hover:shadow-lg transition-shadow"
                                style={{
                                    backgroundColor: activeTheme.bgColor,
                                    color: activeTheme.textColor2,
                                    border: `2px solid ${activeTheme.textColor2}`
                                }}
                            >
                                {category}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Testimonials Section */}
            <div className="py-16 md:py-24 px-4 md:px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl font-bold text-center mb-16" style={{ color: activeTheme.textColor }}>
                        What People Say
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { name: "Alex Johnson", comment: "Found amazing events and made great friends!" },
                            { name: "Sarah Williams", comment: "Easiest platform to organize my events" },
                            { name: "Mike Chen", comment: "Love the community and event variety"  }
                        ].map((testimonial, index) => (
                            <div
                                key={index}
                                className="p-8 rounded-lg"
                                style={{ backgroundColor: activeTheme.divColor }}
                            >
                                <div className="mb-4 text-2xl">⭐⭐⭐⭐⭐</div>
                                <p className="mb-6" style={{ color: activeTheme.textColor, opacity: 0.8 }}>
                                    {testimonial.comment}
                                </p>
                                <p className="font-bold" style={{ color: activeTheme.textColor2 }}>
                                    — {testimonial.name}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Final CTA Section */}
            <div
                className="py-16 md:py-24 px-4 md:px-8 text-center"
                style={{ backgroundColor: activeTheme.textColor2 }}
            >
                <h2 className="text-4xl font-bold mb-6 text-white">Ready to Get Started?</h2>
                <p className="text-xl mb-8 text-white opacity-90">
                    Join thousands of people discovering amazing events
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        href="/register"
                        className="px-10 py-4 rounded-lg font-bold bg-white transition-all hover:shadow-lg transform hover:scale-105"
                        style={{ color: activeTheme.textColor2 }}
                    >
                        Sign Up Now
                    </Link>
                    <Link
                        href="/login"
                        className="px-10 py-4 rounded-lg font-bold text-white border-2 border-white transition-all hover:bg-white hover:bg-opacity-10"
                    >
                        Already Have an Account?
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotLogin
