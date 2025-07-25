import { Hint } from "@/components/hints";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar";

interface UserAvatarPorps {
    src?: string,
    name?: string,
    fallback?: string,
    borderColor?: string,
};

export const UserAvatar = ({
    src,
    name,
    fallback,
    borderColor,
}: UserAvatarPorps) => {
    return (
        <Hint
            label={name || "Teammate"}
            side="bottom"
            sideOffset={18}
        >
            <Avatar
                className="h-8 w-8 border-3"
                style={{ borderColor }}
            >

                <AvatarImage src={src} />
                <AvatarFallback className="text-xs font-semibold">
                    {fallback}
                </AvatarFallback>
            </Avatar>
        </Hint>
    );
};