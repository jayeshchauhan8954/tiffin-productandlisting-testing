import { createSelector } from '@reduxjs/toolkit';

export const getUser = createSelector(
    (state) => state.user,
    user => ({
        firstName: user?.firstName,
        lastName: user?.lastName,
        email: user?.email,
        phone: user?.phone,
        dob: user?.dob,
        dialCode: user?.dialCode,
    })
);

export const getUserName = createSelector(
    (state) => state.user,
    user => ({
        firstName: user?.firstName,
        lastName: user?.lastName
    })
);

export const getProfilePic = createSelector(
    (state) => state.user,
    user => user.profilePic
);
