"use clinet"
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/use-api-mutation";
import { ConfirmModal } from "./confirm-modal";
import { Button } from "./ui/button";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { api } from "@/convex/_generated/api";
import { useRenameModal } from "@/store/use-modal-rename";

interface ActionProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
};

export const Actions = ({
    children,
    side,
    sideOffset,
    id,
    title
}: ActionProps) => {

    const { onOpen } = useRenameModal();

    const onCopyLink = () => {
        navigator.clipboard.writeText(`
          ${window.location.origin}/board/${id}`,
        )
            .then(() => toast.success("Link copied"))
            .catch(() => toast.error("Failed top copy link"))
    };

    const { mutate, pending } = useApiMutation(api.board.remove);

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Board deleted"))
            .catch(() => toast.error("Failed to delete board"))
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={onCopyLink}>
                    <Link2 className="h-4 w-4 mr-2" />
                    Copy Board Link
                </DropdownMenuItem>
                <DropdownMenuItem className="p-3 cursor-pointer" onClick={() => onOpen(id, title)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Rename
                </DropdownMenuItem>
                <ConfirmModal
                    header="Delete Board?"
                    description="This will delete board and all of its contents."
                    disabled={pending}
                    onConfirm={onDelete}
                >
                    <Button
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                        variant="ghost"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};