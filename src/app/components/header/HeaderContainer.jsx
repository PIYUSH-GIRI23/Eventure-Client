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
        isHidden
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
        />
    )
}

export default HeaderContainer