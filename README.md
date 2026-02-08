# React Drag and Drop Kit

A lightweight, easy-to-use React.js library for implementing drag-and-drop functionality. This library provides simple components that wrap the native HTML5 Drag and Drop API, making it straightforward to add drag-and-drop features to your React applications.

[![npm version](https://img.shields.io/npm/v/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![npm downloads](https://img.shields.io/npm/dm/react-drag-and-drop-kit)](https://www.npmjs.com/package/react-drag-and-drop-kit)
[![license](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

![Demo](demo/dnd-in-action.gif)

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

```typescript
type DropZoneProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  handleDropItem: (e: React.DragEvent<HTMLDivElement>, dataTransfer: DataTransferInterface) => void;
};
```

## Real-World Example

### Shopping Cart Demo

```tsx
import { useState } from "react";
import { Draggable, DropZone, type DataTransferInterface } from "react-drag-and-drop-kit";

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
            style={{
              padding: "10px",
              margin: "10px 0",
              backgroundColor: "#3498db",
              color: "#fff",
              cursor: "grab",
              borderRadius: "4px",
              userSelect: "none",
            }}
          >
            {product.name} - {product.price}
          </Draggable>
        ))}
      </div>

      <DropZone
        handleDropItem={handleAddToCart}
        style={{
          flex: 1,
          backgroundColor: "#ecf0f1",
          padding: "20px",
          minHeight: "500px",
          borderRadius: "4px",
          border: "2px dashed #bdc3c7",
        }}
      >
        <h2>Shopping Cart</h2>
        {cart.length === 0 ? (
          <p style={{ color: "#7f8c8d" }}>Drag items here to add to cart</p>
        ) : (
          <ul>
            {cart.map((item, idx) => (
              <li key={idx}>{item.name}</li>
            ))}
          </ul>
        )}
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
  <Draggable
    dataTransfer={{ id: "1", label: "Item 1" }}
    handleDragStart={() => {}}
    style={{
      padding: "10px",
      backgroundColor: "#3498db",
      color: "white",
      cursor: "grab",
      marginBottom: "10px",
    }}
  >
    Item 1
  </Draggable>

  <DropZone
    handleDropItem={(e, data) => console.log("Zone 1:", data)}
    style={{
      padding: "20px",
      backgroundColor: "#ecf0f1",
      minHeight: "200px",
      marginBottom: "10px",
      borderRadius: "4px",
    }}
  >
    Drop Zone 1
  </DropZone>

  <DropZone
    handleDropItem={(e, data) => console.log("Zone 2:", data)}
    style={{
      padding: "20px",
      backgroundColor: "#e8f8f5",
      minHeight: "200px",
      borderRadius: "4px",
    }}
  >
    Drop Zone 2
  </DropZone>
</div>
```

### Drag with Custom Styling

Use the `style` prop to create visually appealing drag-and-drop experiences:

```tsx
const draggableStyle: React.CSSProperties = {
  padding: '15px',
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  color: 'white',
  cursor: 'grab',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  transition: 'transform 0.2s, boxShadow 0.2s',
  userSelect: 'none'
};

const dropZoneStyle: React.CSSProperties = {
  padding: '20px',
  border: '2px dashed #667eea',
  borderRadius: '8px',
  minHeight: '300px',
  backgroundColor: 'rgba(102, 126, 234, 0.1)',
  transition: 'backgroundColor 0.3s'
};

<Draggable
  dataTransfer={{ id: '1' }}
  handleDragStart={() => {}}
  style={draggableStyle}
>
  Drag me with style!
</Draggable>

<DropZone handleDropItem={() => {}} style={dropZoneStyle}>
  Styled Drop Zone
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

const draggableConfig: DraggableProps = {
  handleDragStart: (e) => console.log("Start"),
  dataTransfer: { id: "1" },
  style: { cursor: "grab" },
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
- Inline `style` props are recommended for better performance with frequent updates

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
- Repository: [react-drag-and-drop-kit](https://github.com/sanketskakad/react-drag-and-drop)

## Changelog

### Version 1.0.0

- ✨ Added `style` prop to both `Draggable` and `DropZone` components
- ✨ Made `children` and `dataTransfer` optional in component props
- 🎨 Improved styling flexibility with built-in React CSS properties support
- 📦 Package renamed to `react-drag-and-drop-kit` for clarity
- 📝 Enhanced documentation with type definitions
- 🚀 First major stable release

### Version 0.0.0

Initial release with:

- `Draggable` component
- `DropZone` component
- Full TypeScript support
- React 18+ compatibility

## FAQ

**Q: Can I drag multiple items at once?**  
A: The current version handles single-element dragging. However, you can transfer multiple item references through the `dataTransfer` object by encoding them as comma-separated strings or JSON.

**Q: Can I customize the drag ghost image?**  
A: Yes, you can use the `setDragImage` method in the `handleDragStart` callback on the drag event.

**Q: How do I apply custom styles to draggable and drop zone elements?**  
A: Use the `style` prop on both `Draggable` and `DropZone` components. It accepts standard React CSS properties (`React.CSSProperties`).

**Q: Is there any CSS required?**  
A: No, the library requires no CSS. The `style` prop allows you to add all necessary visual feedback for better UX.

**Q: What data types can I transfer?**  
A: The `dataTransfer` object should contain string values. Convert complex types to JSON strings if needed.

**Q: Can I use the style prop with CSS-in-JS libraries?**  
A: Yes, the `style` prop accepts any valid `React.CSSProperties` object, making it compatible with styled-components, emotion, and other CSS-in-JS solutions.

## Support

If you have any questions or issues, please open an issue on the [GitHub repository](https://github.com/sanketskakad/react-drag-and-drop/issues).
