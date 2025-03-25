import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, onAuthStateChanged } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // Importar funciones de Firestore
import { db } from "../firebase/firebaseConfig"; // Importar la instancia de Firestore

// Crear el contexto de autenticación
const AuthContext = createContext();

// Hook personalizado para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Obtener los datos adicionales del usuario desde Firestore
          const userDocRef = doc(db, "users", currentUser.uid); // Referencia al documento del usuario
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            setUser({ ...currentUser, role: userData.role }); // Agregar el rol al estado del usuario
          } else {
            setUser(null); // Limpiar el estado si no hay datos en Firestore
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error.message);
          setUser(null); // Limpiar el estado en caso de error
        }
      } else {
        setUser(null); // Limpiar el estado si no hay usuario autenticado
      }
      setLoading(false); // Finalizar la carga
    });

    return unsubscribe; // Limpiar el listener cuando el componente se desmonte
  }, []);

  const value = { user }; // Valor del contexto

  return (
    <AuthContext.Provider value={value}>
      {!loading && children} {/* Renderizar los hijos solo cuando termine la carga */}
    </AuthContext.Provider>
  );
};