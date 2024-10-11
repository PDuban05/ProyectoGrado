// Importing necessary libraries and modules
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice to manage state
import axios from "axios"; // Importing axios for making HTTP requests

// Creating the auth slice using createSlice
const authSlice = createSlice({
  name: "auth", // Name of the slice
  initialState: {
    user: {}, // Initial user state, empty object
    token: null, // Initial token state, null by default
    success: true, // Flag indicating success status
    error: null, // Holds error messages if any
    loading: false, // Indicates whether a login operation is in progress
  },
  reducers: {
    // Reducer to set loading state and clear any previous errors
    loginStart(state) {
      state.loading = true; // Set loading to true
      state.error = null; // Reset error to null
    },
    // Reducer to handle successful login
    loginSuccess(state, action) {
      state.loading = false; // Set loading to false
      state.user = {
        id: action.payload.id, // Store user ID
        firstName: action.payload.firstName, // Store first name
        lastName: action.payload.lastName, // Store last name
        email: action.payload.email, // Store email
        role: action.payload.role, // Store user role
        profilePicture: action.payload.profilePicture, // Store user's profile picture
        isVerified: action.payload.isVerified // Store verification status
      };
      state.token = action.payload.token; // Store the token
      state.success = true; // Indicate success
    },
    // Reducer to handle failed login
    loginFailure(state, action) {
      state.user = {}; // Reset user state
      state.success = false; // Indicate failure
      state.loading = false; // Set loading to false
      state.error = action.payload; // Store error message
    },
    // Reducer to set the token directly
    setToken(state, action) {
      state.token = action.payload; // Update the token
    },
    // Reducer to handle user logout
    logout(state) {
      state.user = null; // Reset user state
      state.token = null; // Reset token
      state.success = false; // Indicate failure
      localStorage.removeItem("authToken"); // Remove token from local storage
      sessionStorage.removeItem("authToken"); // Remove token from session storage
    },
    // Reducer to verify the user
    verifyUser(state) {
      state.user.isVerified = 1; // Update the verification status
    },
  },
});

// Exporting actions for use in components
export const { loginStart, loginSuccess, loginFailure, setToken, verifyUser, logout } = authSlice.actions;

// Async thunk for handling user login
export const loginAuth = (userData) => async (dispatch) => {
  dispatch(loginStart()); // Start login process
  try {
    // Making a POST request to authenticate the user
    const response = await axios.post("http://localhost:3001/authUser", userData);

    if (response.data.success) {
      const token = response.data.user.token; // Extract token from response

      // Check if rememberMe option is selected and store token accordingly
      if (userData.rememberMe) {
        localStorage.setItem("authToken", token); // Store token in local storage
      } else {
        sessionStorage.setItem("authToken", token); // Store token in session storage
      }

      dispatch(loginSuccess(response.data.user)); // Dispatch success action with user data
      dispatch(setToken(response.data.user.token)); // Dispatch action to set token
    } else {
      dispatch(loginFailure(response.data.message)); // Dispatch failure action with error message
      dispatch(logout()); // Log out the user if login fails
    }
  } catch (error) {
    dispatch(loginFailure("Error en el servidor")); // Handle server error
  }
};

// Async thunk for initializing token verification
export const initializeToken = (token) => async (dispatch, getState) => {
  const { success, user } = getState().auth; // Get current state of auth

  try {
    // Making a POST request to validate the token
    const response = await axios.post("http://localhost:3001/ValidarToken", { token });

    if (response.data.success) {
      // If token is valid, check if user is already logged in
      if (success && Object.keys(user).length > 0) {
        return; // User is already logged in, no action needed
      } else {
        // Dispatch login success action with user data from response
        dispatch(loginSuccess({
          id: response.data.user.id,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          email: response.data.user.email,
          token: response.data.user.token,
          role: response.data.user.role,
          profilePicture: response.data.user.profilePicture,
          isVerified: response.data.user.isVerified
        }));
      }
    } else {
      dispatch(loginFailure(response.data.message)); // Dispatch failure action if token is invalid
      dispatch(logout()); // Log out the user
    }
  } catch (error) {
    dispatch(loginFailure("Error en el servidor")); // Handle server error
  }
}

// Exporting the reducer for use in the Redux store
export default authSlice.reducer;
