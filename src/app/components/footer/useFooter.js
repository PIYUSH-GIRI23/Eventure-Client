"use client"

import { useSelector, useDispatch } from "react-redux"
import { useMemo, useState, useSyncExternalStore } from "react"
import { usePathname } from "next/navigation"
import { setColorScheme } from "@/app/state/slices/colorschemeSlice"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

export const useFooter = () => {
    const dispatch = useDispatch()
    const pathname = usePathname()

    const isClient = useSyncExternalStore(
        () => () => {},
        () => true,
        () => false
    )

    const [open, setOpen] = useState(false)

    const colorId = useSelector((state) => state.colorscheme.id)
    const userdata = useSelector((state) => state.userdata)

    const activeTheme = useMemo(
        () => colorSchemeOptions.find((option) => option.id === colorId) ?? colorSchemeOptions[0],
        [colorId]
    )

    const hiddenRoutes = ['/login', '/register']
    const isHidden = hiddenRoutes.includes(pathname)

    const {
        isLoggedIn = false,
        firstName = "",
        lastName = "",
        type = "volunteer"
    } = userdata || {}

    const changeColorTheme = (id) => {
        const isValid = colorSchemeOptions.some((option) => option.id === id)
        if (!isValid) return
        dispatch(setColorScheme({ id }))
        setOpen(false)
    }

    const currentYear = new Date().getFullYear()

    return {
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
    }
}
