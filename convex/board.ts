import {v} from "convex/values";
import {mutation,query} from "./_generated/server";

const images = [
   "/placeholders/1.svg",
   "/placeholders/2.svg",
   "/placeholders/3.svg",
   "/placeholders/4.svg",
   "/placeholders/5.svg",
   "/placeholders/6.svg",
   "/placeholders/7.svg",
   "/placeholders/8.svg",
   "/placeholders/9.svg",
   "/placeholders/10.svg"
];

export const create = mutation({
    args : {
        orgId : v.string(),
        title : v.string(),
    },
    
    handler : async (cntx,args) => {
         const identity = await cntx.auth.getUserIdentity();
         if(!identity) {
            throw new Error("Unauthorized");
         }

         const randomImage = images[Math.floor(Math.random() * images.length)];
         
         const board = await cntx.db.insert("boards",{
              title : args.title,
              orgId : args.orgId,
              authorId : identity.subject,
              authorName : identity.name!,
              imageUrl : randomImage,
         });

         return board;
    }
})


export const remove = mutation({
    args:{
       id : v.id("boards")
    },
    handler : async (cntx,args) => {
        const identity= await cntx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        const userId = identity.subject;
        const existingFavorite = await cntx.db
            .query("userFavorites")
            .withIndex("by_user_board",(q)=>
              q
                .eq("userId" , userId)
                .eq("boardId" , args.id)
            )
            .unique();
        
        if(existingFavorite){
            await cntx.db.delete(existingFavorite._id);
        }

        await cntx.db.delete(args.id);
    },
});

export const update = mutation({
    args:{
       id : v.id("boards"),
       title : v.string()
    },
    handler: async(cntx,args) => {
        const title = args.title.trim();
        const identity= await cntx.auth.getUserIdentity();

        if(!identity) {
            throw new Error("Unauthorized");
        }

        if(!title) {
            throw new Error("Title is required");
        }

        if(title.length > 60) {
           throw new Error("Title cannot be more than 60 chcracters");
        }

        const board = await cntx.db.patch(args.id, {
           title : args.title
        });
        return board;
    }
});

export const favourite = mutation({
  args: { id: v.id("boards"), orgId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (existingFavorite) {
      throw new Error("Board is already favorited!");
    }

    await ctx.db.insert("userFavorites", {
      userId,
      boardId: board._id,
      orgId: args.orgId,
    });

    return board;
  },
});

export const unfavourite = mutation({
  args: { id: v.id("boards") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();

    if (!identity) {
      throw new Error("Unauthorized");
    }

    const board = await ctx.db.get(args.id);

    if (!board) {
      throw new Error("Board not found");
    }

    const userId = identity.subject;

    const existingFavorite = await ctx.db
      .query("userFavorites")
      .withIndex("by_user_board", (q) =>
        q.eq("userId", userId).eq("boardId", board._id)
      )
      .unique();

    if (!existingFavorite) {
      throw new Error("Favorited board not found!");
    }

    await ctx.db.delete(existingFavorite._id);

    return board;
  },
});

export const get = query({
     args:{
        id : v.id("boards")
     },
     handler: async(cntx,args) => {
         const board = cntx.db.get(args.id);
         return board;
     }
});