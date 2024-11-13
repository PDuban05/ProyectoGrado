// Importing necessary libraries
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for simplified state management
import axios from "axios"; // Importing axios for making HTTP requests

// Defining the initial state of the VerifyUser slice
const initialState = {
  success: false, // Indicates if the email verification request was successful
  error: null, // Holds any error messages encountered during the email verification process
  loading: false, // Indicates if the email verification request is currently in progress
};

// Creating the VerifyUser slice to manage user verification state
const VerifyUserSlice = createSlice({
  name: "VerifyUser", // Name of the slice for identification
  initialState, // Setting the initial state defined above
  reducers: {
    // Action dispatched when the email verification process starts
    SendEmailStart(state) {
      state.loading = true; // Set loading to true when the email verification process begins
      state.error = null; // Clear any previous error messages
    },
    // Action dispatched when the email verification request is successful
    EmailSuccess(state) {
      state.loading = false; // Set loading to false upon successful email sending
      state.success = true; // Mark the email verification request as successful
    },
    // Action dispatched when the email verification request fails
    EmailFailure(state, action) {
      state.loading = false; // Set loading to false when the request fails
      state.success = false; // Mark the email verification request as unsuccessful
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the state back to its initial values
    resetState(state) {
      return initialState; // Resetting the state to initial values
    },
  },
});

// Exporting actions for use in components
export const { SendEmailStart, EmailSuccess, EmailFailure, resetState } = VerifyUserSlice.actions;

// Thunk function to handle sending the verification code
export const SendCode = (userData) => async (dispatch) => {
  dispatch(SendEmailStart()); // Dispatching action to indicate the email verification process has started
    console.log(userData)
  try {
    // Making a POST request to send the verification code to the specified email
    const response = await axios.post(
      "http://localhost:3001/send-verification-code",
      { email: userData }
    );

    // Checking if the response indicates success
    if (response.data.success) {
      dispatch(EmailSuccess()); // Dispatch success action if the email was sent successfully
    } else {
      dispatch(EmailFailure(response.data.message)); // Dispatch failure action with the error message
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(EmailFailure("Error en el servidor")); // Dispatch failure action with a server error message
  }
};

// Exporting the reducer to be included in the Redux store
export default VerifyUserSlice.reducer;
