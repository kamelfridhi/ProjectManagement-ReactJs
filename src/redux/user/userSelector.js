// userSelectors.js

import { createSelector } from '@reduxjs/toolkit';

// Selects the user slice of the state
const selectUser = (state) => state.user;

// Selector to extract the entire user object
export const selectUserObject = createSelector(
    [selectUser],
    (user) => user.currentUser
);
