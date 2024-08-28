import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const forgotResetPassSlice = createSlice({
    name: "forgotPassword",
    initialState: {
        loading: false,
        error: null,
        message: null,
       },

    reducers: {
        // For Forgot Password Code...
        forgotPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        forgotPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        forgotPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },
       
        // For Reset Password Code...
        resetPasswordRequest(state, action) {
            state.loading = true;
            state.error = null;
            state.message = null;
        },
        resetPasswordSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.message = action.payload;
        },
        resetPasswordFailed(state, action) {
            state.loading = false;
            state.error = action.payload;
            state.message = null;
        },

        // For Error Clear Code...
        clearAllErrors(state, action) {
            state.error = null;
            state = state;
        }
    },

});

// For Forgot Password Function Code...
export const forgotPassword = (email) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.forgotPasswordRequest());
    try {
        const {data} = await axios.post(
            "http://localhost:4000/api/v1/user/password/forgot", 
            {email}, 
            {withCredentials: true, headers: { "Content-Type": "application/json" }}
        );
        dispatch(forgotResetPassSlice.actions.forgotPasswordSuccess(data.message));
        dispatch(forgotResetPassSlice.actions.clearAllErrors());
    } catch (error) {
       dispatch(forgotResetPassSlice.actions.forgotPasswordFailed(
        error.response.data.message
    )
   ); 
  }
};

// For Reset Password Function Code...
export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
    try {
        const {data} = await axios.put(
            `http://localhost:4000/api/v1/user/password/reset/${token}`, 
            {password, confirmPassword}, 
            {withCredentials: true, headers: { "Content-Type": "application/json" }}
        );
        dispatch(forgotResetPassSlice.actions.resetPasswordSuccess(data.message));
        dispatch(forgotResetPassSlice.actions.clearAllErrors());
    } catch (error) {
       dispatch(forgotResetPassSlice.actions.resetPasswordFailed(
        error.response.data.message
    )
   ); 
  }
};

// For Clear Errors...
export const clearAllForgotPasswordErrors = () => (dispatch) => {
dispatch(forgotResetPassSlice.actions.clearAllErrors());
}
 
export default forgotResetPassSlice.reducer;
