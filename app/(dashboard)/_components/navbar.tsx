"use client"
import { UserButton } from "@clerk/nextjs";
export const Navbar = () => {
    return (
        <div className="flex items-centre gap-x-4 p-5 bg-green-500">
            <div className="hidden lg:flex-1 lg:flex bg-yellow-500">
                search
            </div>
            <UserButton/>
        </div>
    )
};