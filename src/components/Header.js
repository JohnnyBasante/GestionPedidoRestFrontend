import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GiHamburger } from "react-icons/gi"; // Ícono de hamburguesa
import { AppBar, Toolbar, Box, Typography, Button, IconButton, Snackbar, Alert } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { auth } from "../firebase/firebaseConfig";

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);

  // Función para cerrar sesión
  const handleLogout = async () => {
    try {
      await auth.signOut();
      setOpenSnackbar(true);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Redirigir al inicio cuando se hace clic en el ícono de hamburguesa
  const handleGoHome = () => {
    navigate("/"); // Redirige al usuario a la página de inicio
  };

  return (
    <>
      {/* Encabezado */}
      <AppBar position="static" sx={{ backgroundColor: "#FF5722" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          {/* Logo o Nombre del Restaurante */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            {/* Ícono del menú con redirección al inicio */}
            <IconButton color="inherit" onClick={handleGoHome} aria-label="Ir al Inicio">
              <GiHamburger size={28} />
            </IconButton>
            <Link to="/" style={{ textDecoration: "none", color: "#fff" }}>
              <Typography variant="h6" fontWeight="bold">
                Restaurante App
              </Typography>
            </Link>
          </Box>

          {/* Pestañas de Navegación */}
          <Box sx={{ display: "flex", gap: "1rem" }}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Inicio
            </Link>
            <Link
              to="/menu"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Menú
            </Link>
            <Link
              to="/about"
              style={{
                textDecoration: "none",
                color: "#fff",
                fontWeight: "bold",
                fontSize: "0.9rem",
              }}
            >
              Nosotros
            </Link>
          </Box>

          {/* Botones de Acceso, Registro y Cierre de Sesión */}
          <Box sx={{ display: "flex", gap: "0.5rem" }}>
            {user ? (
              // Si el usuario está autenticado, mostrar el botón de "Cerrar Sesión"
              <Button
                onClick={handleLogout}
                variant="contained"
                sx={{
                  backgroundColor: "#FFC107",
                  color: "#000",
                  "&:hover": { backgroundColor: "#e0a800" },
                }}
              >
                Cerrar Sesión
              </Button>
            ) : (
              // Si el usuario no está autenticado, mostrar los botones de "Iniciar Sesión" y "Registrarse"
              <>
                <Button
                  component={Link}
                  to="/login"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5722",
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  Iniciar Sesión
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FFC107",
                    color: "#000",
                    "&:hover": { backgroundColor: "#e0a800" },
                  }}
                >
                  Registrarse
                </Button>
              </>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          Sesión cerrada correctamente.
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;