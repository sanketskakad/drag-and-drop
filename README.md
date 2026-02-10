# React Drag and Drop Kit

A lightweight, easy-to-use React.js library for implementing drag-and-drop functionality. This library provides simple components that wrap the native HTML5 Drag and Drop API, making it straightforward to add drag-and-drop features to your React applications.

[![npm version](https://img.shields.io/npm/v/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

![Demo Video](https://github.com/sanketskakad/drag-and-drop/blob/main/demo/dnd-in-action.gif?raw=true)

## Features

✨ **Simple and Lightweight** - Minimal API with zero dependencies (besides React)  
🎯 **Type-Safe** - Full TypeScript support with exported types  
🎨 **Flexible** - Use with any React component  
📦 **Reusable** - Pass custom data during drag operations  
🎨 **Styleable** - Built-in support for custom styling via `style` props  
⚡ **Performance** - Efficient implementation using native browser APIs

## Installation

```bash
npm install react-drag-and-drop-kit
```

Or using yarn:

```bash
yarn add react-drag-and-drop-kit
```

Or using pnpm:

```bash
pnpm add react-drag-and-drop-kit
```

## Quick Start

Import the `Draggable` and `DropZone` components from the library:

```tsx
import { Draggable, DropZone } from "react-drag-and-drop-kit";
import { useState } from "react";

function App() {
  const [droppedData, setDroppedData] = useState(null);

  const handleDragStart = (event) => {
    console.log("Drag started");
  };

  const handleDropItem = (event, dataTransfer) => {
    console.log("Item dropped:", dataTransfer);
    setDroppedData(dataTransfer);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ width: "50%" }}>
        <Draggable
          handleDragStart={handleDragStart}
          dataTransfer={{ id: "item-1", name: "My Item" }}
          style={{
            padding: "20px",
            backgroundColor: "#3498db",
            color: "#fff",
            cursor: "grab",
          }}
        >
          Drag me!
        </Draggable>
      </div>

      <DropZone
        handleDropItem={handleDropItem}
        style={{
          padding: "20px",
          backgroundColor: "#2ecc71",
          minHeight: "100%",
        }}
      >
        {droppedData ? `Dropped: ${JSON.stringify(droppedData)}` : "Drop here!"}
      </DropZone>
    </div>
  );
}

export default App;
```

## API Reference

### `Draggable` Component

Wraps any React component to make it draggable.

#### Props

| Prop              | Type                                               | Required | Description                                      |
| ----------------- | -------------------------------------------------- | -------- | ------------------------------------------------ |
| `children`        | `ReactNode`                                        | No       | The content to be dragged                        |
| `handleDragStart` | `(event: React.DragEvent<HTMLDivElement>) => void` | Yes      | Callback fired when drag starts                  |
| `dataTransfer`    | `DataTransferInterface`                            | No       | Custom data object to be transferred during drag |
| `style`           | `React.CSSProperties`                              | No       | Inline CSS styles for the draggable element      |

#### Example

```tsx
<Draggable
  handleDragStart={(event) => console.log("Dragging...")}
  dataTransfer={{ itemId: "123", type: "product" }}
  style={{
    padding: "10px",
    backgroundColor: "#3498db",
    cursor: "grab",
    borderRadius: "4px",
  }}
>
  <div>Draggable Item</div>
</Draggable>
```

### `DropZone` Component

Creates a drop target that accepts dragged items.

#### Props

| Prop             | Type                                                                                | Required | Description                                 |
| ---------------- | ----------------------------------------------------------------------------------- | -------- | ------------------------------------------- |
| `children`       | `ReactNode`                                                                         | No       | The content of the drop zone                |
| `handleDropItem` | `(e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void` | Yes      | Callback fired when an item is dropped      |
| `style`          | `React.CSSProperties`                                                               | No       | Inline CSS styles for the drop zone element |

#### Example

```tsx
<DropZone
  handleDropItem={(event, dataTransfer) => {
    console.log("Dropped data:", dataTransfer);
  }}
  style={{
    border: "2px dashed #667eea",
    padding: "20px",
    minHeight: "300px",
    backgroundColor: "#f0f4ff",
  }}
>
  <div>Drop Target</div>
</DropZone>
```

### Types

#### `DataTransferInterface`

A simple object interface for passing custom data during drag operations:

```typescript
interface DataTransferInterface {
  [key: string]: string;
}
```

#### `DraggableProps`

```typescript
type DraggableProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  dataTransfer?: DataTransferInterface;
};
```

#### `DropZoneProps`

````typescript
type DropZoneProps = {
  children?: ReactNode;
   # React Drag and Drop Kit

  a lightweight, easy-to-use React library that wraps the native HTML5 Drag and Drop API with two small components: `Draggable` and `DropZone`.

  [![npm version](https://img.shields.io/npm/v/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
  [![npm downloads](https://img.shields.io/npm/dm/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
  [![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

  ## What changed (quick)

  - Package name: `react-drag-and-drop-kit`
  - The components accept an optional `style` prop for inline styling
  - `children` and `dataTransfer` are optional in props (TypeScript)

  ## Features

  - Small and focused API
  - TypeScript-first with exported types
  - Works with any React component
  - Simple JSON-serializable data transfer
  - Optional inline `style` support for both components

  ## Installation

  ```bash
  npm install react-drag-and-drop-kit
````

Or with yarn / pnpm:

```bash
yarn add react-drag-and-drop-kit
pnpm add react-drag-and-drop-kit
```

## Quick start

```tsx
import { Draggable, DropZone } from "react-drag-and-drop-kit";
import { useState } from "react";

function App() {
  const [dropped, setDropped] = useState(null);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    // optional hook
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>, data) => {
    setDropped(data);
  };

  return (
    <div style={{ display: "flex", gap: 16 }}>
      <Draggable
        handleDragStart={handleDragStart}
        dataTransfer={{ id: "item-1", label: "Item 1" }}
        style={{ padding: 12, background: "#3498db", color: "white", cursor: "grab" }}
      >
        Drag me
      </Draggable>

      <DropZone
        handleDropItem={handleDrop}
        style={{ padding: 16, minHeight: 120, border: "2px dashed #bbb" }}
      >
        {dropped ? `Dropped: ${JSON.stringify(dropped)}` : "Drop here"}
      </DropZone>
    </div>
  );
}

export default App;
```

## API

### `Draggable`

Props:

- `children?: React.ReactNode` — optional content (you can also pass plain text)
- `style?: React.CSSProperties` — optional inline styles applied to the wrapper div
- `handleDragStart: (e: React.DragEvent<HTMLDivElement>) => void` — required callback executed on drag start
- `dataTransfer?: DataTransferInterface` — optional object that will be JSON-serialized into the native DataTransfer under the `dataTransfer` key

Example:

```tsx
<Draggable
  handleDragStart={(e) => console.log("start")}
  dataTransfer={{ id: "1", type: "product" }}
  style={{ padding: 8, background: "#4caf50", color: "white" }}
>
  Product 1
</Draggable>
```

### `DropZone`

Props:

- `children?: React.ReactNode` — optional content
- `style?: React.CSSProperties` — optional inline styles applied to the wrapper div
- `handleDropItem: (e: React.DragEvent<HTMLDivElement>, data: DataTransferInterface) => void` — required callback that receives the parsed `dataTransfer` object

Example:

```tsx
<DropZone handleDropItem={(e, data) => console.log(data)} style={{ padding: 12 }}>
  Drop items here
</DropZone>
```

## Types

```ts
export interface DataTransferInterface {
  [key: string]: string;
}

export type DraggableProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  handleDragStart: (event: React.DragEvent<HTMLDivElement>) => void;
  dataTransfer?: DataTransferInterface;
};

export type DropZoneProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  handleDropItem: (e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void;
};
```

## Examples

- See `test-drag-and-drop` demo app in the repository for usage with Vite + React

## Browser support

Uses HTML5 Drag and Drop — supported in modern browsers (Chrome, Firefox, Safari, Edge). Note: behaviour can vary for mobile browsers.

## Changelog

### Version 1.0.0

- Initial stable release
- Added optional `style` prop to `Draggable` and `DropZone`
- Made `children` and `dataTransfer` optional in props
- TypeScript types exported

### Version 0.0.0

- Minimal working `Draggable` and `DropZone` components

## Contributing

Please open issues or PRs in the GitHub repository. Follow typical GitHub workflow: fork, branch, PR.

## License

MIT

## Author

Sanket Kakad — https://github.com/sanketskakad
