// src/redux/slices/emailSlice.js
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";



const initialState = {
  loading: false,
  error: null,
  success: false, // Éxito para el envío del correo
  codeVerificationSuccess: false, // Éxito para la validación del código
  codeVerificationError: null, // Error para la validación del código
  userInfo: null, // Información del usuario después de la verificación
  passwordChangeSuccess: false, // Éxito para el cambio de contraseña
  passwordChangeError: null, // Error para el cambio de contraseña
};

// Slice para manejar el estado del email, la validación del código y almacenar la información del usuario
const emailSlice = createSlice({
  name: "passrecover",
  initialState,
  reducers: {
    // Acciones para enviar el correo electrónico
    sendVerificationEmailStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    sendVerificationEmailSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    sendVerificationEmailFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    // Acciones para validar el código de verificación
    verifyCodeStart(state) {
      state.loading = true;
      state.codeVerificationError = null;
      state.codeVerificationSuccess = false;
    },
    verifyCodeSuccess(state, action) {
      state.loading = false;
      state.codeVerificationSuccess = true;
      state.userInfo = action.payload; // Guardar la información del usuario en el estado
    },
    verifyCodeFailure(state, action) {
      state.loading = false;
      state.codeVerificationError = action.payload;
      state.codeVerificationSuccess = false;
      state.userInfo = null;
    },

    changePasswordStart(state) {
      state.loading = true;
      state.passwordChangeError = null;
      state.passwordChangeSuccess = false;
    },
    changePasswordSuccess(state) {
      state.loading = false;
      state.passwordChangeSuccess = true;
    },
    changePasswordFailure(state, action) {
      state.loading = false;
      state.passwordChangeError = action.payload;
      state.passwordChangeSuccess = false;
    },

    resetAllStates(state) {
      Object.assign(state, initialState);// Retornando el estado inicial para resetearlo
    },
  },
});

// Acciones generadas automáticamente por createSlice
export const {
  sendVerificationEmailStart,
  sendVerificationEmailSuccess,
  sendVerificationEmailFailure,
  verifyCodeStart,
  verifyCodeSuccess,
  verifyCodeFailure,
  changePasswordStart,
  changePasswordSuccess,
  changePasswordFailure,
  resetAllStates,
} = emailSlice.actions;

export default emailSlice.reducer;

// Función para enviar el correo electrónico
export const sendVerificationEmail = (email) => async (dispatch) => {
  dispatch(sendVerificationEmailStart());

  

  try {
    const response = await axios.post(
      "http://localhost:3001/send-verification-code",
      email
    );
    if (response.data.success) {
      dispatch(sendVerificationEmailSuccess());
    } else {
      dispatch(sendVerificationEmailFailure(response.data.message));
    }
  } catch (error) {
    dispatch(sendVerificationEmailFailure(error.message));
    return error;
  }
};

// Función para validar el código de verificación y guardar la información del usuario
export const verifyCode = (code) => async (dispatch) => {
  dispatch(verifyCodeStart());
  try {
    const response = await axios.post(
      "http://localhost:3001/verify-code",
      { code }
    );
    
    if (response.data.success) {
      dispatch(verifyCodeSuccess(response.data.user)); // Suponiendo que la respuesta contenga la información del usuario bajo `response.data.user`
    } else {
      dispatch(verifyCodeFailure(response.data.message));
    }

    return response;
  } catch (error) {
    dispatch(verifyCodeFailure(error.message));
    return error;
  }
};




// Función para cambiar la contraseña
export const changePassword = (newPassword) => async (dispatch, getState) => {
  dispatch(changePasswordStart());

  const { user_id } = getState().passrecover.userInfo;

  console.log(user_id, newPassword)
  try {
    const response = await axios.post(
      "http://localhost:3001/change-password",
      {
        userId: user_id, // Suponiendo que el ID del usuario está en userInfo.id
        newPassword: newPassword,
      }
    );
console.log(response)
    if (response.data.success) {
      dispatch(changePasswordSuccess());
    } else {
      dispatch(changePasswordFailure(response.data.message));
    }
  } catch (error) {
    dispatch(changePasswordFailure(error.message));
    return error;
  }
};
