import {Liveblocks} from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import { auth,currentUser } from "@clerk/nextjs/server";

const Convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
   secret : process.env.LIVE_BLOCKS_SECRET_KEY!,
});

export async function POST(request:Request){
     const authorizaton = await auth();
     const user = await currentUser();

     if(!authorizaton || !user){
        return new Response("Unauthorized" , {status:403});
     }

     const {room} = await request.json();
     const board = await Convex.query(api.board.get,{id : room});

     if(board?.orgId !== authorizaton.orgId){
        return new Response("Unauthorized" , {status : 403});
     }

     const userInfo = {
        name : user.firstName! || "Teammate",
        picture : user.imageUrl!,
     };

     const session = liveblocks.prepareSession(
         user.id,
         {userInfo}
     );

     if(room){
        session.allow(room,session.FULL_ACCESS);
     }

     const {status , body} = await session.authorize();
     return new Response(body , {status});
};
