import React, { useEffect, useState, useCallback } from "react";
import apiClient from "../api/apiClient";
import useAuth from "../hooks/useAuth";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  List,
  ListItem,
  Snackbar,
  Alert,
} from "@mui/material";

const WaiterDashboard = () => {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Obtener el usuario autenticado usando el hook personalizado
  const user = useAuth();
  const waiterId = user?.uid || null; // ID del mesero

  // Función para cargar el menú
  const fetchMenu = useCallback(async () => {
    try {
      const response = await apiClient.get("/menu");
      setMenu(response.data);
    } catch (error) {
      console.error("Error al cargar el menú:", error.message);
    }
  }, []);

  // Función para cargar los pedidos del mesero
  const fetchOrders = useCallback(async () => {
    if (!waiterId) return;

    try {
      const response = await apiClient.get(`/user-orders/${waiterId}`);
      setOrders(response.data);
    } catch (error) {
      console.error("Error al cargar los pedidos:", error.message);
    }
  }, [waiterId]);

  // Efecto para cargar el menú y los pedidos al montar el componente
  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, [fetchMenu, fetchOrders]);

  // Agregar un producto al carrito
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

    // Mostrar notificación
    setSnackbarMessage(`${product.nombre} agregado al carrito.`);
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
  };

  // Eliminar un producto del carrito
  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));

    // Mostrar notificación
    setSnackbarMessage("Producto eliminado del carrito.");
    setSnackbarSeverity("warning");
    setOpenSnackbar(true);
  };

  // Crear un pedido
  const handleCreateOrder = async () => {
    if (cart.length === 0) {
      setSnackbarMessage("El carrito está vacío. Agrega productos antes de realizar el pedido.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    try {
      const items = cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
        price: typeof item.precio === "number" ? item.precio : parseFloat(item.precio),
      }));

      const response = await apiClient.post("/create-order", {
        userId: waiterId, // ID del mesero
        items,
      });

      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      setCart([]); // Limpiar el carrito después de enviar el pedido
      fetchOrders(); // Actualizar la lista de pedidos
    } catch (error) {
      console.error("Error al crear el pedido:", error.message);
      setSnackbarMessage("Error al crear el pedido. Por favor, intenta de nuevo.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Si el usuario no está autenticado, mostrar un mensaje
  if (!user) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Debes iniciar sesión para ver esta página.</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722", textAlign: "center" }}>
        Bienvenido al Dashboard de los Meseros
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="center">
        Aquí puedes realizar pedidos y visualizar el estado de ellos.
      </Typography>

      {/* Sección del Menú */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Menú
        </Typography>
        <Grid container spacing={4}>
          {menu.map((item) => {
            const precio = typeof item.precio === "number" ? item.precio : parseFloat(item.precio);
            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ maxWidth: 345, margin: "auto" }}>
                  <CardContent>
                    <img
                      src={`/images/${item.imagen}`}
                      alt={item.nombre}
                      style={{ width: "100%", height: "150px", objectFit: "cover" }}
                    />
                    <Typography variant="h6">{item.nombre}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.descripcion}
                    </Typography>
                    <Typography variant="body1" color="primary">
                      Precio: ${isNaN(precio) ? "N/A" : precio.toFixed(2)}
                    </Typography>
                    <Button
                      fullWidth
                      variant="contained"
                      onClick={() => handleAddToCart(item)}
                      sx={{
                        marginTop: "1rem",
                        backgroundColor: "#FF5722",
                        "&:hover": { backgroundColor: "#d32f2f" },
                      }}
                    >
                      Agregar al Pedido
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      {/* Sección del Pedido */}
      <Box sx={{ marginBottom: "2rem" }}>
        <Typography variant="h5" gutterBottom>
          Pedido
        </Typography>
        {cart.length > 0 ? (
          <List>
            {cart.map((item) => {
              const precio = typeof item.precio === "number" ? item.precio : parseFloat(item.precio);
              return (
                <ListItem key={item.id} sx={{ marginBottom: "1rem" }}>
                  <Card sx={{ width: "100%", padding: "1rem" }}>
                    <CardContent>
                      <Typography variant="subtitle1">{item.nombre}</Typography>
                      <Typography variant="body2">Cantidad: {item.quantity}</Typography>
                      <Typography variant="body2">
                        Precio Unitario: ${isNaN(precio) ? "N/A" : precio.toFixed(2)}
                      </Typography>
                      <Typography variant="body2">
                        Total: ${(item.quantity * precio).toFixed(2)}
                      </Typography>
                      <Button
                        variant="contained"
                        onClick={() => handleRemoveFromCart(item.id)}
                        sx={{
                          marginTop: "1rem",
                          backgroundColor: "#FFC107",
                          color: "#000",
                          "&:hover": { backgroundColor: "#e0a800" },
                        }}
                      >
                        Eliminar
                      </Button>
                    </CardContent>
                  </Card>
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography variant="body1">El pedido está vacío.</Typography>
        )}
        <Button
          fullWidth
          variant="contained"
          onClick={handleCreateOrder}
          sx={{
            marginTop: "1rem",
            backgroundColor: "#28a745",
            color: "#fff",
            "&:hover": { backgroundColor: "#218838" },
          }}
        >
          Enviar Pedido
        </Button>
      </Box>

      {/* Sección de Estado de Pedidos */}
      <Box>
      <Typography variant="h5" gutterBottom>
        Mis Pedidos
      </Typography>
      {orders.length > 0 ? (
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} sx={{ marginBottom: "1rem" }}>
              <Card sx={{ width: "100%", padding: "1rem" }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    Pedido ID: {order.id}
                  </Typography>
                  <Typography variant="body2">
                    Estado:{" "}
                    <span
                      style={{
                        color:
                          order.status === "pendiente"
                            ? "#FF5722" // Rojo para pendiente
                            : order.status === "en-preparacion"
                            ? "#FFC107" // Amarillo para en preparación
                            : "#28a745", // Verde para listo
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    Total: ${order.total || "N/A"}
                  </Typography>
                  <Box sx={{ marginTop: "0.5rem" }}>
                    <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                      Productos:
                    </Typography>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} - Cantidad: {item.quantity}, Precio: $
                          {isNaN(item.price) ? "N/A" : item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No hay pedidos disponibles.</Typography>
        )}
      </Box>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default WaiterDashboard;