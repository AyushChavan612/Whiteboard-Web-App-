import Image from "next/image";
import { Button } from "@/components/ui/button";

export const EmptyBoard = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/note.svg"
                alt="empty"
                height={140}
                width={140}
            />

            <h2 className="text-2xl font-semibold mt-6">
                No result found!    
            </h2>
            <p className="text-muted-foreground textg-sm mt-2">
                Start by creating a board for your organization
            </p>
             <div className="mt-6">
                  <Button size="lg">
                      Create Board
                  </Button>
             </div>
        </div>
    )
};