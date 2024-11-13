// Importing necessary libraries and modules
import { createSlice } from "@reduxjs/toolkit"; // Importing createSlice for managing slice state
import axios from "axios"; // Importing axios for making HTTP requests

// Initial state for the create campaign slice
const initialState = {
  success: false, // Indicates whether the campaign creation was successful
  error: null, // Holds error messages, if any occur during campaign creation
  loading: false, // Indicates whether a create operation is in progress
};

// Creating the create campaign slice using createSlice
const CreateCampaignSlice = createSlice({
  name: "createCampaign", // Name of the slice
  initialState, // Initial state defined above
  reducers: {
    // Reducer to initiate the creation of a campaign
    CreateStart(state) {
      state.loading = true; // Set loading to true to indicate the process has started
      state.error = null; // Reset any previous error
      state.success = false; // Reset success flag to false
    },
    // Reducer to handle successful campaign creation
    CreateSuccess(state) {
      state.loading = false; // Set loading to false as the process has completed successfully
      state.success = true; // Mark the campaign creation as successful
    },
    // Reducer to handle failure in campaign creation
    CreateFailure(state, action) {
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
export const { CreateStart, CreateSuccess, CreateFailure, resetState } =
  CreateCampaignSlice.actions;

// Async thunk for creating a campaign
export const CreateCampaign = (DataCampaign) => async (dispatch) => {
  dispatch(CreateStart()); // Dispatch action to indicate campaign creation has started
  console.log(DataCampaign);

  try {
    // Create campaign by making a POST request to the server
    const response = await axios.post("http://localhost:3001/CreateCampaign", {
      Data: DataCampaign, // Sending the campaign data in the request body
    });

    if (response.data.success) {
      const { campaignId } = response.data; // Extract the campaign ID from the response

      console.log(campaignId); // Log the campaign ID for debugging

      // Check if there is an image to upload
      if (DataCampaign.uploadImage != "") {
        try {
          // Create a FormData object to send the image to the server
          const imageData = new FormData();
          imageData.append("file", DataCampaign.uploadImage); // Append the image file to the FormData

          // Make a request to upload the image
          const uploadResponse = await axios.post(
            `http://localhost:3001/upload/${campaignId}/campaign`, // URL for image upload
            imageData, // FormData containing the image
            {
              headers: {
                "Content-Type": "multipart/form-data", // Set the correct content type for file upload
              },
            }
          );

          console.log("Upload Response:", uploadResponse); // Log the response from the image upload

          if (uploadResponse.data.success) {
            // If image upload was successful, update the campaign's image URL
            const imageUrl = uploadResponse.data.imageUrl; // Get the image URL from the upload response

            // Make a request to update the campaign image in the database
            const Response = await axios.post(
              `http://localhost:3001/updateCampaignImage`,
              { imageUrl: imageUrl, campaignId: campaignId } // Sending the new image URL along with the campaign ID
            );

            console.log(Response); // Log the response from the update image request

            if (Response.data.success) {
              dispatch(CreateSuccess()); // Dispatch success action if the image update was successful
            } else {
              dispatch(CreateFailure(Response.data.message)); // Dispatch failure action with the error message
            }

            // Here you can update the state or perform other actions if needed
          } else {
            console.error("Error uploading image:", uploadResponse.data.message); // Log error message if image upload failed
          }
        } catch (uploadError) {
          console.error("Error uploading image:", uploadError); // Log any errors that occur during image upload
        }
      } else {
        dispatch(CreateSuccess()); // If no image to upload, dispatch success action directly
      }
    } else {
      console.error("Error creating campaign:", response.data.message); // Log error message if campaign creation failed
    }
  } catch (error) {
    console.error("Error creating campaign:", error); // Log any errors that occur during campaign creation
  }
};

// Exporting the reducer for use in the Redux store
export default CreateCampaignSlice.reducer;
