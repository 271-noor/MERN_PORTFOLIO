import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const skillSlice = createSlice({
  name: "skill",
  initialState: {
    loading: false,
    skills: [],
    error: null,
    message: null,
  },
  reducers: {
    //Get All Skills
    // Get All Skills For Request....
    getAllSkillRequest(state, action) {
      state.skills = [];
      state.loading = true;
      state.error = null;
    },

    // Get All Skills For Success....
    getAllSkillSuccess(state, action) {
      state.skills = action.payload;
      state.loading = false;
      state.error = null;
    },

    // Get All Skills For Failed....
    getAllSkillFailed(state, action) {
      state.skills = state.skills;
      state.loading = false;
      state.error = action.payload;
    },

    //Adding New Skill...
    // Add New Skill For Request....
    addNewSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Add New Skill For Success....
    addNewSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    // Add New Skill For Failed....
    addNewSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    
    //Deleting Skill...
    // Delete Skill For Request....
    deleteSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Delete Skill For Success....
    deleteSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    // Delete Skill For Failed....
    deleteSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    
    // Updating Skill...
    // Update Skill For Request....
    updateSkillRequest(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },

    // Update Skill For Success....
    updateSkillSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },

    // Update Skill For Failed....
    updateSkillFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },

    // For Errors...
    resetSkillSlice(state, action) {
      state.error = null;
      state.loading = false;
      state.message = null;
      state.skills = state.skills;
    },

    clearAllErrors(state, action) {
      state.error = false;
      state.skills = state.skills;
    },
  },
});

// Function For Get All Skills...

export const getAllSkills = () => async (dispatch) => {
  dispatch(skillSlice.actions.getAllSkillRequest());
  try {
    const { data } = await axios.get(
      "http://localhost:4000/api/v1/skill/getall",
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.getAllSkillSuccess(data.skills));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.getAllSkillFailed(error.response.data.message));
  }
};

// Function For Add New Skill...
export const addNewSkill = (data) => async (dispatch) => {
  dispatch(skillSlice.actions.addNewSkillRequest());
  try {
    const response = await axios.post(
      "http://localhost:4000/api/v1/skill/add/",
      data,
      {
        withCredentials: true,
        Headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(skillSlice.actions.addNewSkillSuccess(response.data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.addNewSkillFailed(error.response.data.message));
  }
};


//  Function Code For Delete Skill...
export const deleteSkill = (id) => async (dispatch) => {
  dispatch(skillSlice.actions.deleteSkillRequest());
  try {
    const { data } = await axios.delete(
      `http://localhost:4000/api/v1/skill/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(skillSlice.actions.deleteSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.deleteSkillFailed(error.response.data.message));
  }
};


//  Function Code For Update Skill...
export const updateSkill = (id, proficiency) => async (dispatch) => {
  dispatch(skillSlice.actions.updateSkillRequest());
  try {
    const { data } = await axios.put(
      `http://localhost:4000/api/v1/skill/update/${id}`, {proficiency},
      { withCredentials: true,  headers:{"Content-Type": "application/json"}}
    );
    dispatch(skillSlice.actions.updateSkillSuccess(data.message));
    dispatch(skillSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(skillSlice.actions.updateSkillFailed(error.response.data.message));
  }
};

// Function For Clear All Errors...
export const clearAllSkillErrors = () => (dispatch) => {
  dispatch(skillSlice.actions.clearAllErrors());
};

// Function For Clear All Errors...
export const resetSkillSlice = () => (dispatch) => {
  dispatch(skillSlice.actions.resetSkillSlice());
};


export default skillSlice.reducer;
