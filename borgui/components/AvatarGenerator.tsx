import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import cx from "classnames";
import React, { useEffect, useState } from "react";

interface DroppableZoneProps {
  children: React.ReactNode | null;
  id?: string;
}

const DroppableZone = (props: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id ?? "droppable-container",
  });

  return (
    <div
      ref={setNodeRef}
      className={cx("h-[400px] w-2/3 bg-gray-300 rounded-sm", {
        "bg-gray-400": isOver,
      })}
    >
      {props.children ? (
        props.children
      ) : (
        <div className="h-full w-full flex items-center justify-center">
          <h1 className="text-gray-400 text-8xl font-bold">Drop here</h1>
        </div>
      )}
    </div>
  );
};

interface DraggableStickerProps {
  children: React.ReactNode;
  id: string;
}

const DraggableSticker = (props: DraggableStickerProps) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: props.id,
  });
  useEffect(() => {
    if (transform) {
      setPosition(transform);
    }
  }, [transform]);
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : {
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      };
  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </div>
  );
};

const AvatarGenerator = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <DraggableSticker id="draggable-example">
      <div className="h-[100px] w-[100px] bg-gray-500 rounded-sm"></div>
    </DraggableSticker>
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "droppable-container") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}

      <DroppableZone>{isDropped ? draggableMarkup : null}</DroppableZone>
    </DndContext>
  );
};

export default AvatarGenerator;
