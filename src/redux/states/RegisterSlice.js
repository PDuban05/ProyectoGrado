import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUserStart(state) {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    addUserSuccess(state) {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    addUserFailure(state, action) {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    },
    resetUserState(state) {
      Object.assign(state, initialState);// Retornando el estado inicial para resetearlo
    },
  },
});

// Exportar las acciones y el reducer
export const { addUserStart, addUserSuccess, addUserFailure, resetUserState } = userSlice.actions;
export default userSlice.reducer;

export const addUser = (userData) => async (dispatch) => {
  try {
    dispatch(addUserStart());
    const response = await axios.post("http://localhost:3001/addUser", userData);
    if (response.data.success) {
      dispatch(addUserSuccess());
    } else {
      dispatch(addUserFailure(response.data.message));
    }
  } catch (error) {
    dispatch(addUserFailure("Error al conectar con el servidor"));
  }
};
