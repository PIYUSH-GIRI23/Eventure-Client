"use client"

import React from "react"
import VolunteerView from "./VolunteerView"
import { useVolunteer } from "./useVolunteer"

const VolunteerContainer = () => {
    const {
        isClient,
        volunteer,
        loading,
        error,
        activeTheme,
        selectedEventIndex,
        setSelectedEventIndex
    } = useVolunteer()

    if (!isClient) return null

    return (
        <VolunteerView
            volunteer={volunteer}
            loading={loading}
            error={error}
            activeTheme={activeTheme}
            selectedEventIndex={selectedEventIndex}
            setSelectedEventIndex={setSelectedEventIndex}
        />
    )
}

export default VolunteerContainer
