import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const UpdateSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {
    UpdateStart(state) {
      state.loading = true;
      state.error = null;
    },
    UpdateSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    UpdateFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { UpdateStart, UpdateSuccess, UpdateFailure, resetState } =
  UpdateSlice.actions;

export const UpdateUser = (userData) => async (dispatch) => {
  dispatch(UpdateStart());

 
  try {
    const response = await axios.post(
      "http://localhost:3001/UpdateUserInf",
      userData
    );

    if (response.data.success) {

      console.log(response)
      dispatch(UpdateSuccess());
      
    } else {
      dispatch(UpdateFailure(response.data.message));
    }
  } catch (error) {
    dispatch(UpdateFailure("Error en el servidor"));
  }
};

// Exporta el reducer
export default UpdateSlice.reducer;
