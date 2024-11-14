// Importing necessary libraries
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for managing slice state
import axios from "axios"; // Importing axios for making HTTP requests

// Initial state of the RegisterCandidate slice
const initialState = {
  success: false, // Indicates whether the registration was successful
  error: null, // Holds any error messages related to registration
  loading: false, // Indicates if a registration request is currently in progress
};

// Creating the RegisterCandidate slice to manage candidate registration state and actions
const RegisterCandidateSlice = createSlice({
  name: "RegisterCandidate", // Name of the slice
  initialState, // Setting the initial state
  reducers: {
    // Action for starting the registration process
    RegisterStart(state) {
      state.loading = true; // Set loading to true when registration starts
      state.error = null; // Reset any previous errors
    },
    // Action for successful registration
    RegisterSuccess(state) {
      state.loading = false; // Set loading to false upon successful registration
      state.success = true; // Mark registration as successful
    },
    // Action for failed registration
    RegisterFailure(state, action) {
      state.success = false; // Mark registration as failed
      state.loading = false; // Set loading to false upon failure
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the slice state to the initial values
    resetState(state) {
      return initialState; // Resetting the state to initial
    },
  },
});

// Exporting actions for use in components
export const { RegisterStart, RegisterSuccess, RegisterFailure, resetState } =
  RegisterCandidateSlice.actions;

// Thunk function for registering a candidate
export const RegisterCandidate = (userData) => async (dispatch) => {
  dispatch(RegisterStart()); // Dispatching the action to indicate registration has started

  console.log(userData); // Logging the user data for debugging purposes
  try {
    // Sending a POST request to the server to register the candidate
    const response = await axios.post(
      "http://localhost:3001/RegisterCandidate",
      userData // userData is sent in the request body
    );
    
    
    // Check if the response indicates success
    if (response.data.success) {
      dispatch(RegisterSuccess()); // Dispatch success action if registration is successful
    } else {
      dispatch(RegisterFailure(response.data.message)); // Dispatch failure action with the error message from the server
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(RegisterFailure("Error en el servidor")); // Dispatch failure action with a server error message
  }
};

// Exporting the reducer to be used in the Redux store
export default RegisterCandidateSlice.reducer;
