import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  success: false,
  error: null,
  loading: false,
};

const CreateCampaignSlice = createSlice({
  name: "createCampaign",
  initialState,
  reducers: {
    CreateStart(state) {
      state.loading = true;
      state.error = null;
      state.success = false;
    },
    CreateSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    CreateFailure(state, action) {
      state.success = false;
      state.loading = false;
      state.error = action.payload;
    },
    resetState(state) {
      return initialState; // Volver al estado inicial
    },
  },
});

export const { CreateStart, CreateSuccess, CreateFailure, resetState } =
  CreateCampaignSlice.actions;

export const CreateCampaign = (DataCampaign) => async (dispatch) => {
  dispatch(CreateStart());
  console.log(DataCampaign);

  try {
    // Crear campaña
    const response = await axios.post("http://localhost:3001/CreateCampaign", {
      Data: DataCampaign,
    });

    if (response.data.success) {
      const { campaignId } = response.data;

      console.log(campaignId);

      // Verificar si hay una imagen para subir
      if (DataCampaign.uploadImage != "") {
        try {
          // Crear un FormData para enviar la imagen al servidor
          const imageData = new FormData();
          imageData.append("file", DataCampaign.uploadImage);

          // Realizar la solicitud para subir la imagen
          const uploadResponse = await axios.post(
            `http://localhost:3001/upload/${campaignId}/campaign`,
            imageData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          console.log("Upload Response:", uploadResponse);

          if (uploadResponse.data.success) {
            // Actualizar el campo 'imageUrl' en el objeto updatedCampaign
            const imageUrl = uploadResponse.data.imageUrl;

            const Response = await axios.post(
              `http://localhost:3001/updateCampaignImage`,
              { imageUrl: imageUrl, campaignId: campaignId }
            );

            console.log(Response)

            if (Response.data.success) {
              dispatch(CreateSuccess());
            } else {
              dispatch(CreateFailure(Response.data.message));
            }

            // Aquí puedes actualizar el estado o realizar otras acciones si es necesario
          } else {
            console.error(
              "Error al subir la imagen:",
              uploadResponse.data.message
            );
          }
        } catch (uploadError) {
          console.error("Error al subir la imagen:", uploadError);
        }
      } else {
        dispatch(CreateSuccess());
      }
    } else {
      console.error("Error al crear la campaña:", response.data.message);
    }
  } catch (error) {
    console.error("Error al crear la campaña:", error);
  }
};

// Exporta el reducer
export default CreateCampaignSlice.reducer;
