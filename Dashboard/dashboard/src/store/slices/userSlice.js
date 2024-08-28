import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: false,
        user: {},
        isAuthenticated: false,
        error: null,
        message: null,
        isUpdated: false,
    },

    reducers: {
        // For Login Code...
        loginRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loginFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },
        loadUserRequest(state, action) {
            state.loading = true;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
        },
        loadUserSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
            state.error = null;
        },
        loadUserFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = action.payload;
        },

        // For LogOut Code...
        logoutSuccess(state, action) {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = {};
            state.error = null;
            state.message = action.payload;
        },
        logoutFailed(state, action) {
            state.loading = false;
            state.isAuthenticated = state.isAuthenticated;
            state.user = state.user;
            state.error = action.payload;
        },

        //For Update Password Code...
        updatePasswordRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updatePasswordSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updatePasswordFailed(state, action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        //For Update Profile Code...
        updateProfileRequest(state, action){
            state.loading = true;
            state.isUpdated = false;
            state.message = null;
            state.error = null;
        },
        updateProfileSuccess(state, action){
            state.loading = false;
            state.isUpdated = true;
            state.message = action.payload;
            state.error = null;
        },
        updateProfileFailed(state, action){
            state.loading = false;
            state.isUpdated = false;
            state.message = null;
            state.error = action.payload;
        },

        // For Update Profile Reset After Update Code...
        updateProfileResetAfterUpdate(state, action) {
            state.error = null;
            state.isUpdated = false;
            state.message = null;
        },

        // For Error Clear Code...
        clearAllErrors(state, action) {
            state.error = null;
            state.user = state.user;
        }
    },

});

// For Login Function Code...
export const login = (email, password) => async (dispatch) => {
    dispatch(userSlice.actions.loginRequest());
    try {
        const {data} = await axios.post(
         "http://localhost:4000/api/v1/user/login", 
         {email, password}, 
        {withCredentials: true, headers:{"Content-Type":"application/json"}}
    );
    dispatch(userSlice.actions.loginSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loginFailed(error.response.data.message));  
    }
};

// For Get User Function Code, aur is getUser ke function App.js me usr kr rhe h...
export const getUser = () => async (dispatch) => {
    dispatch(userSlice.actions.loadUserRequest());
    try {
        const {data} = await axios.get(
         "http://localhost:4000/api/v1/user/me", 
        {withCredentials: true}
    );
    dispatch(userSlice.actions.loadUserSuccess(data.user));
    dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.loadUserFailed(error.response.data.message));  
    }
};

// For logout Function Code...
export const logout = () => async (dispatch) => {
    try {
        const {data} = await axios.get(
         "http://localhost:4000/api/v1/user/logout", 
        {withCredentials: true}
    );
    dispatch(userSlice.actions.logoutSuccess(data.message));
    dispatch(userSlice.actions.clearAllErrors());
    } catch (error) {
      dispatch(userSlice.actions.logoutFailed(error.response.data.message));  
    }
};

// For Update Password Function Code...
export const updatePassword = (currentPassword, newPassword, confirmNewPassword) => async (dispatch) => {
    dispatch(userSlice.actions.updatePasswordRequest());
    try {
        const {data} = await axios.put(
            "http://localhost:4000/api/v1/user/update/password", 
            {currentPassword, newPassword, confirmNewPassword},
            {
                withCredentials: true,
                headers: { "Content-Type": "application/json" },
            },
        );
        dispatch(userSlice.actions.updatePasswordSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());

    } catch (error) {
        dispatch(
            userSlice.actions.updatePasswordFailed(error.response.data.message)
        );
    }
};

// For Update Profile Function Code...
export const updateProfile = (data) => async (dispatch) => {
    dispatch(userSlice.actions.updateProfileRequest());
    try {
        const {data} = await axios.put(
            "http://localhost:4000/api/v1/user/update/me", 
            data,
            {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data" },
            },
        );
        dispatch(userSlice.actions.updateProfileSuccess(data.message));
        dispatch(userSlice.actions.clearAllErrors());

    } catch (error) {
        dispatch(
            userSlice.actions.updateProfileFailed(error.response.data.message)
        );
    }
};

// For Reset Profile function Code...
export const resetProfile = () => (dispatch) => {
    dispatch(userSlice.actions.updateProfileResetAfterUpdate());
}

// For Clear Errors...
export const clearAllUserErrors = () => (dispatch) => {
dispatch(userSlice.actions.clearAllErrors());
}
 
export default userSlice.reducer;
