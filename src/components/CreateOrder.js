import React, { useState } from "react";
import apiClient from "../api/apiClient";

const CreateOrder = ({ userId }) => {
  const [cart, setCart] = useState([]);
  const [menu, setMenu] = useState([]); // Agregar estado para el menú

  // Función para cargar el menú desde el backend
  const fetchMenu = async () => {
    try {
      const response = await apiClient.get("/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error al cargar el menú:", error.message);
    }
  };

  // Cargar el menú al montar el componente
  React.useEffect(() => {
    fetchMenu();
  }, []);

  // Función para agregar productos al carrito
  const handleAddToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart((prevCart) => [...prevCart, { ...product, quantity: 1 }]);
    }
  };

  // Función para enviar el pedido al backend
  const handleSubmitOrder = async () => {
    if (cart.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de realizar el pedido.");
      return;
    }

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: item.precio,
      }));

      const response = await apiClient.post("/create-order", { userId, items });
      alert(response.data.message);
      setCart([]); // Limpiar el carrito después de enviar el pedido
    } catch (error) {
      console.error("Error al crear el pedido:", error.message);
      alert("Error al crear el pedido. Por favor, intenta de nuevo.");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Crear Pedido</h1>

      {/* Sección del Menú */}
      <h2>Menú</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {menu.map((item) => {
          const precio = typeof item.precio === "number" ? item.precio : parseFloat(item.precio);
          return (
            <li key={item.id} style={{ marginBottom: "2rem" }}>
              <img
                src={`/images/${item.imagen}`}
                alt={item.nombre}
                style={{ width: "150px", height: "150px", objectFit: "cover" }}
              />
              <h3>{item.nombre}</h3>
              <p>{item.descripcion}</p>
              <p>Precio: ${isNaN(precio) ? "N/A" : precio.toFixed(2)}</p>
              <button onClick={() => handleAddToCart(item)}>Agregar al Carrito</button>
            </li>
          );
        })}
      </ul>

      {/* Sección del Carrito */}
      <h2>Carrito</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {cart.map((item, index) => (
          <li key={index} style={{ marginBottom: "1rem" }}>
            <h4>{item.nombre}</h4>
            <p>Cantidad: {item.quantity}</p>
            <p>Precio Unitario: ${item.precio.toFixed(2)}</p>
            <p>Total: ${(item.quantity * item.precio).toFixed(2)}</p>
          </li>
        ))}
      </ul>

      {/* Botón para Enviar el Pedido */}
      <button onClick={handleSubmitOrder}>Enviar Pedido</button>
    </div>
  );
};

export default CreateOrder;