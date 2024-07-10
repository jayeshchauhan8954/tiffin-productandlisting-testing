import { createSelector } from '@reduxjs/toolkit';

export const getAddress = createSelector(
    (state) => state.location,
    location => ({
        state: location?.state,
        city: location?.city,
        address:location.address,
        country:location.country
    })
);

export const getLatLng = createSelector(
    (state) => state.location,
    location => ({
        latitude: location?.latitude,
        longitude: location?.longitude
    })
);

export const getCityId = createSelector(
    (state) => state.location,
    location => location.cityId
);