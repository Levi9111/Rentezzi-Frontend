'use client';

import { createSlice } from '@reduxjs/toolkit';

interface AUthState {
  accessToken: null;
}

const initialState: AUthState = {
  accessToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    settAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },

    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
});

export const { settAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
