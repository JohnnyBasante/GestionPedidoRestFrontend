import React, { useEffect, useState } from "react";
import apiClient from "../api/apiClient";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Snackbar,
  Alert,
} from "@mui/material";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");

  // Cargar el menú al iniciar el componente
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await apiClient.get("/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error al cargar el menú:", error.message);
        setSnackbarMessage("Error al cargar el menú. Por favor, intenta nuevamente.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchMenu();
  }, []);

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722", textAlign: "center" }}>
        Menú
      </Typography>

      {/* Lista de Productos */}
      <Grid container spacing={4}>
        {menuItems.length > 0 ? (
          menuItems.map((item) => {
            // Validar y convertir el precio
            const precio =
              typeof item.precio === "number"
                ? item.precio
                : parseFloat(item.precio) || "N/A";

            return (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card sx={{ maxWidth: 345, margin: "auto" }}>
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
                        src={`/images/${item.imagen || "default.jpg"}`}
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
                      {typeof precio === "number" ? precio.toFixed(2) : precio}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography variant="body1" sx={{ textAlign: "center", width: "100%" }}>
            No hay elementos en el menú.
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

export default Menu;