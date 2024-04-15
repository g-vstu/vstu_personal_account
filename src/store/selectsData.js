import {  createSlice } from '@reduxjs/toolkit';

const initialState = {
  correspondenceGroup: null,
  teacher: null,
  group: null,
};

const selectsDataSlice = createSlice({
  name: 'selectsData',
  initialState,
  reducers: {
    setTeacherFio(state, action) {
      state.teacher = action.payload;
    },
    setGroup(state, action) {
      state.group = action.payload;
    },
    setCorrespondenceGroup(state, action) {
      state.correspondenceGroup = action.payload;
    },
    clearTeacherFio(state) {
      state.teacher = null;
    },
    clearGroup(state) {
      state.group = null;
    },
    clearCorrespondenceGroup(state) {
      state.correspondenceGroup = null;
    },
  },
});

export const {
  setCorrespondenceGroup,
  setTeacherFio,
  setGroup,
  clearTeacherFio,
  clearGroup,
  clearCorrespondenceGroup,
} = selectsDataSlice.actions;

export const selectsDataReducer = selectsDataSlice.reducer;
