import type { DataTransferInterface, DropZoneProps } from "../../types/DragAndDrop.types";

export function DropZone({ children, handleDropItem, style, className }: DropZoneProps) {
  const handleDropItemEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dataTransferStr = event.dataTransfer.getData("dataTransfer");
    const DataTransfer = JSON.parse(dataTransferStr) as DataTransferInterface;
    if (handleDropItem) handleDropItem(event, DataTransfer);
  };
  return (
    <div
      style={style}
      className={className}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDropItemEvent}
    >
      {children}
    </div>
  );
}
