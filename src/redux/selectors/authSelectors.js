import { createSelector } from '@reduxjs/toolkit';

export const getAuth = createSelector(
    (state) => state.auth,
    auth => ({
        token: auth.token,
        isAuth: auth?.isAuth,
        userType: auth?.userType
    })
);

export const getFCM = createSelector(
    (state) => state.auth,
    auth => auth.fcmToken
);