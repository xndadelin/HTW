"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { useQuery } from "react-query"
import { getUser } from "@/utils/queries/user/getUser"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import Loading from "@/components/auth/Loading"
import { logout } from "@/utils/queries/user/logout"

const Item = ({ title, description, href, ...props }: { title: string, description: string, href: string }) => {
    return (
        <li {...props}>
            <NavigationMenuLink asChild>
                <Link
                    href={href}
                    className="flex h-full w-full select-none flex-col rounded-md mt-0 pt-0 p-6 no-underline outline-none focus:shadow-md hover:bg-primary-foreground hover:scale-105 transition-transform"
                >
                    <div className="mb-2 mt-4 text-lg font-medium">
                        {title}
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                        {description}
                    </p>
                </Link>
            </NavigationMenuLink>
        </li>
    )
}

const items = [
    {
        title: "Hack The Way",
        description: "A platform for advanced cybersecurity training through CTF challenges, contests, and hands-on lessons. Enhance your skills and test your knowledge in a practical environment.",
        href: "/",
        className: "row-span-3 bg-primary-foreground"
    },
    {
        title: "Introduction to CTF",
        description: "Learn the basics of Capture the Flag competitions, the key categories of challenges, and how to get started.",
        href: "/"
    },
    {
        title: "Setting Up Your Hacking Lab",
        description: "Build your personal hacking lab using Virtual Machines to safely practice cybersecurity techniques.",
        href: "/"
    },
    {
        title: "Vulnerabilities",
        description: "Explore common vulnerabilities and learn how attackers exploit them to gain unauthorized access.",
        href: "/"
    },
    {
        title: "Interactive Cybersecurity Training",
        description: "Engage with step-by-step tutorials designed for beginners and advanced learners. Cover topics like network security, cryptography, and ethical hacking with real-time guidance.",
        href: "/"
    },
    {
        title: "Create and Manage Classes",
        description: "Design and manage your own cybersecurity courses. Customize learning modules, assignments, and track student progress with detailed analytics.",
        href: "/"
    },
    {
        title: "Analytics & Performance Tracking",
        description: "Analyze student performance with detailed reports. Identify areas for improvement and track the progress of individual learners through assignments, labs, and exams.",
        href: "/"
    },
    {
        title: "Vulnerabilities",
        description: "Explore common vulnerabilities and learn how attackers exploit them to gain unauthorized access.",
        href: "/"
    }
]


export const Navbar = () => {

    const { data: user, isLoading } = useQuery("user", getUser)

    return (
        <nav className="container mx-auto flex h-20 w-full items-center justify-between px-4 md:px-6">
            <Link href="/" className="flex items-center gap-2" prefetch={false}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="#EF4444" viewBox="0 0 448 512">
                    <path d="M48 24C48 10.7 37.3 0 24 0S0 10.7 0 24L0 64 0 350.5 0 400l0 88c0 13.3 10.7 24 24 24s24-10.7 24-24l0-100 80.3-20.1c41.1-10.3 84.6-5.5 122.5 13.4c44.2 22.1 95.5 24.8 141.7 7.4l34.7-13c12.5-4.7 20.8-16.6 20.8-30l0-279.7c0-23-24.2-38-44.8-27.7l-9.6 4.8c-46.3 23.2-100.8 23.2-147.1 0c-35.1-17.6-75.4-22-113.5-12.5L48 52l0-28zm0 77.5l96.6-24.2c27-6.7 55.5-3.6 80.4 8.8c54.9 27.4 118.7 29.7 175 6.8l0 241.8-24.4 9.1c-33.7 12.6-71.2 10.7-103.4-5.4c-48.2-24.1-103.3-30.1-155.6-17.1L48 338.5l0-237z" /></svg>
                <span className="text-lg font-bold">Hack The Way</span>
            </Link>

            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Getting Started
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-secondary">
                            <ul className="grid gap-4 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2">
                                <Item {...items[0]} />
                                <Item {...items[1]} />
                                <Item {...items[2]} />
                                <Item {...items[3]} />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>

                    <NavigationMenuItem>
                        <NavigationMenuTrigger>
                            Features
                        </NavigationMenuTrigger>
                        <NavigationMenuContent className="bg-secondary">
                            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] grid-cols-2">
                                <Item {...items[4]} />
                                <Item {...items[5]} />
                                <Item {...items[6]} />
                                <Item {...items[7]} />
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                        <Link href="/docs" legacyBehavior passHref>
                            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                Documentation
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>

            {user ? (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Avatar>
                            <AvatarImage src={user.user_metadata.avatar_url} />
                            <AvatarFallback>
                                {user.user_metadata.full_name.slice(0, 2)}
                            </AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>My account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                           <DropdownMenuItem>
                                <User />
                                <span>Profile</span>
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={logout}>
                                <LogOut />
                                <span>Logout</span>
                           </DropdownMenuItem>
                        </DropdownMenuGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            ) : (
                <div className="flex gap-4">
                    <Link href="/auth/login">
                        <Button variant="outline">Login</Button>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="destructive">Register</Button>
                    </Link>
                </div>
            )}
        </nav>
    )
}