// Importing necessary libraries
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for easier state management
import axios from "axios"; // Importing axios for making HTTP requests

// Creating the vote slice to manage the voting state
const voteSlice = createSlice({
  name: "vote", // Name of the slice for identification
  initialState: {
    success: false, // Indicates if the voting request was successful
    error: null, // Holds any error messages encountered during the voting process
    loading: false, // Indicates if the voting request is currently in progress
  },
  reducers: {
    // Action dispatched when the voting process starts
    VoteStart(state) {
      state.loading = true; // Set loading to true when voting process begins
      state.error = null; // Clear any previous error messages
      state.success = false; // Reset success status to false
    },
    // Action dispatched when the voting request is successful
    VoteSuccess(state) {
      state.loading = false; // Set loading to false upon successful voting
      state.success = true; // Mark the voting request as successful
    },
    // Action dispatched when the voting request fails
    VoteFailure(state, action) {
      state.loading = false; // Set loading to false when the request fails
      state.error = action.payload; // Store the error message from the action payload
    },
    // Action to reset the voting state
    ResetState(state) {
      state.success = false; // Reset success status to false
      state.error = null; // Clear error messages
    },
  },
});

// Exporting actions for use in components
export const { VoteStart, VoteSuccess, VoteFailure, ResetState } = voteSlice.actions;

// Thunk function to handle voting logic
export const VoteAuth = (vote) => async (dispatch) => {
  const { selectedCandidate, user } = vote; // Destructuring the vote object to get selected candidate and user


  // Start the voting process by dispatching VoteStart action
  dispatch(VoteStart()); 

  try {
    // Making a POST request to register the vote
    const response = await axios.post("http://localhost:3001/registervote", {
      infVote: selectedCandidate, // Sending selected candidate information
      user: user, // Sending user information
    });

    console.log(response.data.success); // Logging the success status from the response

    // Check if the vote was registered successfully
    if (response.data.success === true) {
      dispatch(VoteSuccess()); // Dispatch success action if the vote was successful
      console.log(response); // Logging the response for debugging

    } else {
      dispatch(VoteFailure(response.data.message)); // Dispatch failure action with the error message
    }

  } catch (error) {
    
    console.log(error); // Logging the error for debugging purposes
  }
};

// Exporting the reducer to be included in the Redux store
export default voteSlice.reducer;
