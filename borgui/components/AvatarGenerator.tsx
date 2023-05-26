"use client";

import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import cx from "classnames";
import React, { useState } from "react";

interface DroppableZoneProps {
  children: React.ReactNode;
}

const DroppableZone = (props: DroppableZoneProps) => {
  const { isOver, setNodeRef } = useDroppable({
    id: "avatar-container",
  });

  return (
    <div
      ref={setNodeRef}
      className={cx("h-[400px] w-[400px] bg-amber-200", {
        "bg-amber-400": isOver,
      })}
    >
      {props.children}
    </div>
  );
};

interface DraggableStickerProps {
  children: React.ReactNode;
}

const DraggableSticker = (props: DraggableStickerProps) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: "draggable",
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <div
      ref={setNodeRef}
      className="h-[100px] w-[100px]"
      style={style}
      {...listeners}
      {...attributes}
    >
      {props.children}
    </div>
  );
};

const AvatarGenerator = () => {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <DraggableSticker>
      <img
        src="https://media.discordapp.net/attachments/1101563209552502875/1111040845920075827/image.png"
        alt=""
      />
    </DraggableSticker>
  );

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id === "avatar-container") {
      setIsDropped(true);
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <DroppableZone>{isDropped ? draggableMarkup : "Drop here"}</DroppableZone>
    </DndContext>
  );
};

export default AvatarGenerator;
