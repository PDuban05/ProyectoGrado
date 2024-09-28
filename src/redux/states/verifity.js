import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const VerifyUserSlice = createSlice({
  name: "VerifyUser",
  initialState,
  reducers: {
    SendEmailStart(state) {
      state.loading = true;
      state.error = null;
    },
    EmailSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    EmailFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { SendEmailStart, EmailSuccess, EmailFailure, resetState } =
  VerifyUserSlice.actions;

export const SendCode = (userData) => async (dispatch) => {
  dispatch(SendEmailStart());
  try {
    const response = await axios.post(
      "http://localhost:3001/send-verification-code",
      { email: userData }
    );

    if (response.data.success) {
      dispatch(EmailSuccess());
    } else {
      dispatch(EmailFailure(response.data.message));
    }
  } catch (error) {
    dispatch(EmailFailure("Error en el servidor"));
  }
};



// Exporta el reducer
export default VerifyUserSlice.reducer;
