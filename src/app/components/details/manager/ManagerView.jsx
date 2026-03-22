"use client"

import React from "react"
import { MdArrowBack, MdLogout } from "react-icons/md"
import { useRouter } from "next/navigation"
import { performLogout } from "@/app/utils/logoutUtil"
import LoadingSpinner from "@/app/components/LoadingSpinner"
import ProfileModal from "./modal/Profile"
import UpdateModal from "./modal/Update"
import DeleteModal from "./modal/Delete"

const ManagerView = ({
    manager,
    loading,
    error,
    activeTheme,
    activeModal,
    setActiveModal,
    updating,
    updateError,
    setUpdateError,
    deleteLoading,
    deleteError,
    setDeleteError,
    handleUpdateManager,
    handleDeleteAccount
}) => {
    const router = useRouter()

    if (loading) {
        return <LoadingSpinner />
    }

    if (!manager) {
        return (
            <div
                className="min-h-screen flex items-center justify-center p-6"
                style={{ backgroundColor: activeTheme.bgColor }}
            >
                <div
                    className="p-6 rounded-lg text-center max-w-md"
                    style={{ backgroundColor: activeTheme.divColor }}
                >
                    <p style={{ color: activeTheme.textColor2 }}>
                        {error || "Failed to load manager details"}
                    </p>
                </div>
            </div>
        )
    }

    const handleMenuClick = (itemId) => {
        if (itemId === "events") {
            router.push("/created-event")
        } else {
            setActiveModal(itemId)
        }
    }

    const menuItems = [
        { id: "profile", label: "Profile" },
        { id: "update", label: "Update" },
        { id: "delete", label: "Delete" },
        { id: "events", label: "Go to Events" }
    ]

    return (
        <div
            className="min-h-screen p-4 sm:p-6"
            style={{ backgroundColor: activeTheme.bgColor }}
        >
            <div className="max-w-7xl mx-auto">
                {/* Header with Back and Logout */}
                <div className="flex items-center justify-between mb-6 gap-3">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-lg hover:opacity-75 transition-opacity flex items-center gap-2"
                        style={{ color: activeTheme.textColor }}
                    >
                        <MdArrowBack size={20} />
                        <span className="text-sm sm:text-base">Back</span>
                    </button>
                    <button
                        onClick={() => performLogout()}
                        className="p-2 rounded-lg hover:opacity-75 transition-opacity flex items-center gap-2"
                        style={{ color: activeTheme.textColor }}
                    >
                        <MdLogout size={20} />
                        <span className="text-sm sm:text-base">Logout</span>
                    </button>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
                    {/* Left Sidebar - Menu */}
                    <div
                        className="md:col-span-1 p-4 rounded-lg"
                        style={{ backgroundColor: activeTheme.divColor }}
                    >
                        <h3
                            className="font-bold text-lg mb-4"
                            style={{ color: activeTheme.textColor }}
                        >
                            Menu
                        </h3>
                        <div className="space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleMenuClick(item.id)}
                                    className={`w-full p-3 rounded-lg text-left font-medium transition-all ${
                                        activeModal === item.id ? "opacity-100" : "opacity-70 hover:opacity-100"
                                    }`}
                                    style={{
                                        backgroundColor:
                                            activeModal === item.id
                                                ? activeTheme.textColor2
                                                : "transparent",
                                        color:
                                            activeModal === item.id
                                                ? activeTheme.bgColor
                                                : activeTheme.textColor2
                                    }}
                                >
                                    {item.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Content - Modal */}
                    <div className="md:col-span-3">
                        {activeModal === "profile" && (
                            <ProfileModal
                                manager={manager}
                                activeTheme={activeTheme}
                                onClose={() => setActiveModal(null)}
                            />
                        )}
                        {activeModal === "update" && (
                            <UpdateModal
                                manager={manager}
                                activeTheme={activeTheme}
                                onClose={() => setActiveModal(null)}
                                onUpdate={handleUpdateManager}
                                updating={updating}
                                updateError={updateError}
                                setUpdateError={setUpdateError}
                            />
                        )}
                        {activeModal === "delete" && (
                            <DeleteModal
                                activeTheme={activeTheme}
                                onClose={() => setActiveModal(null)}
                                onDelete={handleDeleteAccount}
                                deleteLoading={deleteLoading}
                                deleteError={deleteError}
                                setDeleteError={setDeleteError}
                            />
                        )}
                        {!activeModal && (
                            <div
                                className="p-6 rounded-lg text-center"
                                style={{ backgroundColor: activeTheme.divColor }}
                            >
                                <p style={{ color: activeTheme.textColor2 }}>
                                    Select an option from the menu to get started
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ManagerView
