import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    loading: false,
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    //  For Get All Projects...
    // Get All Projects for Request...
    getAllProjectsRequest(state, action) {
      state.projects = [];
      state.error = null;
      state.loading = true;
    },

    // Get All Projects for Success...
    getAllProjectsSuccess(state, action) {
      state.projects = action.payload;
      state.error = null;
      state.loading = false;
    },

    // Get All Projects for Failed...
    getAllProjectsFailed(state, action) {
      state.projects = state.projects;
      state.error = action.payload;
      state.loading = false;
    },

    //  For Adding New Projects...
    // Add New Project for Request...
    addNewProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Add New Project for Success...
    addNewProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },

    // Add New Project for Failed...
    addNewProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    //  For Deleting Projects...
    // Delete Project for Request...
    deleteProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Delete Project for Success...
    deleteProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },

    // Delete Project for Failed...
    deleteProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    //  For Updating Projects...
    // Update Project for Request...
    updateProjectRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Update Project for Success...
    updateProjectSuccess(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },

    // Update Project for Failed...
    updateProjectFailed(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },

    // Reset Project Slice...
    resetProjectSlice(state, action) {
      state.error = null;
      state.message = null;
      state.projects = state.projects;
      state.loading = false;
    },

    // Clear All Errors...
    clearAllErrors(state, action) {
      state.error = null;
      state.projects = state.projects;
    },
  },
});

// Function For Get All Projects...
export const getAllProjects = () => async (dispatch) => {
  dispatch(projectSlice.actions.getAllProjectsRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/project/getall",
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.getAllProjectsSuccess(data.projects));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.getAllProjectsFailed(error.response.data.message)
    );
  }
};

//  Function For Add New Project...
export const AddNewProject = (formData) => async (dispatch) => {
  dispatch(projectSlice.actions.addNewProjectRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4000/api/v1/project/add",
      formData,
      {
        withCredentials: true,
        header: { "content-type": "multipart/form-data" },
      }
    );
    dispatch(projectSlice.actions.addNewProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.addNewProjectFailed(error.response.data.message)
    );
  }
};

//  Function For Delete Project...
export const deleteProject = (id) => async (dispatch) => {
  dispatch(projectSlice.actions.deleteProjectRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/project/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(projectSlice.actions.deleteProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.deleteProjectFailed(error.response.data.message)
    );
  }
};

// Function For Update Project...
export const updateProject = (id, newData) => async(dispatch) => {
  dispatch(projectSlice.actions.updateProjectRequest());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/project/update/${id}`, newData,
      { withCredentials: true, headers: {"Content-Type": "multipart/form-data"} }
    );
    dispatch(projectSlice.actions.updateProjectSuccess(data.message));
    dispatch(projectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      projectSlice.actions.updateProjectFailed(error.response.data.message)
    );
  }
};

// Function For Clear All Project Slice...
export const clearAllProjectSliceErrors = () => (dispatch) => {
  dispatch(projectSlice.actions.clearAllErrors());
};

// Function For Reset Project Slice...
export const resetProjectSlice = () => (dispatch) => {
  dispatch(projectSlice.actions.resetProjectSlice());
};

export default projectSlice.reducer;
