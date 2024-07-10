import { createSelector } from '@reduxjs/toolkit';

export const isLoad = createSelector(
    (state) => state.app,
    app => app.load
);
