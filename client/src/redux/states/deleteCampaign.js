// Importing necessary libraries and modules
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice for managing slice state
import axios from "axios"; // Importing axios for making HTTP requests

// Initial state for the delete campaign slice
const initialState = {
  success: false, // Indicates whether the campaign deletion was successful
  error: null, // Holds error messages, if any occur during campaign deletion
  loading: false, // Indicates whether a delete operation is in progress
};

// Creating the delete campaign slice using createSlice
const DeleteCampaignSlice = createSlice({
  name: "deleteCampaign", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to initiate the deletion of a campaign
    deleteStart(state) {
      state.loading = true; // Set loading to true to indicate the process has started
      state.error = null; // Reset any previous error
      state.success = false; // Reset success flag to false
    },
    // Reducer to handle successful campaign deletion
    deleteSuccess(state) {
      state.loading = false; // Set loading to false as the process has completed successfully
      state.success = true; // Mark the campaign deletion as successful
    },
    // Reducer to handle failure in campaign deletion
    deleteFailure(state, action) {
      state.success = false; // Set success to false as the operation failed
      state.loading = false; // Set loading to false as the process has completed
      state.error = action.payload; // Store the error message returned from the server
    },
    // Reset the state back to the initial state
    resetState(state) {
      return initialState; // Reset to the initial state defined above
    },
  },
});

// Exporting actions for use in components
export const { deleteStart, deleteSuccess, deleteFailure, resetState } =
  DeleteCampaignSlice.actions;

// Async thunk for deleting a campaign
export const DeleteCampaign = (CampaignId) => async (dispatch) => {
  dispatch(deleteStart()); // Dispatch action to indicate campaign deletion has started
  console.log(CampaignId); // Log the campaign ID for debugging purposes

  try {
    // Sending a POST request to delete the campaign from the server
    const response = await axios.post("http://localhost:3001/deleteCampaign", {
      campaign_Id: CampaignId, // Sending the campaign ID in the request body
    });

    console.log(response); // Log the response from the server for debugging

    // Check if the deletion was successful based on server response
    if (response.data.success) {
      dispatch(deleteSuccess()); // Dispatch success action if deletion was successful
    } else {
      dispatch(deleteFailure(response.data.message)); // Dispatch failure action with error message
    }
  } catch (error) {
    console.error("Error deleting the campaign:", error); // Log any errors that occur during campaign deletion
    dispatch(deleteFailure("An error occurred while deleting the campaign.")); // Dispatch failure action for unexpected errors
  }
};

// Exporting the reducer for use in the Redux store
export default DeleteCampaignSlice.reducer;
