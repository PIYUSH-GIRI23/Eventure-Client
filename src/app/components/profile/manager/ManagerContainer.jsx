"use client"

import React from "react"
import ManagerView from "./ManagerView"
import { useManager } from "./useManager"

const ManagerContainer = () => {
    const {
        isClient,
        manager,
        loading,
        error,
        activeTheme,
        selectedEventIndex,
        setSelectedEventIndex
    } = useManager()

    if (!isClient) return null

    return (
        <ManagerView
            manager={manager}
            loading={loading}
            error={error}
            activeTheme={activeTheme}
            selectedEventIndex={selectedEventIndex}
            setSelectedEventIndex={setSelectedEventIndex}
        />
    )
}

export default ManagerContainer
