// Importing necessary functions and reducers
import { configureStore } from '@reduxjs/toolkit'; // Importing the configureStore function from Redux Toolkit
import userReducer from './states/RegisterSlice'; // Reducer for managing user registration state
import authReducer from './states/AuthUser'; // Reducer for managing user authentication state
import emailReducer from './states/RecoverPass'; // Reducer for managing password recovery state
import CampaingReducer from './states/Campaing'; // Reducer for managing campaign-related state
import voteReducer from './states/VoteSlice'; // Reducer for managing voting state
import UpdateUserReducer from './states/UpdateUser'; // Reducer for managing user update state
import RegisterCandidateReducer from './states/RegisterCandidate'; // Reducer for managing candidate registration state
import VerifyUserReducer from './states/verifity'; // Reducer for managing user verification state
import UpdateCampaignReducer from './states/UpdateCampaign'; // Reducer for managing campaign updates
import CreateCampaignReducer from './states/CreateCampaign'; // Reducer for managing campaign creation

// Configuring the Redux store with combined reducers
const store = configureStore({
  reducer: {
    user: userReducer, // Mapping user state to the user reducer
    auth: authReducer, // Mapping authentication state to the auth reducer
    passrecover: emailReducer, // Mapping password recovery state to the email reducer
    campaing: CampaingReducer, // Mapping campaign state to the campaign reducer
    vote: voteReducer, // Mapping voting state to the vote reducer
    updateUser: UpdateUserReducer, // Mapping user update state to the user update reducer
    RegisterCandidate: RegisterCandidateReducer, // Mapping candidate registration state to the candidate registration reducer
    VerifyUser: VerifyUserReducer, // Mapping user verification state to the verification reducer
    updateCampaign: UpdateCampaignReducer, // Mapping campaign update state to the campaign update reducer
    createCampaign: CreateCampaignReducer, // Mapping campaign creation state to the campaign creation reducer
  },
});

// Exporting the configured store for use in the application
export default store;