import { Canvas } from "./_components/canvas";
import { Loading } from "./_components/loading";
import { Room } from "./_components/room";

interface BoardIdPageProps{
   params:{
    boardId : string,
   };
};

const boardIdPage = ({
    params
} : BoardIdPageProps) => {
    return (
        <Room roomId={params.boardId} fallback={<Loading/>}>
          <Canvas boardId={params.boardId}/>
        </Room>
    );
};

export default boardIdPage;