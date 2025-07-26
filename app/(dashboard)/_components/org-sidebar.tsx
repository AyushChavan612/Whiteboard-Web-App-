"use client"
import Link from "next/link"
import Image from "next/image"
import {Poppins} from "next/font/google"
import { cn } from "@/lib/utils"
import { OrganizationSwitcher } from "@clerk/nextjs"
import { LayoutDashboard, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import {useSearchParams} from "next/navigation"

const font = Poppins({
    subsets : ["latin"],
    weight: ["600"],
})

export const Orgsidebar = () => {
    const searchParams = useSearchParams();
    const favorites = searchParams.get("favorites");
    return (
       <div className="hidden lg:flex flex-col space-y-6 w-[206px] pl-5 pt-5 bg-white-500">
              <Link href="/">

                 <div className="flex items-centergap-x-2">
                     <Image
                        src="/LoadingLogo.svg"
                        alt="Logo"
                        height={60}
                        width={60}
                     />

                    <span className={cn(
                    "font-semibold text-2xl",
                        font.className
                    )}>
                        Board
                    </span>

                 </div>
              </Link>

                <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                        },
                        organizationSwitcherTrigger: {
                            padding: "10px 14px",
                            width: "100%",
                            borderRadius: "12px",
                            border: "1px solid #d1d5db", 
                            background: "linear-gradient(to right, #f9fafb, #f3f4f6)",
                            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.05)",
                            justifyContent: "space-between",
                            color: "#111827", 
                            fontWeight: "600",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                        },
                        organizationSwitcherTrigger__hover: {
                            backgroundColor: "#e5e7eb",
                            boxShadow: "0 6px 10px rgba(0, 0, 0, 0.08)",
                            transform: "scale(1.02)",
                        },
                        organizationSwitcherTrigger__focus: {
                            outline: "2px solid #6366f1",
                            outlineOffset: "2px",
                        },
                        },
                    }}
                />

                <div className="space-y-1 w-full">
                    <Button asChild size="lg" className="font-normal justify-start px-2 w-full" variant={favorites?"ghost" : "secondary"}>
                     <Link href="/">
                         <LayoutDashboard className="h-4 w-4 mr-2"/>
                         Team Boards
                     </Link>
                    </Button>
                     <Button asChild size="lg" className="font-normal justify-start px-2 w-full"variant={favorites?"secondary" : "ghost"}>
                     <Link href={{
                       pathname : "/",
                       query : {favorites:true}
                      }}>
                         <Star className="h-4 w-4 mr-2"/>
                         Fav Boards
                     </Link>
                    </Button>
                </div> 
       </div>
    );
};