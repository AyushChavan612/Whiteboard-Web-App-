"use client"
import { EmptySearch } from "./empty-serach"
import { EmptyFavorites } from "./empty-favorites"
import { EmptyBoard } from "./empty-boards";

interface BoardListProps {
   orgId : string,
   query : {
      search?:string,
      favorites?: string,
   },
};

export const BoardList=({orgId,query}: BoardListProps)=>{
  const data = [];

  if(!data?.length && query.search)
  {
     return (
        <div>
           <EmptySearch/>
        </div>
     );
  }
  if(!data?.length && query.favorites)
  {
     return (
        <div>
           <EmptyFavorites/>
        </div>
     );
  }
  if(!data?.length)
  {
     return (
        <div>
          <EmptyBoard/>
        </div>
     );
  }
   return (
      <div>
          {JSON.stringify(query)}
      </div>
   );
};