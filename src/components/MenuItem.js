import React, { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const MenuItem = ({ item, onAddToCart }) => {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Función para manejar el clic en "Agregar al Pedido"
  const handleAddToCart = () => {
    onAddToCart(item); // Llama a la función pasada como prop
    setOpenSnackbar(true); // Muestra la notificación
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {/* Tarjeta del Producto */}
      <Card sx={{ maxWidth: 345, margin: "auto", marginBottom: "2rem" }}>
        <CardContent>
          {/* Imagen */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "1rem",
            }}
          >
            <img
              src={`/images/${item.imagen || "default.jpg"}`} // Usa una imagen predeterminada si no hay imagen
              alt={item.nombre || "Producto sin nombre"}
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
              }}
            />
          </Box>

          {/* Detalles del Producto */}
          <Typography variant="h5" component="div">
            {item.nombre || "Nombre no disponible"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.descripcion || "Sin descripción disponible."}
          </Typography>
          <Typography variant="h6" color="primary">
            Precio: $
            {typeof item.precio === "number" ? item.precio.toFixed(2) : "N/A"}
          </Typography>

          {/* Botón para Agregar al Carrito */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleAddToCart}
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

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          ¡{item.nombre} agregado al pedido!
        </Alert>
      </Snackbar>
    </>
  );
};

export default MenuItem;