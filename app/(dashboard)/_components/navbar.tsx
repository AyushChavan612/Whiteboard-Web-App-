"use client"
import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { OrganizationSwitcher,useOrganization } from "@clerk/nextjs";
import { InviteButton } from "./invite-button";
export const Navbar = () => {
    const {organization} = useOrganization();
    return (
        <div className="flex items-centre gap-x-4 p-5">
            <div className="lg:flex-1 lg:fle">
                <SearchInput/>
            </div>
            <div className="block lg:hidden flex-1">
                 <OrganizationSwitcher
                    hidePersonal
                    appearance={{
                        elements: {
                        rootBox: {
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            width: "100%",
                            maxWidth : "376px"
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
            </div>
            {organization && (
               <InviteButton/>
             )}
            <UserButton/>
        </div>
    )
};
