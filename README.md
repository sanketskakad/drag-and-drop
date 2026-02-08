# Drag and Drop

A lightweight, easy to use React.js library for implementing react-drag-and-drop-kit functionality. This library provides simple components that wrap the native HTML5 Drag and Drop API, making it straightforward to add react-drag-and-drop-kit features to your React applications.

[![npm version](https://img.shields.io/npm/v/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Features

✨ **Simple and Lightweight** - Minimal API with zero dependencies (besides React)  
🎯 **Type-Safe** - Full TypeScript support  
🎨 **Flexible** - Use with any React component  
📦 **Reusable** - Export your own custom data during drag operations  
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
        >
          <div style={{ padding: "20px", backgroundColor: "#3498db", color: "#fff" }}>Drag me!</div>
        </Draggable>
      </div>

      <DropZone handleDropItem={handleDropItem}>
        <div style={{ padding: "20px", backgroundColor: "#2ecc71", minHeight: "100%" }}>
          {droppedData ? `Dropped: ${JSON.stringify(droppedData)}` : "Drop here!"}
        </div>
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

| Prop              | Type                                               | Description                                                    |
| ----------------- | -------------------------------------------------- | -------------------------------------------------------------- |
| `children`        | `ReactNode`                                        | The content to be dragged                                      |
| `handleDragStart` | `(event: React.DragEvent<HTMLDivElement>) => void` | Callback fired when drag starts                                |
| `dataTransfer`    | `DataTransferInterface`                            | Custom data object to be transferred during the drag operation |

#### Example

```tsx
<Draggable
  handleDragStart={(event) => console.log("Dragging...")}
  dataTransfer={{ itemId: 123, type: "product" }}
>
  <div>Draggable Item</div>
</Draggable>
```

### `DropZone` Component

Creates a drop target that accepts dragged items.

#### Props

| Prop             | Type                                                                                | Description                            |
| ---------------- | ----------------------------------------------------------------------------------- | -------------------------------------- |
| `children`       | `ReactNode`                                                                         | The content of the drop zone           |
| `handleDropItem` | `(e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void` | Callback fired when an item is dropped |

#### Example

```tsx
<DropZone
  handleDropItem={(event, dataTransfer) => {
    console.log("Dropped data:", dataTransfer);
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

## Real-World Example

### Shopping Cart Demo

```tsx
import { useState } from "react";
import { Draggable, DropZone, type DataTransferInterface } from "react-drag-and-drop-kit";
import "./App.css";

function App() {
  const products = [
    { id: 1, name: "Product A", price: "$10" },
    { id: 2, name: "Product B", price: "$20" },
    { id: 3, name: "Product C", price: "$30" },
  ];

  const [cart, setCart] = useState<DataTransferInterface[]>([]);

  const handleAddToCart = (event, dataTransfer) => {
    setCart([...cart, dataTransfer]);
  };

  return (
    <div style={{ display: "flex", gap: "20px", padding: "20px" }}>
      <div style={{ flex: 1 }}>
        <h2>Products</h2>
        {products.map((product) => (
          <Draggable
            key={product.id}
            dataTransfer={{ id: String(product.id), name: product.name }}
            handleDragStart={() => console.log(`Dragging ${product.name}`)}
          >
            <div
              style={{
                padding: "10px",
                margin: "10px 0",
                backgroundColor: "#3498db",
                color: "#fff",
                cursor: "grab",
              }}
            >
              {product.name} - {product.price}
            </div>
          </Draggable>
        ))}
      </div>

      <DropZone handleDropItem={handleAddToCart}>
        <div
          style={{
            flex: 1,
            backgroundColor: "#ecf0f1",
            padding: "20px",
            minHeight: "500px",
          }}
        >
          <h2>Shopping Cart</h2>
          {cart.length === 0 ? (
            <p>Drag items here to add to cart</p>
          ) : (
            <ul>
              {cart.map((item, idx) => (
                <li key={idx}>{item.name}</li>
              ))}
            </ul>
          )}
        </div>
      </DropZone>
    </div>
  );
}

export default App;
```

## Advanced Usage

### Multiple Drop Zones

You can have multiple drop zones and draggable items on the same page:

```tsx
<div>
  <Draggable dataTransfer={{ id: "1" }} handleDragStart={() => {}}>
    <div>Item 1</div>
  </Draggable>

  <DropZone handleDropItem={(e, data) => console.log("Zone 1:", data)}>
    <div>Drop Zone 1</div>
  </DropZone>

  <DropZone handleDropItem={(e, data) => console.log("Zone 2:", data)}>
    <div>Drop Zone 2</div>
  </DropZone>
</div>
```

### Styled Drag and Drop

Enhance your react-drag-and-drop-kit with custom CSS:

```tsx
<style>{`
  .draggable {
    padding: 15px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    cursor: grab;
    border-radius: 8px;
    transition: transform 0.2s;
  }

  .draggable:active {
    cursor: grabbing;
    transform: scale(1.05);
  }

  .drop-zone {
    border: 2px dashed #667eea;
    border-radius: 8px;
    padding: 20px;
    min-height: 300px;
    background: rgba(102, 126, 234, 0.1);
  }
`}</style>

<Draggable
  dataTransfer={{ id: '1' }}
  handleDragStart={() => {}}
  className="draggable"
>
  <div>Drag me with style!</div>
</Draggable>

<DropZone handleDropItem={() => {}} className="drop-zone">
  <div>Styled Drop Zone</div>
</DropZone>
```

## TypeScript Support

The library is built with TypeScript and exports all necessary types:

```tsx
import {
  Draggable,
  DropZone,
  type DraggableProps,
  type DropZoneProps,
  type DataTransferInterface,
} from "react-drag-and-drop-kit";

const handleDrop: DropZoneProps["handleDropItem"] = (event, dataTransfer) => {
  console.log("Dropped:", dataTransfer);
};
```

## Browser Support

This library uses the HTML5 Drag and Drop API, which is supported in all modern browsers:

- Chrome/Edge 4+
- Firefox 3.6+
- Safari 3.1+
- Opera 12+
- IE 10+

## Performance Considerations

- The library uses React's native event system for optimal performance
- Drag operations are handled efficiently with minimal re-renders
- Data transfer is serialized to JSON, so ensure your data is serializable

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Author

**Sanket Kakad**

- GitHub: [@sanketskakad](https://github.com/sanketskakad)
- Repository: [react-drag-and-drop-kit](https://github.com/sanketskakad/react-drag-and-drop-kit)

## Changelog

### Version 0.0.0

Initial release with:

- `Draggable` component
- `DropZone` component
- Full TypeScript support
- React 18+ compatibility

## FAQ

**Q: Can I drag multiple items at once?**  
A: The current version handles single-item dragging. For multi-item selection, you can manage state in your parent component and transfer a reference to multiple items in the `dataTransfer` object.

**Q: Can I customize the drag ghost image?**  
A: Yes, you can use the `setDragImage` method in the `handleDragStart` callback on the drag event.

**Q: Is there any CSS required?**  
A: No, the library requires no CSS. However, you may want to add cursor styles and visual feedback for better UX.

**Q: What data types can I transfer?**  
A: The `dataTransfer` object should contain string values. Convert complex types to JSON strings if needed.

## Support

If you have any questions or issues, please open an issue on the [GitHub repository](https://github.com/sanketskakad/react-drag-and-drop-kit/issues).
