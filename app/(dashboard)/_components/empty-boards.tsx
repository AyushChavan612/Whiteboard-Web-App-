"use clinet";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {api} from "@/convex/_generated/api"
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/use-api-mutation";
import {toast} from "sonner";
import { useRouter } from "next/navigation";

export const EmptyBoard = () => {
    const {mutate,pending} = useApiMutation(api.board.create);
    const {organization} = useOrganization();
    const router = useRouter();

    const onClick = () => {
         if(!organization) return ;
         mutate({
            orgId : organization.id,
            title : "Untitled"
         })
         .then((id)=>{
             toast.success("Board created");
             router.push(`/boards/${id}`);
         })
         .catch(()=>toast.error("Failed to create board"));
    };

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
                  <Button disabled={pending} onClick={onClick} size="lg">
                      Create Board
                  </Button>
             </div>
        </div>
    )
};