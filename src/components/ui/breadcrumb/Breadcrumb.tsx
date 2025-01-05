"use client";

import Link from 'next/link';
import { usePathname } from "next/navigation";
import { FaAngleRight, FaHome, FaTools } from 'react-icons/fa';
import { FaBuilding, FaFingerprint, FaGear, FaHelmetSafety, FaUserGroup } from 'react-icons/fa6';

// Icon mapping with Spanish translations
const iconMapping: { [key: string]: { icon: React.ElementType, label: string } } = {
    '/tools': { icon: FaTools, label: 'Herramientas' },
    '/projects': { icon: FaBuilding, label: 'Obras' },
    '/workers': { icon: FaUserGroup, label: 'Operarios' },
    '/records': { icon: FaFingerprint, label: 'Registros' },
    '/admin': { icon: FaGear, label: 'Admin' },
    '/safety': { icon: FaHelmetSafety, label: 'Seguridad' },
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

    // Add prefix to the third breadcrumb item's text based on the second item's name
    if (breadcrumbItems.length > 2) {
        const secondItemName = breadcrumbItems[1].name;
        const thirdItem = breadcrumbItems[2];

        if (thirdItem.name === 'New') { thirdItem.name = "Nuevo" }
        else if (secondItemName === 'Operarios' || secondItemName === 'Admin') {
            thirdItem.name = `Legajo: ${thirdItem.name}`;
        } else if (secondItemName === 'Herramientas') {
            thirdItem.name = `Código: ${thirdItem.name}`;
        } else if (secondItemName === 'Obras') {
            thirdItem.name = `ID: ${thirdItem.name}`;
        }
    }

    return (
        <div aria-label="breadcrumb" className="border w-full bg-white p-4 rounded-lg mb-3">
            <ol className="flex items-center whitespace-nowrap overflow-hidden">
                {breadcrumbItems.map((item, index) => (
                    <div key={index} className="inline-flex items-center">
                        <Link href={item.href} legacyBehavior>
                            <div className="inline-flex items-center justify-center text-sm text-gray-500 hover:text-sky-800 focus:outline-none focus:text-sky-800 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500 cursor-pointer max-w-xs truncate">
                                {item.icon && (
                                    <item.icon className="shrink-0 me-1 size-3" />
                                )}
                                <span className="truncate">{item.name}</span>
                            </div>
                        </Link>
                        {index < breadcrumbItems.length - 1 && (
                            <FaAngleRight className="shrink-0 mx-1 size-4 text-gray-400" />
                        )}
                    </div>
                ))}
            </ol>
        </div>
    );
};
