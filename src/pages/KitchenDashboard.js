import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
  List,
  ListItem,
  Tabs,
  Tab,
} from "@mui/material";

const KitchenDashboard = () => {
  // Estado para almacenar los pedidos por estado
  const [orders, setOrders] = useState({
    pendiente: [],
    "en-preparacion": [],
    listo: [],
  });

  // Estado para manejar la pestaña activa
  const [activeTab, setActiveTab] = useState("pendiente");

  // Estados para manejar la carga, errores y notificaciones
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Cargar pedidos al iniciar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get("/kitchen-orders");
        setOrders(response.data); // Actualizar el estado con los datos del backend
      } catch (err) {
        console.error("Error al cargar pedidos:", err.message);
        setError("Hubo un problema al cargar los pedidos. Por favor, intenta nuevamente.");
      } finally {
        setLoading(false); // Finalizar la carga independientemente del resultado
      }
    };

    fetchOrders();
  }, []);

  // Función para actualizar el estado de un pedido
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      // Enviar la solicitud al backend para actualizar el estado del pedido
      await apiClient.post("/update-order-status", { orderId, newStatus });

      // Actualizar el estado local de los pedidos
      setOrders((prevOrders) => {
        const updatedOrders = { ...prevOrders };

        // Eliminar el pedido del estado anterior
        Object.keys(updatedOrders).forEach((status) => {
          updatedOrders[status] = updatedOrders[status].filter((order) => order.id !== orderId);
        });

        // Mover el pedido al nuevo estado
        const orderToUpdate = orders[Object.keys(orders).find((status) =>
          orders[status].some((order) => order.id === orderId)
        )]?.find((order) => order.id === orderId);

        if (orderToUpdate) {
          updatedOrders[newStatus].push({ ...orderToUpdate, status: newStatus });
        }

        return updatedOrders;
      });

      // Mostrar notificación de éxito
      setSnackbarMessage(`Pedido actualizado a "${newStatus}".`);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error al actualizar el estado del pedido:", error.message);

      // Mostrar notificación de error
      setSnackbarMessage("Error al actualizar el estado del pedido. Por favor, intenta nuevamente.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Cambiar la pestaña activa
  const handleChangeTab = (event, newValue) => {
    setActiveTab(newValue);
  };

  // Renderizado condicional mientras se cargan los datos
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6">Cargando pedidos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        padding: "2rem",
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
      }}
    >
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722" }}>
        Bienvenido al Dashboard de Cocina
      </Typography>
      <Typography variant="body1" gutterBottom>
        Aquí puedes visualizar y cambiar el estado de los pedidos.
      </Typography>

      {/* Pestañas */}
      <Tabs value={activeTab} onChange={handleChangeTab} centered>
        <Tab label="Pendientes" value="pendiente" />
        <Tab label="En Preparación" value="en-preparacion" />
        <Tab label="Completados" value="listo" />
      </Tabs>

      {/* Contenido de las Pestañas */}
      {activeTab === "pendiente" && (
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Pedidos Pendientes
          </Typography>
          {orders.pendiente.length > 0 ? (
            <Box>
              {orders.pendiente.map((order) => (
                <Card key={order.id} sx={{ marginBottom: "1rem" }}>
                  <CardContent>
                    <Typography variant="h6">Pedido #{order.id}</Typography>
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <Typography variant="body2">
                            {item.productName} - Cantidad: {item.quantity}, Precio: $
                            {isNaN(item.price) ? "N/A" : item.price.toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      fullWidth
                      onClick={() => updateOrderStatus(order.id, "en-preparacion")}
                      variant="contained"
                      sx={{
                        marginTop: "1rem",
                        backgroundColor: "#FF5722",
                        "&:hover": { backgroundColor: "#d32f2f" },
                      }}
                    >
                      En Preparación
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">No hay pedidos pendientes.</Typography>
          )}
        </Box>
      )}

      {activeTab === "en-preparacion" && (
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Pedidos en Preparación
          </Typography>
          {orders["en-preparacion"].length > 0 ? (
            <Box>
              {orders["en-preparacion"].map((order) => (
                <Card key={order.id} sx={{ marginBottom: "1rem" }}>
                  <CardContent>
                    <Typography variant="h6">Pedido #{order.id}</Typography>
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <Typography variant="body2">
                            {item.productName} - Cantidad: {item.quantity}, Precio: $
                            {isNaN(item.price) ? "N/A" : item.price.toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                    <Button
                      fullWidth
                      onClick={() => updateOrderStatus(order.id, "listo")}
                      variant="contained"
                      sx={{
                        marginTop: "1rem",
                        backgroundColor: "#FFC107",
                        color: "#000",
                        "&:hover": { backgroundColor: "#e0a800" },
                      }}
                    >
                      Listo
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">No hay pedidos en preparación.</Typography>
          )}
        </Box>
      )}

      {activeTab === "listo" && (
        <Box sx={{ marginTop: "2rem" }}>
          <Typography variant="h5" gutterBottom>
            Pedidos Completados
          </Typography>
          {orders.listo.length > 0 ? (
            <Box>
              {orders.listo.map((order) => (
                <Card key={order.id} sx={{ marginBottom: "1rem" }}>
                  <CardContent>
                    <Typography variant="h6">Pedido #{order.id}</Typography>
                    <List>
                      {order.items.map((item, index) => (
                        <ListItem key={index}>
                          <Typography variant="body2">
                            {item.productName} - Cantidad: {item.quantity}, Precio: $
                            {isNaN(item.price) ? "N/A" : item.price.toFixed(2)}
                          </Typography>
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">No hay pedidos completados.</Typography>
          )}
        </Box>
      )}

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

export default KitchenDashboard;