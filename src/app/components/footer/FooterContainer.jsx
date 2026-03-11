"use client"

import React from "react"
import FooterView from "./FooterView"
import { useFooter } from "./useFooter"

export default function FooterContainer() {
    const {
        isClient,
        isHidden,
        open,
        setOpen,
        activeTheme,
        colorId,
        isLoggedIn,
        firstName,
        lastName,
        type,
        changeColorTheme,
        currentYear
    } = useFooter()

    if (isHidden || !isClient) return null

    return (
        <FooterView
            activeTheme={activeTheme}
            colorId={colorId}
            isLoggedIn={isLoggedIn}
            firstName={firstName}
            lastName={lastName}
            type={type}
            open={open}
            setOpen={setOpen}
            changeColorTheme={changeColorTheme}
            currentYear={currentYear}
        />
    )
}