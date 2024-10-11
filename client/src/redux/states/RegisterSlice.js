// Importing necessary libraries
import { createSlice } from '@reduxjs/toolkit'; // Importing createSlice from Redux Toolkit for slice creation
import axios from 'axios'; // Importing axios for making HTTP requests

// Defining the initial state of the user slice
const initialState = {
  success: false, // Indicates whether the user addition was successful
  error: null, // Holds any error messages related to the addition process
  loading: false, // Indicates if a user addition request is currently in progress
};

// Creating the user slice to manage user-related actions and state
const userSlice = createSlice({
  name: 'user', // Name of the slice
  initialState, // Setting the initial state defined above
  reducers: {
    // Action dispatched when user addition starts
    addUserStart(state) {
      state.loading = true; // Set loading to true when the process begins
      state.success = false; // Reset success to false at the start
      state.error = null; // Clear any previous errors
    },
    // Action dispatched when user addition is successful
    addUserSuccess(state) {
      state.loading = false; // Set loading to false upon successful addition
      state.success = true; // Mark the addition as successful
      state.error = null; // Clear any errors
    },
    // Action dispatched when user addition fails
    addUserFailure(state, action) {
      state.loading = false; // Set loading to false when the addition fails
      state.success = false; // Mark the addition as unsuccessful
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the user slice state to its initial values
    resetUserState(state) {
      Object.assign(state, initialState); // Resetting the state to initial values
    },
  },
});

// Exporting actions for use in components
export const { addUserStart, addUserSuccess, addUserFailure, resetUserState } = userSlice.actions;

// Exporting the reducer to be included in the Redux store
export default userSlice.reducer;

// Thunk function to handle the user addition process
export const addUser = (userData) => async (dispatch) => {
  try {
    dispatch(addUserStart()); // Dispatching the action to indicate the process has started
    // Making a POST request to add a new user
    const response = await axios.post("http://localhost:3001/addUser", userData);
    // Checking if the response indicates success
    if (response.data.success) {
      dispatch(addUserSuccess()); // Dispatch success action if addition is successful
    } else {
      dispatch(addUserFailure(response.data.message)); // Dispatch failure action with the error message
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(addUserFailure("Error al conectar con el servidor")); // Dispatch failure action with a server error message
  }
};
