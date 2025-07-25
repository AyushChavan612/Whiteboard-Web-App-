import { Circle, MousePointer2, Pencil, Redo2, Square, StickyNote, Type, Undo2 } from "lucide-react";
import { ToolButton } from "./tool-button";

export const Toolbar = () => {
   return (
      <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4">
         <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <ToolButton
               label="Select"
               icon={MousePointer2}
               onClick={() => { }}
               isActive={false}
            />
            <ToolButton
               label="Text"
               icon={MousePointer2}
               onClick={() => { }}
               isActive={false}
            />
            <ToolButton
               label="Sticky note"
               icon={StickyNote}
               onClick={() => { }}
               isActive={false}
            />
            <ToolButton
               label="Rectangle"
               icon={Square}
               onClick={() => { }}
               isActive={false}
            />
            <ToolButton
               label="Ellipse"
               icon={Circle}
               onClick={() => { }}
               isActive={false}
            />
            <ToolButton
               label="Pen"
               icon={Pencil}
               onClick={() => { }}
               isActive={false}
            />
         </div>
         <div className="bg-white rounded-md p-1.5 flex gap-y-1 flex-col items-center shadow-md">
            <ToolButton
               label="Undo"
               icon={Undo2}
               onClick={() => { }}
               isActive={true}
            />
            <ToolButton
               label="Redo"
               icon={Redo2}
               onClick={() => { }}
               isActive={true}
            />
         </div>
      </div>
   );
};

export function ToolbarSkeleton() {
   return (
      <div className="absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 shadow-md rounded-md bg-white h-[360px] w-[52px]" />
   );
};