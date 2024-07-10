import { createSlice } from "@reduxjs/toolkit";

// Auth Slice
/**
 * A slice for authentication with `setAuth` action.
 * @typedef {Object} NotificationState
 * @property {number} cartCount The authentication token.
 * @property {number} unReadCount Whether the user is authenticated.
 */

// Notify Slice
export const notificationSlice = createSlice({
    name: 'notification',
    initialState: {
        cartCount: 0,
        unReadCount: 0,
    },
    reducers: {
        /**
         * Set authentication details.
         * @param {NotificationState} state The current state of the authentication.
         * @param {Object} action The action object.
         * @param {Object} action.payload The payload object.
         */
        setNotificationCounts: (state, action) => {
            return { ...state, ...action.payload };
        },
        clearCartNotificationCount: (state, action) => {
            state.cartCount = 0
        },
        clearNotificationCount: (state, action) => {
            state.unReadCount = 0
        }
    },
});
export const { setNotificationCounts, clearCartNotificationCount,clearNotificationCount } = notificationSlice.actions;

