import type { ReactNode } from "react";

export interface DataTransferInterface {
  [key: string]: string;
}

export type DraggableProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  dataTransfer?: DataTransferInterface;
};

export type DropZoneProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  handleDropItem: (e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void;
};
