"use client";

import { useCallback, useMemo, useState } from "react";
import { Info } from "./info";
import { Participants } from "./participants";
import { Toolbar } from "./toolbar";

import {
    Camera,
    CanvasMode,
    CanvasState,
    LayerType,
    Color,
    Point
} from "@/types/canvas";

import {
    useHistory,
    useCanRedo,
    useCanUndo,
    useMutation,
    useStorage,
    useOthersMapped
} from "@/liveblocks.config";

import { CursorPresence } from "./cursor-presence";
import { connectionIdToColor, pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "./layer-preview";

const MAX_LAYERS = 100;

interface CanvasProps {
    boardId: string,
};

export const Canvas = ({
    boardId,
}: CanvasProps) => {
    const [canvasState, setCanvasState] = useState<CanvasState>({
        mode: CanvasMode.None,
    });
    const [camera, setCamera] = useState<Camera>({ x: 0, y: 0 });
    const [lastUsedColor, setLastUsedColor] = useState<Color>({
        r: 255,
        g: 255,
        b: 255,
    });
    const history = useHistory();
    const canUndo = useCanUndo();
    const canRedo = useCanRedo();

    const layerIds = useStorage((root) => root.layerIds);

    const onWheel = useCallback((e: React.WheelEvent) => {
        setCamera((camera) => ({
            x: camera.x - e.deltaX,
            y: camera.y - e.deltaY
        }));
    }, []);

    const onPointerMove = useMutation(({ setMyPresence }, e: React.PointerEvent) => {
        e.preventDefault();
        const current = pointerEventToCanvasPoint(e, camera);
        setMyPresence({ cursor: current })
    }, []);

    const onPointerLeave = useMutation((
        { setMyPresence }
    ) => {
        setMyPresence({ cursor: null });
    }, []);

    const insertLayer = useMutation((
        { storage, setMyPresence },
        layerType: LayerType.Ellipse | LayerType.Rectangle | LayerType.Note | LayerType.Text,
        position: Point
    ) => {
        const liveLayers = storage.get("layers");
        if (liveLayers.size >= MAX_LAYERS) {
            return;
        }

        const liveLayerIds = storage.get("layerIds");

        const layerId = nanoid();

        const layer = new LiveObject({
            type: layerType,
            x: position.x,
            y: position.y,
            width: 100,
            height: 100,
            fill: lastUsedColor,
        });

        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
        setCanvasState({
            mode: CanvasMode.None,
        });
    }, [lastUsedColor]);

    const onPointerUp = useMutation((
        { },
        e
    ) => {
        const Point = pointerEventToCanvasPoint(e, camera);
        // console.log({
        //     Point,
        //     mode: canvasState.mode
        // });
        if (canvasState.mode === CanvasMode.Inserting) {
            insertLayer(canvasState.LayerType, Point);
        }
        else {
            setCanvasState({
                mode: CanvasMode.None
            });
        }
        history.resume();
    }, [
        camera,
        canvasState,
        history,
        insertLayer,
    ]);

    const selections = useOthersMapped((other) => other.presence.selection);

    const onLayerPointerDown = useMutation((
        { self, setMyPresence },
        e: React.PointerEvent,
        layerId: string,
    ) => {
        const point = pointerEventToCanvasPoint(e, camera);
        if (
            canvasState.mode === CanvasMode.Pencil ||
            canvasState.mode === CanvasMode.Inserting
        ) {
            return;
        }

        history.pause();
        e.stopPropagation()


        if (!self.presence.selection.includes(layerId)) {
            setMyPresence({ selection: [layerId] }, { addToHistory: true })
        }

        setCanvasState({ mode: CanvasMode.Translating, origin: point });

    }, [
        camera,
        history,
        setCanvasState,
        canvasState.mode,
    ]);

    const layersIdsToColorSelection = useMemo(() => {
        const layersIdsToColorSelection: Record<string, string> = {};
        for (const user of selections) {
            const [connectionId, selection] = user;
            for (const layerId of selection) {
                layersIdsToColorSelection[layerId] = connectionIdToColor(connectionId)
            }
        }
        return layersIdsToColorSelection;
    }, [selections]);

    return (
        <main className="h-full w-full relative bg-neutral-100 touch-none">
            <Info boardId={boardId} />
            <Participants />
            <Toolbar
                canvasState={canvasState}
                setCanvasState={setCanvasState}
                canRedo={canRedo}
                canUndo={canUndo}
                undo={history.undo}
                redo={history.redo}
            />
            <svg
                className="h-[100vh] w-[100vw]"
                onWheel={onWheel}
                onPointerMove={onPointerMove}
                onPointerLeave={onPointerLeave}
                onPointerUp={onPointerUp}
            >
                <g
                    style={{
                        transform: `translate(${camera.x})px, ${camera.y}px`
                    }}
                >
                    {layerIds.map((layerId) => (
                        <LayerPreview
                            key={layerId}
                            id={layerId}
                            onLayerPointerDown={onLayerPointerDown}
                            selectionColor={layersIdsToColorSelection[layerId]}
                        />
                    ))}
                    <CursorPresence />
                </g>
            </svg>
        </main>
    );
};
