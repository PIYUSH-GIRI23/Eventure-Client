import React from 'react'

const Theme = () => {
    return (
        <div className="hidden lg:flex flex-col justify-center items-center w-full h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white px-8">
           
            <div className="max-w-lg text-center">
                {/* Main Heading */}
                <h1 className="text-5xl font-bold mb-2 leading-tight">
                    Join the <span className="text-amber-300">Volunteer Community</span>
                </h1>

                {/* Description */}
                <p className="text-lg text-emerald-100 mb-8 leading-relaxed">
                    Welcome to <span className="font-bold text-white">Eventure AI</span> - Connect with meaningful events and volunteer opportunities powered by AI recommendations.
                </p>

                {/* Features */}
                <div className="space-y-4 mb-8">
                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition">
                        <span className="text-2xl">🤖</span>
                        <div className="text-left">
                            <p className="font-semibold">AI Recommendations</p>
                            <p className="text-sm text-emerald-100">Smart event suggestions tailored to you</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition">
                        <span className="text-2xl">💬</span>
                        <div className="text-left">
                            <p className="font-semibold">Real-time Chat</p>
                            <p className="text-sm text-emerald-100">Connect with event managers and volunteers</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition">
                        <span className="text-2xl">📅</span>
                        <div className="text-left">
                            <p className="font-semibold">Easy Registration</p>
                            <p className="text-sm text-emerald-100">Register for events in just one click</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md rounded-lg p-4 hover:bg-white/20 transition">
                        <span className="text-2xl">🎖️</span>
                        <div className="text-left">
                            <p className="font-semibold">Track Your Impact</p>
                            <p className="text-sm text-emerald-100">See your volunteer hours and contributions</p>
                        </div>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 py-8 border-t border-white/20">
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-300">5000+</p>
                        <p className="text-sm text-emerald-100">Active Volunteers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-300">500+</p>
                        <p className="text-sm text-emerald-100">Events Created</p>
                    </div>
                    <div className="text-center">
                        <p className="text-3xl font-bold text-amber-300">24/7</p>
                        <p className="text-sm text-emerald-100">Support</p>
                    </div>
                </div>

                {/* Quote */}
                <div className="mt-8 bg-white/10 backdrop-blur-md rounded-lg p-6">
                    <p className="italic text-lg">
                        &quot;Make a difference in your community. Every volunteer brings change, every event creates impact.&quot;
                    </p>
                </div>
            </div>

           
        </div>
    )
}

export default Theme
