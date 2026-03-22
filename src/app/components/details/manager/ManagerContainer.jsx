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
    } = useManager()

    if (!isClient) return null

    return (
        <ManagerView
            manager={manager}
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
            handleUpdateManager={handleUpdateManager}
            handleDeleteAccount={handleDeleteAccount}
        />
    )
}

export default ManagerContainer
