import React, { useState, useEffect } from "react";
import apiClient from "../api/apiClient";
import {
  Box,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Paper,
  Card,
  CardContent,
  List,
  ListItem,
  Snackbar,
  Alert,
} from "@mui/material";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("workers"); // Pestaña activa
  const [workers, setWorkers] = useState([]); // Lista de trabajadores
  const [clients, setClients] = useState([]); // Lista de clientes
  const [orders, setOrders] = useState([]); // Historial de pedidos
  const [formData, setFormData] = useState({ email: "", password: "", role: "waiter" }); // Formulario para crear/editar trabajadores
  const [editingWorkerId, setEditingWorkerId] = useState(null); // ID del trabajador en edición
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Manejo de errores
  const [openSnackbar, setOpenSnackbar] = useState(false); // Estado del Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // Mensaje del Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // Severidad del Snackbar

  // Cargar datos según la pestaña activa
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (activeTab === "workers") {
          const response = await apiClient.get("/workers");
          setWorkers(response.data);
        } else if (activeTab === "clients") {
          const response = await apiClient.get("/clients");
          setClients(response.data);
        } else if (activeTab === "orders") {
          const response = await apiClient.get("/order-history");
          setOrders(response.data);
        }
      } catch (err) {
        console.error("Error al cargar datos:", err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeTab]);

  // Manejar cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Crear trabajador
  const handleCreateWorker = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/register-worker", formData);
      setSnackbarMessage("Trabajador creado con éxito.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Limpiar el formulario
      setFormData({ email: "", password: "", role: "waiter" });

      // Recargar la lista de trabajadores
      const response = await apiClient.get("/workers");
      setWorkers(response.data);
    } catch (error) {
      console.error("Error al crear trabajador:", error.message);
      setSnackbarMessage("Error al crear trabajador.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Editar trabajador
  const handleEditWorker = (worker) => {
    setFormData({
      email: worker.email || "",
      password: "", // No cargamos la contraseña por seguridad
      role: worker.role || "waiter",
    });
    setEditingWorkerId(worker.id);
  };

  // Actualizar trabajador
  const handleUpdateWorker = async (e) => {
    e.preventDefault();

    try {
      await apiClient.post("/update-worker", {
        workerId: editingWorkerId,
        email: formData.email,
        password: formData.password || null, // Contraseña opcional
        role: formData.role,
      });

      setSnackbarMessage("Trabajador actualizado con éxito.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Limpiar el formulario
      setFormData({ email: "", password: "", role: "waiter" });
      setEditingWorkerId(null);

      // Recargar la lista de trabajadores
      const response = await apiClient.get("/workers");
      setWorkers(response.data);
    } catch (error) {
      console.error("Error al actualizar trabajador:", error.message);
      setSnackbarMessage("Error al actualizar trabajador.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Eliminar trabajador
  const handleDeleteWorker = async (workerId) => {
    if (!window.confirm("¿Estás seguro de que deseas eliminar este trabajador?")) {
      return;
    }

    try {
      await apiClient.post("/delete-worker", { workerId });
      setSnackbarMessage("Trabajador eliminado con éxito.");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      // Recargar la lista de trabajadores
      const response = await apiClient.get("/workers");
      setWorkers(response.data);
    } catch (error) {
      console.error("Error al eliminar trabajador:", error.message);
      setSnackbarMessage("Error al eliminar trabajador.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6">Cargando datos...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Typography variant="h6" color="error">
          Error: {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: "2rem", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      {/* Título */}
      <Typography variant="h4" gutterBottom sx={{ color: "#FF5722", textAlign: "center" }}>
        Bienvenido al Dashboard del Admin
      </Typography>
      <Typography variant="body1" gutterBottom textAlign="center">
        Aquí puedes crear, editar y eliminar trabajadores, ver lista de clientes y el historial de pedidos.
      </Typography>

      {/* Navegación entre pestañas */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <Button
          variant={activeTab === "workers" ? "contained" : "outlined"}
          onClick={() => setActiveTab("workers")}
          sx={{
            backgroundColor: activeTab === "workers" ? "#FF5722" : "transparent",
            color: activeTab === "workers" ? "#fff" : "#333",
            "&:hover": { backgroundColor: activeTab === "workers" ? "#d32f2f" : "#f0f0f0" },
          }}
        >
          Trabajadores
        </Button>
        <Button
          variant={activeTab === "clients" ? "contained" : "outlined"}
          onClick={() => setActiveTab("clients")}
          sx={{
            backgroundColor: activeTab === "clients" ? "#FF5722" : "transparent",
            color: activeTab === "clients" ? "#fff" : "#333",
            "&:hover": { backgroundColor: activeTab === "clients" ? "#d32f2f" : "#f0f0f0" },
          }}
        >
          Clientes
        </Button>
        <Button
          variant={activeTab === "orders" ? "contained" : "outlined"}
          onClick={() => setActiveTab("orders")}
          sx={{
            backgroundColor: activeTab === "orders" ? "#FF5722" : "transparent",
            color: activeTab === "orders" ? "#fff" : "#333",
            "&:hover": { backgroundColor: activeTab === "orders" ? "#d32f2f" : "#f0f0f0" },
          }}
        >
          Historial de Pedidos
        </Button>
      </Box>

      {/* Contenido de las pestañas */}
      {activeTab === "workers" && (
        <Box>
          <Typography variant="h5" gutterBottom>
            {editingWorkerId ? "Editar Trabajador" : "Crear Trabajador"}
          </Typography>
          <Card sx={{ padding: "2rem", marginBottom: "2rem" }}>
            <form onSubmit={editingWorkerId ? handleUpdateWorker : handleCreateWorker}>
              <TextField
                fullWidth
                type="email"
                name="email"
                label="Correo electrónico"
                value={formData.email}
                onChange={handleChange}
                required
                sx={{ marginBottom: "1rem" }}
              />
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Contraseña (opcional)"
                value={formData.password}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
              />
              <Select
                fullWidth
                name="role"
                value={formData.role}
                onChange={handleChange}
                sx={{ marginBottom: "1rem" }}
              >
                <MenuItem value="waiter">Mesero</MenuItem>
                <MenuItem value="kitchen">Cocina</MenuItem>
              </Select>
              <Box sx={{ display: "flex", gap: "1rem" }}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{
                    backgroundColor: "#FF5722",
                    "&:hover": { backgroundColor: "#d32f2f" },
                  }}
                >
                  {editingWorkerId ? "Actualizar Trabajador" : "Crear Trabajador"}
                </Button>
                {editingWorkerId && (
                  <Button
                    type="button"
                    variant="outlined"
                    onClick={() => {
                      setFormData({ email: "", password: "", role: "waiter" });
                      setEditingWorkerId(null);
                    }}
                  >
                    Cancelar Edición
                  </Button>
                )}
              </Box>
            </form>
          </Card>

          <Typography variant="h5" gutterBottom>
            Lista de Trabajadores
          </Typography>
          <List>
            {workers.map((worker) => (
              <ListItem key={worker.id} sx={{ marginBottom: "1rem", display: "flex", justifyContent: "space-between" }}>
                <Box>
                  <Typography variant="subtitle1">{worker.email}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rol: {worker.role === "kitchen" ? "Cocina" : "Mesero"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", gap: "0.5rem" }}>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleEditWorker(worker)}
                    sx={{
                      backgroundColor: "#FFC107",
                      color: "#000",
                      "&:hover": { backgroundColor: "#e0a800" },
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleDeleteWorker(worker.id)}
                    sx={{
                      backgroundColor: "#FF5722",
                      "&:hover": { backgroundColor: "#d32f2f" },
                    }}
                  >
                    Eliminar
                  </Button>
                </Box>
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {activeTab === "clients" && (
        <Box>
        <Typography variant="h5" gutterBottom>
          Lista de Clientes
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Dirección</TableCell>
                <TableCell>Teléfono</TableCell>
                <TableCell>Correo Electrónico</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell>{client.fullName}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.phone}</TableCell>
                  <TableCell>{client.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      )}

      {activeTab === "orders" && (
        <Box>
        <Typography variant="h5" gutterBottom>
          Historial de Pedidos
        </Typography>
        <List>
          {orders.map((order) => (
            <ListItem key={order.id} sx={{ marginBottom: "1rem" }}>
              <Card sx={{ width: "100%", padding: "1rem" }}>
                <CardContent>
                  <Typography variant="subtitle1">
                    Cliente: {order.clientName} ({order.clientEmail})
                  </Typography>
                  <Typography variant="body2">Fecha: {order.createdAt}</Typography>
                  <Typography variant="body2">
                    Estado:{" "}
                    <span
                      style={{
                        color:
                          order.status === "pendiente"
                            ? "#FF5722" // Rojo para pendiente
                            : order.status === "en-preparacion"
                            ? "#FFC107" // Amarillo para en preparación
                            : "#28a745", // Verde para listo
                      }}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </Typography>
                  <Typography variant="body2">
                    Total: ${order.total || "N/A"}
                  </Typography>
                  <Box sx={{ marginTop: "0.5rem" }}>
                    <Typography variant="body2" component="div" sx={{ fontWeight: "bold" }}>
                      Productos:
                    </Typography>
                    <ul>
                      {order.items.map((item, index) => (
                        <li key={index}>
                          {item.productName} - Cantidad: {item.quantity}, Precio: $
                          {isNaN(item.price) ? "N/A" : item.price.toFixed(2)}
                        </li>
                      ))}
                    </ul>
                  </Box>
                </CardContent>
              </Card>
            </ListItem>
          ))}
        </List>
      </Box>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminDashboard;