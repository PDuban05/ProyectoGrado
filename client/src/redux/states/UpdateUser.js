// Importing necessary libraries
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for easier state management
import axios from "axios"; // Importing axios for making HTTP requests

// Defining the initial state of the update user slice
const initialState = {
  success: false, // Indicates if the user update was successful
  error: null, // Holds error messages encountered during the update process
  loading: false, // Indicates if the update request is currently in progress
};

// Creating the update user slice to manage user-related state
const UpdateSlice = createSlice({
  name: "updateUser", // Name of the slice for identification
  initialState, // Setting the initial state defined above
  reducers: {
    // Action dispatched when the user update process starts
    UpdateStart(state) {
      state.loading = true; // Set loading to true when the update process begins
      state.error = null; // Clear any previous error messages
    },
    // Action dispatched when the user update is successful
    UpdateSuccess(state) {
      state.loading = false; // Set loading to false upon successful update
      state.success = true; // Mark the update as successful
    },
    // Action dispatched when the user update fails
    UpdateFailure(state, action) {
      state.loading = false; // Set loading to false when the update fails
      state.success = false; // Mark the update as unsuccessful
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the state back to its initial values
    resetState(state) {
      return initialState; // Resetting the state to initial values
    },
  },
});

// Exporting actions for use in components
export const { UpdateStart, UpdateSuccess, UpdateFailure, resetState } = UpdateSlice.actions;

// Thunk function to handle the user update process
export const UpdateUser = (userData) => async (dispatch) => {
  dispatch(UpdateStart()); // Dispatching action to indicate the update process has started

  try {
    // Making a POST request to update user information
    const response = await axios.post("http://localhost:3001/UpdateUserInf", userData);
    
    // Checking if the response indicates success
    if (response.data.success) {
      // Logging the response for debugging purposes
      dispatch(UpdateSuccess()); // Dispatch success action if the update is successful
    } else {
      dispatch(UpdateFailure(response.data.message)); // Dispatch failure action with the error message
     
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(UpdateFailure("Error en el servidor")); // Dispatch failure action with a server error message
  }
};

// Exporting the reducer to be included in the Redux store
export default UpdateSlice.reducer;


// {
//   person_id: 54,
//   national_id_number: '1005564237',
//   first_name: 'pedro',
//   last_name: 'moreno',
//   date_of_birth: '2024-11-11',
//   gender: 7,
//   phone_number: '3163219567',
//   address: 'calle 11a-25-60',
//   city: 216039,
//   state: 972,
//   country: 114,
//   profile_picture_url: '',
//   occupation: 1,
//   education_level: 16,
//   marital_status: 1,
//   program: 1
// }