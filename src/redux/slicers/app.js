import { createSlice } from "@reduxjs/toolkit";

// App Slice
export const appSlice = createSlice({
    name: 'app',
    initialState: {
        load: false
    },
    reducers: {
        /**
         * Set authentication details.
         * @param {AuthState} state The current state of the authentication.
         * @param {Object} action The action object.
         * @param {Object} action.payload The payload object.
         */
        showLoader: (state, action) => {
            state.load = true
        },
        hideLoader: (state, action) => {
            state.load = false
        }
    },
});
export const { showLoader,hideLoader} = appSlice.actions;

