import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const softwareApplicationSlice = createSlice({
  name: "application",
  initialState: {
    softwareApplications: [],
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    //Get All Software Applications...
    // Get All Software Applications For Request....
    getAllSoftwareApplicationsRequest(state, action) {
      state.softwareApplications = [];
      state.loading = true;
      state.error = null;
    },

    // Get All Software Applications For Success....
    getAllSoftwareApplicationsSuccess(state, action) {
      state.softwareApplications = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Get All Software Applications For Failed....
    getAllSoftwareApplicationsFailed(state, action) {
      state.softwareApplications = state.softwareApplications;
      state.loading = false;
      state.error = action.payload;
    },

    //Adding New Software Application...
    // Add New Software For Request....
    addNewSoftwareRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Add New Software For Success....
    addNewSoftwareSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    // Add New Software For Failed....
    addNewSoftwareFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    //Deleting Software Application...
    // Delete Software For Request....
    deleteApplicationRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Delete Software For Success....
    deleteApplicationSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    // Delete Software For Failed....
    deleteApplicationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // For Errors...
    resetApplicationSlice(state, action) {
      state.error = null;
      state.loading = false;
      state.message = null;
      state.softwareApplications = state.softwareApplications;
    },

    clearAllErrors(state, action) {
      state.error = false;
      state.softwareApplications = state.softwareApplications;
    },
  },
});

// Function For Get All Software Applications...

export const getAllSoftwareApplications = () => async (dispatch) => {
  dispatch(
    softwareApplicationSlice.actions.getAllSoftwareApplicationsRequest()
  );
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/softwareapplication/getall",
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsSuccess(
        data.softwareApplications
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.getAllSoftwareApplicationsFailed(
        error.response.data.message
      )
    );
  }
};

// Function For Add New Software Apllication...
export const addNewSoftwareApllication = (data) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.addNewSoftwareRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/softwareapplication/add/",
      data,
      {
        withCredentials: true,
        Headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareSuccess(
        response.data.message
      )
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.addNewSoftwareFailed(
        error.response.data.message
      )
    );
  }
};

//  Function Code For Delete Software Application...
export const deleteSoftwareApplication = (id) => async (dispatch) => {
  dispatch(softwareApplicationSlice.actions.deleteApplicationRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/softwareapplication/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      softwareApplicationSlice.actions.deleteApplicationSuccess(data.message)
    );
    dispatch(softwareApplicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      softwareApplicationSlice.actions.deleteApplicationFailed(
        error.response.data.message
      )
    );
  }
};

// Function For Clear All Errors...
export const clearAllApplicationSliceErrors = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.clearAllErrors());
};

// Function For Clear All Errors...
export const resetApplicationSlice = () => (dispatch) => {
  dispatch(softwareApplicationSlice.actions.resetApplicationSlice());
};

export default softwareApplicationSlice.reducer;
