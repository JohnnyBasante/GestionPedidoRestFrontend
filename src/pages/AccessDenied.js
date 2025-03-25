import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Container,
} from "@mui/material";

const AccessDenied = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Contenedor principal */}
      <Container maxWidth="sm">
        <Box
          sx={{
            textAlign: "center",
            padding: "2rem",
            borderRadius: "16px",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            backgroundColor: "#fff",
          }}
        >
          {/* Título */}
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            Acceso Denegado
          </Typography>

          {/* Mensaje */}
          <Typography variant="h6" sx={{ color: "#333", mb: 4 }}>
            No tienes permisos para acceder a esta página.
          </Typography>

          {/* Botón para regresar al inicio */}
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "#FF5722",
              "&:hover": { backgroundColor: "#d32f2f" },
            }}
          >
            Regresar al Inicio
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default AccessDenied;