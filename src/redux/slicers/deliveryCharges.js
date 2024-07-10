import { createSlice } from '@reduxjs/toolkit';

// Delivery Charges
/**
 * A slice for deliveryChargesSlice.
 * @typedef {Object} deliveryChargesState
 * @property {number} processingFee
 * @property {number} deliveryCharges
 */
// Location Slice
export const deliveryChargesSlice = createSlice({
    name: 'deliveryCharges',
    initialState: {
        processingFee: 0,
        deliveryCharges: 0
    },
    reducers: {
        /**
       * Set deliveryChargesSlice details.
       * @param {deliveryChargesState} state The current state of the deliveryChargesSlice.
       * @param {Object} action The action object.
       * @param {Object} action.payload The payload object.
       * @param {number} action.payload.deliveryCharges
       * @param {number} action.payload.processingFee
       */
        setDeliveryCharges: (state, action) => {
            return { ...state, ...action.payload };
        },
    },
});
export const { setDeliveryCharges } = deliveryChargesSlice.actions;

