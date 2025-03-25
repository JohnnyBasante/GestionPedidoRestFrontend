import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import KitchenDashboard from "./pages/KitchenDashboard";
import WaiterDashboard from "./pages/WaiterDashboard";
import ClientDashboard from "./pages/ClientDashboard";
import Menu from "./components/Menu";
import AccessDenied from "./pages/AccessDenied";
import Chatbot from "./components/Chatbot"; // Importa el componente Chatbot
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import RoleRoute from "./components/RoleRoute";
import theme from "./theme";

function App() {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}> {/* Aplica el tema */}
        <Router>
          {/* Header común para todas las páginas */}
          <Header />

          {/* Rutas de la aplicación */}
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Ruta para acceso denegado */}
            <Route path="/access-denied" element={<AccessDenied />} />

            {/* Rutas protegidas */}
            <Route
              path="/admin-dashboard"
              element={
                <RoleRoute allowedRoles={["admin"]}>
                  <AdminDashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/kitchen-dashboard"
              element={
                <RoleRoute allowedRoles={["kitchen"]}>
                  <KitchenDashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/waiter-dashboard"
              element={
                <RoleRoute allowedRoles={["waiter"]}>
                  <WaiterDashboard />
                </RoleRoute>
              }
            />
            <Route
              path="/client-dashboard"
              element={
                <PrivateRoute allowedRoles={"client"}>
                  <ClientDashboard />
                </PrivateRoute>
              }
            />

            {/* Redirección por defecto */}
            <Route path="*" element={<h1>Página no encontrada</h1>} />
          </Routes>

          {/* Footer común para todas las páginas */}
          <Footer />

          {/* Chatbot global */}
          <Chatbot />
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;