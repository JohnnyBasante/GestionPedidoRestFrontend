import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  });
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const navigate = useNavigate();

  // Función para manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Construir la URL completa usando la variable de entorno
      const apiUrl = `${process.env.REACT_APP_API_URL}/register-client`;

      // Enviar los datos de registro al backend
      const response = await axios.post(apiUrl, formData);

      // Mostrar mensaje de éxito
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Redirigir al dashboard del cliente después de 3 segundos
      setTimeout(() => {
        navigate("/client-dashboard");
      }, 3000);
    } catch (error) {
      console.error(
        "Error al registrar usuario:",
        error.response?.data?.error || error.message
      );
      setSnackbarMessage(
        "Error al registrar usuario. Por favor, intenta de nuevo."
      );
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f9f9f9",
      }}
    >
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722" }}>
        Registro de Cliente
      </Typography>

      {/* Formulario */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "2rem",
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        {/* Nombre Completo */}
        <TextField
          fullWidth
          label="Nombre Completo"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          variant="outlined"
        />

        {/* Dirección */}
        <TextField
          fullWidth
          label="Dirección"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
          variant="outlined"
        />

        {/* Teléfono */}
        <TextField
          fullWidth
          label="Teléfono"
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          variant="outlined"
        />

        {/* Correo Electrónico */}
        <TextField
          fullWidth
          label="Correo Electrónico"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          variant="outlined"
        />

        {/* Contraseña */}
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          variant="outlined"
        />

        {/* Botón de Registro */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Registrarse
        </Button>
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

export default Register;