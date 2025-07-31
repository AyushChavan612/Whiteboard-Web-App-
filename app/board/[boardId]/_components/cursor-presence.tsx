"use client";

import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { shallow } from "@liveblocks/client";
import { memo } from "react";
import { Cursor } from "./cursor";

const Cursors = () => {
  const ids = useOthersConnectionIds();

  return (
    <>
      {ids.map((id) => (
        <Cursor key={id} connectionId={id} />
      ))}
    </>
  );
};

export const CursorPresence = memo(() => {
  return (
    <>
      <Cursors />
    </>
  );
});

CursorPresence.displayName = "CursorPresence";