import React from "react";
import { NodeItem } from "../utils/nodes";
import { useReactFlow } from "@xyflow/react";

type DropZoneResult = {
  dropRef: React.RefObject<HTMLDivElement | null>;
};

export const useDropZone = (
  onDrop: (data: NodeItem, position: { x: number; y: number }) => void
): DropZoneResult => {
  const dropRef = React.useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  React.useEffect(() => {
    const dropZone = dropRef.current;
    if (!dropZone) return;

    const handleDragOver = (event: DragEvent) => {
      event.preventDefault();
    };

    const handleDrop = (event: DragEvent) => {
      event.preventDefault();
      const { clientX, clientY } = event;

      if (event.dataTransfer) {
        const textData = event.dataTransfer.getData("application/json");
        const position = screenToFlowPosition({ x: clientX, y: clientY });

        onDrop?.(JSON.parse(textData), position);
      }
    };

    dropZone.addEventListener("dragover", handleDragOver);
    dropZone.addEventListener("drop", handleDrop);

    return () => {
      dropZone.removeEventListener("dragover", handleDragOver);
      dropZone.removeEventListener("drop", handleDrop);
    };
  }, [onDrop]);

  return { dropRef };
};
