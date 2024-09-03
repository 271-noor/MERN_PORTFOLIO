import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const messageSlice = createSlice({
  name: "messages",
  initialState: {
    loading: false,
    messages: [],
    error: null,
    message: null,
  },
  reducers: {
    // Code For get all Messages Request...
    getAllMessagesRequest(state, action) {
      state.messages = [], 
      state.error = null, 
      state.loading = true;
    },

    // Code For get all Messages Success...
    getAllMessagesSuccess(state, action) {
      state.messages = action.payload,
        state.error = null,
        state.loading = false;
    },

    // Code For get all Messages Failed...
    getAllMessagesFailed(state, action) {
      state.messages = state.message,
        state.error = action.payload,
        state.loading = false;
    },

    //For Delete......
    // Code For Delete Messages Request...
    deleteMessageRequest(state, action) {
      state.message = null, 
      state.error = null, 
      state.loading = true;
    },

    // Code For Delete Messages Success...
    deleteMessageSuccess(state, action) {
      state.message = action.payload,
        state.error = null,
        state.loading = false;
    },

    // Code For Delete Messages Failed...
    deleteMessageFailed(state, action) {
      state.message = null,
        state.error = action.payload,
        state.loading = false;
    },

    resetMessageSlice(state, action) {
      state.error = null;
      state.messages = state.messages;
      state.message = null;
      state.loading = false;
    },
    
    // Code For Clear All Errors...
    clearAllErrors(state, action) {
      state.error = null, 
      state.messages = state.messages;
    },
  },
});

//  Function Code For Get All Messages...
export const getAllMessages = () => async (dispatch) => {
  dispatch(messageSlice.actions.getAllMessagesRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/message/getall",
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.getAllMessagesSuccess(data.messages));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.getAllMessagesFailed(error.response.data.message)
    );
  }
};

//  Function Code For Delete Message...
export const deleteMessage = (id) => async (dispatch) => {
  dispatch(messageSlice.actions.deleteMessageRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/message/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(messageSlice.actions.deleteMessageSuccess(data.message));
    dispatch(messageSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      messageSlice.actions.deleteMessageFailed(error.response.data.message)
    );
  }
};

//  For clear all Message Errors...
export const clearAllMessageErrors = () => (dispatch) => {
  dispatch(messageSlice.actions.clearAllErrors());
};

//  For Reset Message...
export const resetMessageSlice = () => (dispatch) => {
  dispatch(messageSlice.actions.resetMessageSlice());
};

export default messageSlice.reducer;
