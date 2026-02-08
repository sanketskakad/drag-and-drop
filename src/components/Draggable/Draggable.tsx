import type { DraggableProps } from "../../types/DragAndDrop.types";

export function Draggable({ children, handleDragStart, dataTransfer }: DraggableProps) {
  const handleDragStartEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("dataTransfer", JSON.stringify(dataTransfer));
    handleDragStart(event);
  };

  return (
    <div draggable="true" onDragStart={handleDragStartEvent}>
      {children}
    </div>
  );
}
