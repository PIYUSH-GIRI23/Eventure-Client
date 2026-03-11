"use client"

import { useDispatch, useSelector } from "react-redux"
import { useMemo, useState, useRef, useEffect, useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useHeader = () => {
    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const colorId = useSelector((state) => state.colorscheme.id)
    const { isLoggedIn, username, type } = useSelector((state) => state.userdata)

    const pathname = usePathname()
    const [profileOpen, setProfileOpen] = useState(false)
    const profileRef = useRef(null)

    const activeTheme = useMemo(
        () => colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0],
        [colorId]
    )

    useEffect(() => {
        if (!isClient) return

        const handleClick = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setProfileOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClick)
        return () => document.removeEventListener("mousedown", handleClick)

    }, [isClient])

    const hiddenRoutes = ['/login', '/register']
    const isHidden = hiddenRoutes.includes(pathname)

    return {
        isClient,
        isLoggedIn,
        username,
        type,
        activeTheme,
        profileOpen,
        setProfileOpen,
        profileRef,
        isHidden
    }
}
