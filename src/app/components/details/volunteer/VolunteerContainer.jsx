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
        activeModal,
        setActiveModal,
        updating,
        updateError,
        setUpdateError,
        deleteLoading,
        deleteError,
        setDeleteError,
        handleUpdateVolunteer,
        handleDeleteAccount
    } = useVolunteer()

    if (!isClient) return null

    return (
        <VolunteerView
            volunteer={volunteer}
            loading={loading}
            error={error}
            activeTheme={activeTheme}
            activeModal={activeModal}
            setActiveModal={setActiveModal}
            updating={updating}
            updateError={updateError}
            setUpdateError={setUpdateError}
            deleteLoading={deleteLoading}
            deleteError={deleteError}
            setDeleteError={setDeleteError}
            handleUpdateVolunteer={handleUpdateVolunteer}
            handleDeleteAccount={handleDeleteAccount}
        />
    )
}

export default VolunteerContainer
