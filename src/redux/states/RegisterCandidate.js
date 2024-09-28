import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const RegisterCandidateSlice = createSlice({
  name: "RegisterCandidate",
  initialState,
  reducers: {
    RegisterStart(state) {
      state.loading = true;
      state.error = null;
    },
    RegisterSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    RegisterFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { RegisterStart, RegisterSuccess, RegisterFailure, resetState } =
  RegisterCandidateSlice.actions;

export const RegisterCandidate = (userData) => async (dispatch) => {
  dispatch(RegisterStart());

  console.log(userData);
  try {
    const response = await axios.post(
      "http://localhost:3001/RegisterCandidate",
      userData
    );
    
    if (response.data.success) {
      dispatch(RegisterSuccess());
      
    } else {
      dispatch(RegisterFailure(response.data.message));
    }
  } catch (error) {
    dispatch(RegisterFailure("Error en el servidor"));
  }
};

// Exporta el reducer
export default  RegisterCandidateSlice.reducer;
