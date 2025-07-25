"use client";

import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import Link from "next/link";
import { Hint } from "@/components/hints";
import { useRenameModal } from "@/store/use-modal-rename";
import { Actions } from "@/components/actions";
import { Menu } from "lucide-react";

interface InfoProps{
   boardId : string,
};

const Tabseparator = () => {
   return (
      <div className="text-neutral-300 px-1.5">
      |
      </div>
   );
};

const font = Poppins({
    subsets : ["latin"],
    weight: ["600"],
})

export const Info = ({
   boardId
} : InfoProps) => {
   const {onOpen} = useRenameModal();
   const data = useQuery(api.board.get,{
        id : boardId as Id<"boards">,
   });
   if(!data){
      return <InfoSkeleton/>
   }
   return (
      <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
         <Hint label="Go to boards" side="bottom">
            <Button asChild variant="board" className="px-2">
               <Link href="/">
                     <Image
                        src="/LoadingLogo.svg"
                        alt="Board Logo"
                        height={40}
                        width={40}
                     />
                     <span className={cn("font-semibold text-xl ml-2 text-black",font.className)}>
                        Board
                     </span>
                  </Link>
            </Button>
          </Hint>
          <Tabseparator/>
          <Hint label="Edit title" side="bottom" sideOffset={10}>
            <Button
               variant="board"
               className="text-base font-normal px-2"
               onClick={()=>onOpen(data._id , data.title)}
            >
               {data.title}
            </Button>
          </Hint>
          <Tabseparator/>
          <Actions
            id={data._id}
            title={data.title}
            side="bottom"
            sideOffset={10}
          >
             <div>
                <Hint label="main menu" side="bottom" sideOffset={10}>
                    <Button size="icon" variant="board">
                        <Menu/>
                    </Button>
                </Hint>  
             </div>  
          </Actions>

      </div>
   );
};

export function InfoSkeleton() {
   return (
       <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md w-[300px]"/>
   );
};




