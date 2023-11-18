"use client"

// Needed for link and usePathName
import Link from "next/link";
import { usePathname } from "next/navigation";

// Check this later -> wont work with øæå
// const urlFriendlyQuestion = encodeURIComponent("Spørsmål");
const navigation = [
    {label: "Utøvere", href: "/"},
    {label: "Ny Utøver", href: "/ny-utover"},
    {label: "Ny Mal", href: "/ny-mal"},
    {label: "Spørsmål", href: "/sporsmal"},
]

export default function NavigationBar() {
    const pathName = usePathname();

    const checkActivePath = (path: string) => {
        return path === pathName;
    }

    return (
        <nav className="flex gap-4">
            {navigation.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    className={checkActivePath(item.href) ? "underline" : ""}
                >
                    {item.label}
                </Link>
            ))}
        </nav>
    )
}