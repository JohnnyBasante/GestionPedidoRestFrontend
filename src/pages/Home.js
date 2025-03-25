import React from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { Link } from "react-router-dom";

const Home = () => {
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
        {/* Sección de Bienvenida */}
        <Box
          sx={{
            textAlign: "center",
            mb: 6,
          }}
        >
          <Typography
            variant="h3"
            gutterBottom
            sx={{ color: "#FF5722", fontWeight: "bold" }}
          >
            Bienvenido a tu lugar preferido de Comida Rápidas 
          </Typography>
          <Typography variant="h5" sx={{ color: "#333" }}>
            Descubre nuestro menú y realiza tus pedidos fácilmente
          </Typography>
        </Box>

        {/* Recomendaciones Destacadas */}
        <Typography
          variant="h4"
          gutterBottom
          align="center"
          sx={{ color: "#FF5722", fontWeight: "bold", mb: 4 }}
        >
          Nuestras Recomendaciones
        </Typography>

        <Grid container spacing={4}>
          {/* Recomendación 1 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="./images/FondoHamburguesa.jpg"
                alt="Recomendación 1"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Deliciosas Hamburguesas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Una hamburguesa jugosa con queso derretido, lechuga fresca y salsas de la casa.
                </Typography>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/menu"
                sx={{
                  backgroundColor: "#FF5722",
                  "&:hover": { backgroundColor: "#d32f2f" },
                  mt: "auto",
                }}
              >
                Ver Menú
              </Button>
            </Card>
          </Grid>

          {/* Recomendación 2 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="/images/FondoPizza.jpg"
                alt="Recomendación 2"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Pizzas de todo los Sabores
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Pizzas deliciosas con un toque especial. Perfectas para compartir.
                </Typography>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/menu"
                sx={{
                  backgroundColor: "#FF5722",
                  "&:hover": { backgroundColor: "#d32f2f" },
                  mt: "auto",
                }}
              >
                Ver Menú
              </Button>
            </Card>
          </Grid>

          {/* Recomendación 3 */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image="/images/FondoBebidas.jpg"
                alt="Recomendación 3"
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  Bebidas Refrescantes
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Disfruta de nuestras bebidas frías y refrescantes para acompañar tu comida.
                </Typography>
              </CardContent>
              <Button
                fullWidth
                variant="contained"
                component={Link}
                to="/menu"
                sx={{
                  backgroundColor: "#FF5722",
                  "&:hover": { backgroundColor: "#d32f2f" },
                  mt: "auto",
                }}
              >
                Ver Menú
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;