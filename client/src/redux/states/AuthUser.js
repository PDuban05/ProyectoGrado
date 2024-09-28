// src/redux/states/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user:{},
    token: null,
    success: true,
    error: null,
    loading: false,
  },
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action) {
      state.loading = false;
      state.user = {
        id: action.payload.id,
        firstName: action.payload.firstName,
        lastName: action.payload.lastName,
        email: action.payload.email,
        role: action.payload.role,
        profilePicture:action.payload.profilePicture,
        isVerified: action.payload.isVerified

      };
      state.token = action.payload.token;
      state.success = true;
    },
    loginFailure(state, action) {
      state.user = {},
      state.success= false;
      state.loading = false;
      state.error = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.success=false;
      localStorage.removeItem("authToken");
      sessionStorage.removeItem("authToken");
    },
    verifyUser(state) {
      state.user.isVerified = 1; // Actualiza isVerified a 1
    },
  
  },
});

export const { loginStart, loginSuccess, loginFailure, setToken,verifyUser, logout } =
  authSlice.actions;
  
export const loginAuth = (userData) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const response = await axios.post(
      "http://localhost:3001/authUser",
      userData
    );

    if (response.data.success) {
      const token = response.data.user.token; // Suponiendo que el token se devuelve como parte de user

      // Verificar la opción "rememberMe" y almacenar el token de forma adecuada
      if (userData.rememberMe) {
        localStorage.setItem("authToken", token);
      } else {
        sessionStorage.setItem("authToken", token); // Almacenar en sessionStorage
      }

      dispatch(loginSuccess(response.data.user));
      dispatch(setToken(response.data.user.token))
    } else {
      dispatch(loginFailure(response.data.message));
      dispatch(logout())
    }
  } catch (error) {
    dispatch(loginFailure("Error en el servidor"));
  }
};

export const initializeToken = (token) => async (dispatch, getState) => {
  const { success, user } = getState().auth; // Obtén el estado actual de success


  try {
    const response = await axios.post(
      "http://localhost:3001/ValidarToken",
      { token }
    );
   
  
    if (response.data.success) {
      if (success && Object.keys(user).length > 0 ) {
        return;
      }else{
        dispatch(loginSuccess({
        id: response.data.user.id,
        firstName: response.data.user.firstName,
        lastName: response.data.user.lastName,
        email: response.data.user.email,
        token: response.data.user.token,
        role:response.data.user.role,
        profilePicture: response.data.user.profilePicture,
        isVerified: response.data.user.isVerified
      }));
   
      }
      
    } else {
      dispatch(loginFailure(response.data.message));
      dispatch(logout())
     console.log(response)
    }
  } catch (error) {
    dispatch(loginFailure("Error en el servidor"));
  }
}

export default authSlice.reducer;
