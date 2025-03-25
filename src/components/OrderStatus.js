import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  List,
  ListItem,
  Snackbar,
  Alert,
} from "@mui/material";

const OrderStatus = ({ userId }) => {
  const [orders, setOrders] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  // Cargar los pedidos al iniciar el componente
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await apiClient.get(`/user-orders/${userId}`);
        setOrders(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos:", error.message);
        setSnackbarMessage("Error al cargar los pedidos. Por favor, intenta nuevamente.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchOrders();
  }, [userId]);

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722", textAlign: "center" }}>
        Estado de Mis Pedidos
      </Typography>

      {/* Lista de Pedidos */}
      <Grid container spacing={4}>
        {orders.length > 0 ? (
          orders.map((order) => (
            <Grid item xs={12} sm={6} md={4} key={order.id}>
              <Card sx={{ maxWidth: 345, margin: "auto" }}>
                <CardContent>
                  {/* Detalles del Pedido */}
                  <Typography variant="h5" component="div">
                    Pedido ID: {order.id}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Estado: {order.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Fecha:{" "}
                    {new Date(order.createdAt.seconds * 1000).toLocaleString()}
                  </Typography>

                  {/* Lista de Productos */}
                  <List dense sx={{ padding: 0 }}>
                    {order.items.map((item, index) => (
                      <ListItem key={index} disablePadding>
                        <Box sx={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="subtitle1">{item.productId}</Typography>
                          <Typography variant="body2">
                            Cantidad: {item.quantity}
                          </Typography>
                          <Typography variant="body2">
                            Precio: $
                            {typeof item.price === "number"
                              ? item.price.toFixed(2)
                              : "N/A"}
                          </Typography>
                        </Box>
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            No hay pedidos disponibles.
          </Typography>
        )}
      </Grid>

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

export default OrderStatus;