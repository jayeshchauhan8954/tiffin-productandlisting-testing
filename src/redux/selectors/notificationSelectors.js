import { createSelector } from '@reduxjs/toolkit';

export const getCartNotificationCount = createSelector(
    (state) => state.notification,
    notification => notification.cartCount
);

export const getunReadCountCount = createSelector(
    (state) => state.notification,
    notification => notification.unReadCount
);
