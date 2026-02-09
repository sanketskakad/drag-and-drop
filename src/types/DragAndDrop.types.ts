import type { ReactNode } from "react";

export interface DataTransferInterface {
  [key: string]: string;
}

export type DraggableProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  dataTransfer?: DataTransferInterface;
  className?: string;
  handleDragStart?: (event: React.DragEvent<HTMLDivElement>) => void;
};

export type DropZoneProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  handleDropItem?: (
    e: React.DragEvent<HTMLDivElement>,
    dataTransfer: DataTransferInterface,
  ) => void;
};
