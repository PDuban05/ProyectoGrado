import { configureStore } from '@reduxjs/toolkit';
import userReducer from './states/RegisterSlice';
import authReducer from './states/AuthUser';
import emailReducer from './states/RecoverPass'
import CampaingReducer from './states/Campaing' 
import voteReducer  from './states/VoteSlice'
import UpdateUserReducer from './states/UpdateUser'
import RegisterCandidateReducer from './states/RegisterCandidate'
import VerifyUserReducer from './states/verifity'
import UpdateCampaignReducer from './states/UpdateCampaign'
import CreateCampaignReducer from './states/CreateCampaign'

const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    passrecover:emailReducer,
    campaing : CampaingReducer,
    vote : voteReducer,
    updateUser :UpdateUserReducer,
    RegisterCandidate: RegisterCandidateReducer,
    VerifyUser:VerifyUserReducer,
    updateCampaign : UpdateCampaignReducer,
    createCampaign: CreateCampaignReducer
  },
});

export default store;
