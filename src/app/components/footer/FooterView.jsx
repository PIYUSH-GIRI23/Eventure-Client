import React from "react"
import Link from "next/link"
import colorSchemeOptions from "@/app/state/colorschemeOptions"

const FooterView = ({
    activeTheme,
    colorId,
    isLoggedIn,
    firstName,
    lastName,
    type,
    open,
    setOpen,
    changeColorTheme,
    currentYear
}) => {
    return (
        <footer
            className="border-t"
            style={{
                backgroundColor: activeTheme.bgColor,
                borderColor: activeTheme.divColor2,
                color: activeTheme.textColor2
            }}
        >
            <div className="mx-auto flex flex-col md:flex-row items-center justify-between gap-2 px-4 py-3 text-xs sm:text-sm">

                {/* Left */}
                <div className="flex items-center gap-4">
                    <span>© {currentYear} Eventure AI</span>

                    <Link
                        href="https://www.github.com/PIYUSH-GIRI23"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline-offset-4 hover:underline"
                    >
                        GitHub
                    </Link>
                </div>

                {/* Middle */}
                <div className="flex flex-wrap items-center gap-4 cursor-default">
                    <span title="userdata">
                        {isLoggedIn && `${firstName} ${lastName} - ${type.charAt(0).toUpperCase() + type.slice(1)}`}
                    </span>
                </div>

                {/* Right */}
                <div className="relative flex items-center gap-2">
                    <button
                        onClick={() => setOpen(!open)}
                        className="px-3 py-1 inline-flex items-center gap-1 cursor-pointer whitespace-nowrap transition-all duration-200 hover:scale-105"
                        aria-haspopup="menu"
                        aria-expanded={open}
                        style={{
                            color: activeTheme.textColor,
                            width: "150px"
                        }}
                    >
                        <span className="flex-1 truncate">{activeTheme.name} ▾</span>
                    </button>

                    {open && (
                        <div
                            className="absolute bottom-full mb-2 flex flex-col min-w-25 rounded-md shadow-lg"
                            style={{
                                backgroundColor: activeTheme.divColor,
                                border: `1px solid ${activeTheme.divColor2}`
                            }}
                        >
                            {colorSchemeOptions.map(option => (
                                <button
                                    key={option.id}
                                    onClick={() => changeColorTheme(option.id)}
                                    className="px-3 py-2 text-left hover:opacity-80 cursor-pointer"
                                    style={{
                                        color: activeTheme.textColor,
                                        backgroundColor:
                                            option.id === colorId
                                                ? activeTheme.divColor2
                                                : activeTheme.divColor
                                    }}
                                >
                                    {option.name}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

            </div>
        </footer>
    )
}

export default FooterView
