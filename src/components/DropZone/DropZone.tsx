import type { DataTransferInterface, DropZoneProps } from "../../types/DragAndDrop.types";

export function DropZone({ children, handleDropItem }: DropZoneProps) {
  const handleDropItemEvent = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const dataTransferStr = event.dataTransfer.getData("dataTransfer");
    const DataTransfer = JSON.parse(dataTransferStr) as DataTransferInterface;
    handleDropItem(event, DataTransfer);
  };
  return (
    <div onDragOver={(e) => e.preventDefault()} onDrop={handleDropItemEvent}>
      {children}
    </div>
  );
}
