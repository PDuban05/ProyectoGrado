// src/redux/states/authSlice.js

import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const voteSlice = createSlice({
  name: "vote",
  initialState: {
    success: false,
    error: null,
    loading: false,
  },
  reducers: {
    VoteStart(state) {
      state.loading = true;
      state.error = null;
      state.success= false;
    },
    VoteSuccess(state) {
      state.loading = false;
      state.success = true;
    },
    VoteFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    ResetState(state) {
      state.success = false;
      state.error=null
    },
  },
});

export const { voteStart, VoteSuccess, VoteFailure, ResetState } =
  voteSlice.actions;

export const VoteAuth = (vote) => async (dispatch) => {
  const { selectedCandidate, user } = vote;


  console.log(selectedCandidate, user);

  // dispatch(voteStart());
  try {
    const response = await axios.post("http://localhost:3001/registervote", {
      infVote: selectedCandidate,
      user: user,
    });

    console.log(response.data.success)
    if(response.data.success == true){

      dispatch(VoteSuccess())
      console.log(response);
    }else{
      dispatch(response.data.message)
    }


    

  } catch (error) {
    dispatch(VoteFailure("Error en el servidor"));
    console.log(error)
  }
};

export default voteSlice.reducer;
