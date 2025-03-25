import axios from "axios";
import { getAuth, getIdToken } from "firebase/auth";

const auth = getAuth();

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

// Lista de rutas públicas que no requieren autenticación
const publicRoutes = ["/menu"];

apiClient.interceptors.request.use(async (config) => {
  // Verificar si la ruta es pública
  if (publicRoutes.includes(config.url)) {
    return config; // No aplicar autenticación
  }

  const user = auth.currentUser;
  if (user) {
    try {
      const token = await getIdToken(user, true); // Obtener un token válido
      config.headers.Authorization = `Bearer ${token}`;
    } catch (error) {
      console.error("Error al obtener el token:", error.message);
      window.location.href = "/login"; // Redirigir si no hay token
    }
  } else {
    console.error("Usuario no autenticado.");
    window.location.href = "/login"; // Redirigir si no hay usuario
  }
  return config;
});

export default apiClient;