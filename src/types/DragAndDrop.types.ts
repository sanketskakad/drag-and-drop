import type { ReactNode } from "react";

export interface DataTransferInterface {
  [key: string]: string;
}

export type DraggableProps = {
  children: ReactNode;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  dataTransfer: DataTransferInterface;
};

export type DropZoneProps = {
  children: ReactNode;
  handleDropItem: (e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void;
};
