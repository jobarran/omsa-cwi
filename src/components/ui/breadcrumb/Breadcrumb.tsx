"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FaHome, FaTools } from 'react-icons/fa';
import { FaBuilding, FaGear, FaUserGroup } from 'react-icons/fa6';

// Icon mapping with Spanish translations
const iconMapping: { [key: string]: { icon: React.ElementType, label: string } } = {
    '/tools': { icon: FaTools, label: 'Herramientas' },
    '/projects': { icon: FaBuilding, label: 'Obras' },
    '/workers': { icon: FaUserGroup, label: 'Operarios' },
    '/admin': { icon: FaGear, label: 'Admin' },
};

export const Breadcrumb = () => {
    const router = usePathname();
    const path = router.split('/').filter(Boolean); // Split the path and remove empty parts

    // If the path is empty (we're on the index page), don't render the breadcrumb
    if (path.length === 0) {
        return null;
    }

    const breadcrumbItems = [
        {
            name: 'Inicio',
            href: '/',
            icon: FaHome,
        },
        ...path.map((item, index) => {
            const href = `/${path.slice(0, index + 1).join('/')}`;
            const segment = `/${path.slice(0, index + 1).join('/')}`;
            const iconData = iconMapping[segment];
            const name = iconData?.label || item.charAt(0).toUpperCase() + item.slice(1);

            return {
                name: name, // Use the Spanish label if available
                href: href,
                icon: iconData?.icon || null, // Use the icon if available
            };
        }),
    ];

    return (
        <div aria-label="breadcrumb" className="border w-full bg-white p-4 rounded-lg mb-3">
            <ol className="flex items-center whitespace-nowrap">
                {breadcrumbItems.map((item, index) => (
                    <div key={index} className="inline-flex items-center">
                        <Link href={item.href} legacyBehavior>
                            <div className="inline-flex items-start justify-center text-sm text-gray-500 hover:text-sky-800 focus:outline-none focus:text-sky-800 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500 cursor-pointer">
                                {item.icon && (
                                    <item.icon className="shrink-0 me-1 size-4" />
                                )}
                                {item.name}
                            </div>
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                            <svg
                                className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m9 18 6-6-6-6"></path>
                            </svg>
                        )}
                    </div>
                ))}
            </ol>
        </div>
    );
};
