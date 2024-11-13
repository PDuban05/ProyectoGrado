// Importing necessary libraries
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice from Redux Toolkit for easy state management
import axios from "axios"; // Importing axios to facilitate HTTP requests

// Defining the initial state of the update campaign slice
const initialState = {
  success: false, // Indicates whether the campaign update was successful
  error: null, // Holds error messages related to the update process
  loading: false, // Indicates if the update request is currently being processed
};

// Creating the update campaign slice to manage campaign-related state
const UpdateCampaignSlice = createSlice({
  name: "updateCampaign", // Name of the slice for identification
  initialState, // Setting the initial state defined above
  reducers: {
    // Action dispatched when the campaign update process starts
    UpdateStart(state) {
      state.loading = true; // Set loading to true when the process begins
      state.error = null; // Clear any previous errors
      state.success = false; // Reset success to false at the start
    },
    // Action dispatched when the campaign update is successful
    UpdateSuccess(state) {
      state.loading = false; // Set loading to false upon successful update
      state.success = true; // Mark the update as successful
    },
    // Action dispatched when the campaign update fails
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
export const { UpdateStart, UpdateSuccess, UpdateFailure, resetState } = UpdateCampaignSlice.actions;

// Thunk function to handle the campaign update process
export const UpdateCampaign = (DataCampaign) => async (dispatch) => {
  dispatch(UpdateStart()); // Dispatching action to indicate the process has started
      console.log(DataCampaign)
  try {
    // Making a POST request to update the campaign data
    const response = await axios.post("http://localhost:3001/updateCampaign", DataCampaign);
      console.log(response)
    // Checking if the response indicates success
    if (response.data.success) {
      dispatch(UpdateSuccess()); // Dispatch success action if the update is successful
    } else {
      dispatch(UpdateFailure(response.data.message)); // Dispatch failure action with the error message
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(UpdateFailure("Error en el servidor")); // Dispatch failure action with a server error message
  }
};

// Thunk function to handle the update of approved and unapproved candidates
export const UpdateCandidates = (approvedCandidates, unapprovedCandidates) => async (dispatch) => {
  dispatch(UpdateStart()); // Dispatching action to indicate the candidate update process has started

  try {
    // Making a POST request to update candidate data
    const response = await axios.post("http://localhost:3001/updateCandidate", {
      approvedCandidates: approvedCandidates, // Sending approved candidates data
      unapprovedCandidates: unapprovedCandidates, // Sending unapproved candidates data
    });

    // Checking if the response indicates success
    if (response.data.success) {
      dispatch(UpdateSuccess()); // Dispatch success action if the candidate update is successful
      console.log("yei")

    } else {
      dispatch(UpdateFailure(response.data.message)); // Dispatch failure action with the error message
    }
  } catch (error) {
    // Catching any errors that occur during the request
    dispatch(UpdateFailure("Error en el servidor")); // Dispatch failure action with a server error message
  }
};

// Exporting the reducer to be included in the Redux store
export default UpdateCampaignSlice.reducer;
