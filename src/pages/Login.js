import React, { useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("error");
  const navigate = useNavigate();

  // Función para validar el formulario
  const validateForm = () => {
    if (!email || !password) {
      setSnackbarMessage("Por favor, completa todos los campos.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setSnackbarMessage("Por favor, ingresa un correo electrónico válido.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return false;
    }
    return true;
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault();

    // Validar el formulario antes de continuar
    if (!validateForm()) return;

    try {
      // Iniciar sesión con Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Obtener el rol del usuario desde Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const role = userData.role;

        // Redirigir según el rol usando React Router
        switch (role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "kitchen":
            navigate("/kitchen-dashboard");
            break;
          case "waiter":
            navigate("/waiter-dashboard");
            break;
          default:
            navigate("/client-dashboard");
        }
      } else {
        setSnackbarMessage("Usuario no encontrado en la base de datos.");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      // Manejar errores específicos de Firebase
      let errorMessage = "Error desconocido.";
      switch (error.code) {
        case "auth/invalid-email":
          errorMessage = "Correo electrónico inválido.";
          break;
        case "auth/user-not-found":
          errorMessage = "No se encontró ninguna cuenta con este correo.";
          break;
        case "auth/wrong-password":
          errorMessage = "Contraseña incorrecta.";
          break;
        case "auth/invalid-credential":
          errorMessage = "Credenciales inválidas. Verifica tu correo y contraseña.";
          break;
        default:
          errorMessage = error.message;
      }
      setSnackbarMessage(errorMessage);
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
        Iniciar Sesión
      </Typography>

      {/* Formulario */}
      <Box
        component="form"
        onSubmit={handleLogin}
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
        {/* Campo de Correo Electrónico */}
        <TextField
          fullWidth
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          variant="outlined"
        />

        {/* Campo de Contraseña */}
        <TextField
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          variant="outlined"
        />

        {/* Botón de Inicio de Sesión */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: "#FF5722",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          Ingresar
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

export default Login;