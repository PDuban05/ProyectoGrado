import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const DeleteCampaignSlice = createSlice({
  name: "deleteCampaign",
  initialState,
  reducers: {
    deleteStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    deleteSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    deleteFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { deleteStart, deleteSuccess, deleteFailure, resetState } =
  DeleteCampaignSlice.actions;

export const DeleteCampaign = (CampaignId) => async (dispatch) => {
  dispatch(deleteStart());
  console.log(CampaignId);

  try {
    // Crear campaña
    const response = await axios.post("http://localhost:3001/deleteCampaign", {
      campaign_Id: CampaignId,
    });

    console.log(response)

   
  } catch (error) {
    console.error("Error al eliminar la campaña:", error);
  }
};

// Exporta el reducer
export default DeleteCampaignSlice.reducer;
