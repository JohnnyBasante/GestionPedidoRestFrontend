import React from "react";
import {
  Box,
  Typography,
  IconButton
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

const Footer = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#343a40",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        marginTop: "auto",
      }}
    >
      {/* Sección de derechos reservados */}
      <Typography variant="body2" gutterBottom>
        © 2025 Studio DELTA. Todos los derechos reservados.
      </Typography>

      {/* Seccón de redes sociales */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem", marginTop: "1rem" }}>
        {/* Enlace a Facebook */}
        <IconButton
          aria-label="Facebook"
          href="https://www.facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#fff",
            backgroundColor: "#FF5722", // Rojo para Facebook
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          <FacebookIcon />
        </IconButton>

        {/* Enlace a Instagram */}
        <IconButton
          aria-label="Instagram"
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            color: "#fff",
            backgroundColor: "#FFC107", // Amarillo para Instagram
            "&:hover": { backgroundColor: "#e0a800" },
          }}
        >
          <InstagramIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;