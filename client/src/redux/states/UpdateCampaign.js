import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const UpdateCampaignSlice = createSlice({
  name: "updateCampaign",
  initialState,
  reducers: {
    UpdateStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    UpdateSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    UpdateFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { UpdateStart, UpdateSuccess, UpdateFailure, resetState } =
  UpdateCampaignSlice.actions;

export const UpdateCampaign = (DataCampaign) => async (dispatch) => {
  dispatch(UpdateStart());

  try {
    const response = await axios.post(
      "http://localhost:3001/updateCampaign",
      DataCampaign
    );

    if (response.data.success) {
      dispatch(UpdateSuccess());
    } else {
      dispatch(UpdateFailure(response.data.message));
    }
  } catch (error) {
    dispatch(UpdateFailure("Error en el servidor"));
  }
};

export const UpdateCandidates =
  (approvedCandidates, unapprovedCandidates) => async (dispatch) => {
    dispatch(UpdateStart());
    try {
      const response = await axios.post(
        "http://localhost:3001/updateCandidate",
        {
          approvedCandidates: approvedCandidates,
          unapprovedCandidates: unapprovedCandidates,
        }
      );

      if (response.data.success) {
        dispatch(UpdateSuccess());
      } else {
        dispatch(UpdateFailure(response.data.message));
      }
    } catch (error) {
      dispatch(UpdateFailure("Error en el servidor"));
    }
  };

// Exporta el reducer
export default UpdateCampaignSlice.reducer;
