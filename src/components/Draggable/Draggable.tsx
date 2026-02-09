import type { DraggableProps } from "../../types/DragAndDrop.types";

export function Draggable({
  children,
  handleDragStart,
  dataTransfer,
  style,
  className,
}: DraggableProps) {
  const handleDragStartEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setData("dataTransfer", JSON.stringify(dataTransfer));
    if (handleDragStart) handleDragStart(event);
  };

  return (
    <div style={style} className={className} draggable="true" onDragStart={handleDragStartEvent}>
      {children}
    </div>
  );
}
