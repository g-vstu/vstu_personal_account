import { createSlice} from '@reduxjs/toolkit';

const initialState = {
  isOpenMenu: false,
};

const extraSlice = createSlice({
  name: 'extra',
  initialState,
  reducers: {
    setMenuCondition(state,action) {
      state.isOpenMenu = action.payload;
    }
  },
});

export const { setMenuCondition } = extraSlice.actions;

export const extraReducer = extraSlice.reducer;