// userSlice.test.js
import { configureStore } from '@reduxjs/toolkit';
import { expect, test } from 'vitest';
import LoginReducer from './AuthUser';
import { loginAuth } from './AuthUser';

// Configura una tienda de prueba
const store = configureStore({
    reducer: {
      auth: LoginReducer,
    },
  });
  
  // Datos de usuario sintéticos
  const mockUserData = {
    email: "pedroporras641@gmail.com",
    password: "Angeli200@",
    rememberMe: false,
    userType: "student", 
  };
  
  // Ejemplo de prueba para la acción addUser
  test('should dispatch loginAuth and change success state', async () => {
    // Despacha la acción addUser con los datos sintéticos
    await store.dispatch(loginAuth(mockUserData));
  
    // Verifica si el estado de éxito ha cambiado a true
    const state = store.getState().auth;
    expect(state.success).toBe(true);
  });