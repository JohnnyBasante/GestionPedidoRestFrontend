import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  List,
  ListItem,
  Paper,
  TextField,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import CloseIcon from "@mui/icons-material/Close";

const Chatbot = () => {
  // Estados para manejar los mensajes, el input del usuario y el estado de carga
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar si el chat está abierto
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const sessionId = uuidv4(); // Genera un ID único para cada sesión

  // Función para manejar el envío de mensajes
  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      // Guardar el mensaje del usuario
      const userMessage = { sender: "user", text: message };
      setResponses((prev) => [...prev, userMessage]);

      // Construir la URL usando la variable de entorno
      const apiUrl = `${process.env.REACT_APP_API_URL}/chatbot`;

      // Enviar el mensaje al backend
      const response = await axios.post(apiUrl, {
        sessionId,
        message,
      });

      // Verificar si la respuesta tiene fulfillmentText
      const botResponseText = response.data.response;
      if (!botResponseText) {
        throw new Error("La respuesta del backend no contiene una respuesta válida.");
      }

      // Procesar la respuesta del backend
      const botMessage = { sender: "bot", text: botResponseText };
      setResponses((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error al comunicarse con el backend:", error.message);
      setResponses((prev) => [
        ...prev,
        { sender: "bot", text: "Lo siento, hubo un error. Intenta de nuevo." },
      ]);
      // Mostrar notificación de error
      setSnackbarMessage("Hubo un error al procesar tu solicitud.");
      setOpenSnackbar(true);
    } finally {
      setLoading(false);
      setMessage(""); // Limpiar el campo de entrada
    }
  };

  // Scroll automático para mostrar el último mensaje
  useEffect(() => {
    const chatContainer = document.querySelector(".chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [responses]);

  // Cerrar el Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      {/* Botón flotante para abrir el chat */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          left: "20px",
          zIndex: 1000,
        }}
      >
        <IconButton
          onClick={() => setIsOpen(!isOpen)}
          sx={{
            backgroundColor: "#FF5722",
            color: "#fff",
            "&:hover": { backgroundColor: "#d32f2f" },
          }}
        >
          {isOpen ? <CloseIcon /> : <ChatIcon />}
        </IconButton>
      </Box>

      {/* Chatbot */}
      {isOpen && (
        <Paper
          elevation={3}
          sx={{
            position: "fixed",
            bottom: "80px",
            left: "20px",
            width: "400px",
            maxHeight: "600px",
            display: "flex",
            flexDirection: "column",
            borderRadius: "16px",
            overflow: "hidden",
            zIndex: 1000,
          }}
        >
          {/* Título del Chatbot */}
          <Box
            sx={{
              backgroundColor: "#FF5722",
              color: "#fff",
              padding: "1rem",
              textAlign: "center",
              borderTopLeftRadius: "16px",
              borderTopRightRadius: "16px",
            }}
          >
            <Typography variant="h6">RESTBOT</Typography>
          </Box>

          {/* Área de visualización de mensajes */}
          <Box
            className="chat-container"
            sx={{
              flexGrow: 1,
              maxHeight: "400px",
              overflowY: "auto",
              padding: "1rem",
              backgroundColor: "#f9f9f9",
            }}
          >
            <List>
              {responses.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    display: "flex",
                    justifyContent: msg.sender === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <Box
                    sx={{
                      maxWidth: "70%",
                      padding: "0.5rem 1rem",
                      borderRadius: "16px",
                      backgroundColor:
                        msg.sender === "user" ? "#007bff" : "#e9ecef",
                      color: msg.sender === "user" ? "#fff" : "#000",
                    }}
                  >
                    <Typography variant="subtitle2">
                      {msg.sender === "user" ? "Tú:" : "RestBot:"}
                    </Typography>
                    <Typography variant="body2">{msg.text}</Typography>
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Campo de entrada y botón de envío */}
          <Box
            sx={{
              display: "flex",
              gap: "0.5rem",
              padding: "1rem",
              borderTop: "1px solid #ddd",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              fullWidth
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe un mensaje..."
              size="small"
              variant="outlined"
              disabled={loading}
            />
            <Button
              variant="contained"
              onClick={handleSendMessage}
              disabled={loading}
              sx={{
                backgroundColor: loading ? "#ccc" : "#FF5722",
                "&:hover": { backgroundColor: loading ? "#ccc" : "#d32f2f" },
              }}
            >
              {loading ? "Enviando..." : "Enviar"}
            </Button>
          </Box>
        </Paper>
      )}

      {/* Snackbar para notificaciones */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Chatbot;