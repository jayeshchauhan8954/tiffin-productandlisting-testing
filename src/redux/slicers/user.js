import { createSlice } from '@reduxjs/toolkit';

// User Slice
/**
 * A slice for authentication with `setAuth` action.
 * @typedef {Object} UserState
 * @property {string} _id The user Id
 * @property {string} firstName 
 * @property {string} lastName 
 * @property {string} email 
 * @property {string} phone 
 * @property {string} dob
 * @property {number} action.payload.dialCode dialCode
 * @property {number} action.payload.profilePic PRofilePic
 */
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        _id: '',
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dob: '',
        profilePic: '',
        dialCode:''
    },
    reducers: {
        /**
        * Set user details.
        * @param {UserState} state The current state of the user.
        * @param {Object} action The action object.
        * @param {Object} action.payload The payload object.
        * @param {string} action.payload._id
        * @param {boolean} action.payload.firstName
        * @param {string} action.payload.lastName
        * @param {number} action.payload.email
        * @param {string} action.payload.phone 
        * @param {number} action.payload.dob Dob
        * @param {number} action.payload.profilePic ProfilePic
        * @param {number} action.payload.dialCode dialCode
        */
        updateUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        emptyUser: (state, action) => {
            return {
                _id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                dob: '',
                dialCode:''
            };
        },
    },
});
export const { updateUser, emptyUser } = userSlice.actions;

