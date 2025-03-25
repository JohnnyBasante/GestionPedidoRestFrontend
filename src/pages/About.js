import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Link
} from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";

const About = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        py: 8,
      }}
    >
      {/* Contenedor principal */}
      <Container maxWidth="lg">
        {/* Título */}
        <Typography
          variant="h3"
          gutterBottom
          align="center"
          sx={{ color: "#FF5722", fontWeight: "bold" }}
        >
          Nosotros
        </Typography>

        {/* Misión y Visión */}
        <Grid container spacing={4}>
          {/* Misión */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 4,
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "#FF5722" }}>
                Misión
              </Typography>
              <Typography variant="body1">
                Nuestra misión es ofrecer comida rápida de alta calidad,
                preparada con ingredientes frescos y servida con rapidez, para
                satisfacer las necesidades de nuestros clientes en cada momento.
              </Typography>
            </Box>
          </Grid>

          {/* Visión */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: "#fff",
                p: 4,
                borderRadius: "16px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography variant="h5" gutterBottom sx={{ color: "#FF5722" }}>
                Visión
              </Typography>
              <Typography variant="body1">
                Ser el restaurante de comida rápida preferido en la región,
                reconocido por nuestra excelencia en servicio, innovación en el
                menú y compromiso con la satisfacción del cliente.
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Contacto */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            Contacto
          </Typography>

          {/* Información de contacto */}
          <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  backgroundColor: "#fff",
                  p: 4,
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <PhoneIcon sx={{ fontSize: "48px", color: "#FF5722" }} />
                <Typography variant="h6">Teléfono</Typography>
                <Typography variant="body1" align="center">
                  <Link href="tel:+123456789" color="inherit" underline="hover">
                    +57 315 874 6198
                  </Link>
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1rem",
                  backgroundColor: "#fff",
                  p: 4,
                  borderRadius: "16px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <EmailIcon sx={{ fontSize: "48px", color: "#FF5722" }} />
                <Typography variant="h6">Correo Electrónico</Typography>
                <Typography variant="body1" align="center">
                  <Link
                    href="mailto:info@restauranteapp.com"
                    color="inherit"
                    underline="hover"
                  >
                    info@comidarapidaapp.com
                  </Link>
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Ubicación (Google Maps) */}
        <Box sx={{ mt: 6 }}>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            Ubicación
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3986.14325920491!2d-76.59635752412562!3d2.459385997519467!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e30039d7270d777%3A0xa749ba51fed22c24!2sCampanario%20Centro%20Comercial!5e0!3m2!1ses!2sco!4v1742925401339!5m2!1ses!2sco" 
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: "16px" }}
              allowFullScreen=""
              loading="lazy"
              title="Ubicación del Restaurante"
            ></iframe>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;