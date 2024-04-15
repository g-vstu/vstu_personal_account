import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const getStudentInfo = createAsyncThunk(
  `student/getStudentInfo`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/student/caseno',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  loading: false,
  studentInfo: null,
  studentGroup: null,
  error: null,
};

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    clearStudentInfo(state) {
      state.loading = false;
      state.studentInfo = null;
      state.studentGroup= null;
      state.error = null;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(getStudentInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getStudentInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.studentInfo = action.payload;
        state.studentGroup = action.payload.group.name;
        state.error = null;
      })
      .addCase(getStudentInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  })
});

export const {clearStudentInfo} = studentSlice.actions;

export const studentReducer = studentSlice.reducer;
