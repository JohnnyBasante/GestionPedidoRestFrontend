import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722", // Rojo
    },
    secondary: {
      main: "#FFC107", // Amarillo
    },
    background: {
      default: "#FFFFFF", // Fondo blanco
      paper: "#F5F5F5", // Gris claro para tarjetas
    },
    text: {
      primary: "#212121", // Negro
      secondary: "#757575", // Gris oscuro
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.75rem",
      fontWeight: 500,
    },
  },
});

export default theme;