"use client"

import React from "react"
import HeaderView from "./HeaderView"
import { useHeader } from "./useHeader"

const HeaderContainer = () => {
    const {
        isClient,
        isLoggedIn,
        username,
        type,
        activeTheme,
        profileOpen,
        setProfileOpen,
        profileRef,
        isHidden,
        onRefresh,
        isRefreshing,
        onCreateEventClick,
        showCreateModal,
        setShowCreateModal,
        isHomeRoute
    } = useHeader()

    if (isHidden || !isClient) return null

    return (
        <HeaderView
            isLoggedIn={isLoggedIn}
            username={username}
            type={type}
            activeTheme={activeTheme}
            profileOpen={profileOpen}
            setProfileOpen={setProfileOpen}
            profileRef={profileRef}
            onRefresh={onRefresh}
            isRefreshing={isRefreshing}
            onCreateEventClick={onCreateEventClick}
            showCreateModal={showCreateModal}
            setShowCreateModal={setShowCreateModal}
            isHomeRoute={isHomeRoute}
        />
    )
}

export default HeaderContainer