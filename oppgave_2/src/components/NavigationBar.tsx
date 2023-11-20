"use client"

// Needed for link and usePathName
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
    {label: "Athletes", href: "/"},
    {label: "Add athlete", href: "/add-athlete"},
    {label: "Add template", href: "/add-template"},
    {label: "Questions", href: "/questions"},
]

export default function NavigationBar() {
    const pathName = usePathname();

    const checkActivePath = (path: string) => {
        return path === pathName;
    }

    return (
        <nav>
            {navigation.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    /* src: https://chat.openai.com */
                    className={`navigation-button ${checkActivePath(item.href) ? 'underline' : ''}`}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}