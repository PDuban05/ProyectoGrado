// Importing necessary libraries and modules
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice for managing slice state
import axios from "axios"; // Importing axios for making HTTP requests

// Creating the campaign slice using createSlice
const campaignSlice = createSlice({
  name: "campaign", // Name of the slice
  initialState: {
    campaigns: null, // Initial state for campaigns, null indicates no data yet
    success: false, // Flag indicating success status of fetching campaigns
    error: null, // Holds error messages if any occur during fetching
    loading: false, // Indicates whether a fetch operation is in progress
  },
  reducers: {
    // Reducer to initiate the fetching of campaigns
    fetchCampaignsStart(state) {
      state.loading = true; // Set loading to true to indicate fetch operation has started
      state.error = null; // Reset error to null before starting the fetch
    },
    // Reducer to handle successful fetching of campaigns
    fetchCampaignsSuccess(state, action) {
      state.loading = false; // Set loading to false as fetching is complete
      state.campaigns = action.payload; // Assign the fetched data directly to 'campaigns'
      state.success = true; // Mark the fetch operation as successful
    },
    // Reducer to handle failed fetching of campaigns
    fetchCampaignsFailure(state, action) {
      state.loading = false; // Set loading to false as fetching has finished
      state.error = action.payload; // Store the error message returned from the server
    },
  },
});

// Exporting actions for use in components
export const {
  fetchCampaignsStart,
  fetchCampaignsSuccess,
  fetchCampaignsFailure,
} = campaignSlice.actions;

// Async thunk for fetching campaigns from the server
export const fetchCampaigns = () => async (dispatch) => {
  dispatch(fetchCampaignsStart()); // Dispatch action to indicate fetching has started
  try {
    // Making a POST request to fetch campaigns
    const response = await axios.get("http://localhost:3001/fetchCampaigns");

    if (response.data.success) {
      // If the fetch is successful, dispatch success action with the fetched results
      dispatch(fetchCampaignsSuccess(response.data.results)); // Pass the data directly to success action
    } else {
      // If the fetch is not successful, dispatch failure action with the error message
      dispatch(fetchCampaignsFailure(response.data.message));
    }
  } catch (error) {
    // Handle server error by dispatching failure action
    dispatch(fetchCampaignsFailure("Error en el servidor")); // Dispatch failure action with a generic server error message
  }
};

// Exporting the reducer for use in the Redux store
export default campaignSlice.reducer;
