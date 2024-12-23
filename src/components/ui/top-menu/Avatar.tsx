'use client';

import clsx from "clsx";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";


interface Props {
    initials: string,
    image?: string,
    legajo: string,
    logout: () => {}
}

export const Avatar = ({ initials, image, legajo, logout }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            // Check if the clicked element is outside the dropdown
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        // Attach the event listener when the component mounts
        document.addEventListener('click', handleOutsideClick);

        // Detach the event listener when the component unmounts
        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, []);


    const handleButtonClick = () => {
        setIsOpen(!isOpen);
    };

    const handleProfileClick = () => {
        setIsOpen(!isOpen);
    }

    const handleLogout = () => {
        setIsOpen(!isOpen);
        logout()
    }

    return (


        <div
            className={`relative`}
            data-te-dropdown-show={isOpen}
            ref={dropdownRef}
        >
            <button
                id="dropdownMenuButton1"
                data-te-dropdown-toggle-ref
                aria-expanded={isOpen}
                data-te-ripple-init
                data-te-ripple-color="light"
                onClick={handleButtonClick}
            >
                <span className="sr-only">Abrir menu</span>
                <span className="m-2 circle-container inline-flex items-center justify-center h-8 w-8 text-sm font-semibold leading-none rounded-full border bg-gray-100 text-gray-600">
                    {initials ? (
                        initials
                    ) : (
                        <span className="inline-block w-8 h-8 bg-gray-100 rounded-full overflow-hidden relative">
                            <svg className="size-full text-gray-300" width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.62854" y="0.359985" width="15" height="15" rx="7.5" fill="white"></rect>
                                <path d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z" fill="currentColor"></path>
                                <path d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z" fill="currentColor"></path>
                            </svg>
                        </span>
                    )}
                </span>
            </button>

            <ul
                className={
                    clsx(
                        "fixed z-[1000] mt-1 min-w-max list-none overflow-hidden rounded-lg border-none transition-transform bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-white [&[data-te-dropdown-show]]:block",
                        {
                            "translate-x-full": !isOpen,
                            "right-2": isOpen,
                        }
                    )
                }
                aria-labelledby="dropdownMenuButton1"
                data-te-dropdown-menu-ref

            >
                <Link
                    href={`/admin/${legajo}`}
                    className="block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-gray-600"
                    data-te-dropdown-item-ref
                    onClick={handleProfileClick}
                >
                    Perfil
                </Link>
                <button
                    className="block cursor-pointer w-full whitespace-nowrap px-4 py-2 text-sm font-normal text-gray-600"
                    onClick={handleLogout}
                    data-te-dropdown-item-ref
                >
                    Cerrar sesión
                </button>
            </ul>
        </div>
    )
}
