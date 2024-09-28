// src/redux/states/campaignSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const campaignSlice = createSlice({
  name: "campaign",
  initialState: {
    campaigns: null,
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    fetchCampaignsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchCampaignsSuccess(state, action) {
      state.loading = false;
      state.campaigns = action.payload;  // Asigna directamente los datos a 'campaigns'
      state.success = true;
    },
    fetchCampaignsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchCampaignsStart,
  fetchCampaignsSuccess,
  fetchCampaignsFailure,
} = campaignSlice.actions;

export const fetchCampaigns = () => async (dispatch) => {
  dispatch(fetchCampaignsStart());
  try {
    const response = await axios.post("http://localhost:3001/fetchCampaigns");

    if (response.data.success) {
      dispatch(fetchCampaignsSuccess(response.data.results));  // Pasa los datos directamente
      
    } else {
      dispatch(fetchCampaignsFailure(response.data.message));
    }
  } catch (error) {
    dispatch(fetchCampaignsFailure("Error en el servidor"));
  }
};

export default campaignSlice.reducer;
