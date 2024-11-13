// userSlice.test.js
import { expect, test } from 'vitest';
import userReducer from './RegisterSlice';
import { addUser } from './RegisterSlice';
import { configureStore } from '@reduxjs/toolkit';

// Configura una tienda de prueba
const store = configureStore({
    reducer: {
      user: userReducer,
    },
  });
  
  // Datos de usuario sintéticos
  const mockUserData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dni: "12345678",
    password: "password123!",
  };
  
  // Ejemplo de prueba para la acción addUser
  test('should dispatch addUser and change success state', async () => {
    // Despacha la acción addUser con los datos sintéticos
    await store.dispatch(addUser(mockUserData));
  
    // Verifica si el estado de éxito ha cambiado a true
    const state = store.getState().user;
    expect(state.success).toBe(true);
  });