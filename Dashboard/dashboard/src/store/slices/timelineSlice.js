import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const timelineSlice = createSlice({
  name: "timeline",
  initialState: {
    loading: false,
    timelines: [],
    error: null,
    message: null,
  },
  reducers: {
    // Code For get all Timelines Request...
    getAllTimelineRequest(state, action) {
      state.timelines = [], 
      state.error = null, 
      state.loading = true;
    },

    // Code For get all Timeline Success...
    getAllTimelineSuccess(state, action) {
      state.timelines = action.payload,
        state.error = null,
        state.loading = false;
    },

    // Code For get all Timeline Failed...
    getAllTimelineFailed(state, action) {
      state.timelines = state.timelines,
        state.error = action.payload,
        state.loading = false;
    },

    //For Delete......
    // Code For Delete Timeline Request...
    deleteTimelineRequest(state, action) {
      state.message = null, 
      state.error = null, 
      state.loading = true;
    },

    // Code For Delete Timeline Success...
    deleteTimelineSuccess(state, action) {
      state.message = action.payload,
        state.error = null,
        state.loading = false;
    },

    // Code For Delete Timeline Failed...
    deleteTimelineFailed(state, action) {
      state.message = null,
        state.error = action.payload,
        state.loading = false;
    },

    //For Adding......
    // Code For Add Timeline Request...
    addTimelineRequest(state, action) {
      state.message = null, 
      state.error = null, 
      state.loading = true;
    },

    // Code For Add Timeline Success...
    addTimelineSuccess(state, action) {
      state.message = action.payload,
        state.error = null,
        state.loading = false;
    },

    // Code For Add Timeline Failed...
    addTimelineFailed(state, action) {
      state.message = null,
        state.error = action.payload,
        state.loading = false;
    },

    resetTimelineSlice(state, action) {
        state.error = null;
        state.timelines = state.timelines;
        state.message = null;
        state.loading = false;
    },
    
    // Code For Clear All Errors...
    clearAllErrors(state, action) {
        state.error = null, 
        state.timelines = state.timelines;
    },
  },
});

//  Function Code For Get All Timelines...
export const getAllTimelines = () => async (dispatch) => {
  dispatch(timelineSlice.actions.getAllTimelineRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/timeline/getall",
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.getAllTimelineSuccess(data.timelines));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      timelineSlice.actions.getAllTimelineFailed(error.response.data.message)
    );
  }
};

//  Function Code For Delete Timeline...
export const deleteTimeline = (id) => async (dispatch) => {
  dispatch(timelineSlice.actions.deleteTimelineRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/timeline/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(timelineSlice.actions.deleteTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(timelineSlice.actions.deleteTimelineFailed(error.response.data.message));
  }
};


//  Function Code For Add New Timeline...
export const addNewTimeline = (timelineData) => async (dispatch) => {
  dispatch(timelineSlice.actions.addTimelineRequest());
  try {
    const { data } = await axios.post(
      `http://localhost:4000/api/v1/timeline/add/`, timelineData,
      { withCredentials: true, headers: {"Content-Type": "application/json"} }
    );
    dispatch(timelineSlice.actions.addTimelineSuccess(data.message));
    dispatch(timelineSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(timelineSlice.actions.addTimelineFailed(error.response.data.message));
  }
};


//  For clear all Message Errors...
export const clearAllTimelineErrors = () => (dispatch) => {
    dispatch(timelineSlice.actions.clearAllErrors());
}


//  For Reset Message...
export const resetTimelineSlice = () => (dispatch) => {
    dispatch(timelineSlice.actions.resetTimelineSlice());
}

export default timelineSlice.reducer;
