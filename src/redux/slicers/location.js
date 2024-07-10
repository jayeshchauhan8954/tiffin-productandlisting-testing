import { createSlice } from '@reduxjs/toolkit';

/**
 * A slice for location.
 * @typedef {Object} locationState
 * @property {number} latitude
 * @property {number} longitude
 * @property {string} address 
 * @property {string} country 
 * @property {string} city
 * @property {string} state 
 * @property {string} cityId
 */
// Location Slice
export const locationSlice = createSlice({
    name: 'location',
    initialState: {
        latitude: 37.78825,
        longitude: -122.4324,
        address: '',
        country: '',
        city: '',
        state: '',
        cityId: ''
    },
    reducers: {
        /**
       * Set authentication details.
       * @param {locationState} state The current state of the location.
       * @param {Object} action The action object.
       * @param {Object} action.payload The payload object.
       * @param {number} action.payload.latitude
       * @param {number} action.payload.longitude
       * @param {string} action.payload.address
       * @param {string} action.payload.country
       * @param {string} action.payload.city
       * @param {string} action.payload.state 
       * @param {string} action.payload.cityId 
       */
        updateLocation: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});
export const { updateLocation } = locationSlice.actions;


