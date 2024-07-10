import { createSelector } from '@reduxjs/toolkit';

export const getDeliveryCharges = createSelector(
    (state) => state.deliveryCharges,
    charges => ({
        deliveryCharges: charges?.deliveryCharges,
        processingFee: charges?.processingFee,
    })
);