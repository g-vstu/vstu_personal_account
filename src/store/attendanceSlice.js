import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAttendances = createAsyncThunk(
  `attendance/fetchAttendances`,
  async (token, {rejectWithValue}) => {
    try {
      const config = {
        headers: {
          'Content-type': "application/x-www-form-urlencoded",
          'Authorization': `Bearer ${token}`,
        },
      };

      const {data} = await axios.get(
        'https://student.vstu.by/api/presence',
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const initialState = {
  attendances: [],
  attendancesStatus: null,
  attendancesError: null,
};

const attendancesSlice = createSlice({
  name: 'attendances',
  initialState,
  reducers: {
    clearAttendances(state) {
      state.attendances = [];
      state.attendancesStatus = null;
      state.attendancesError = null;
    }
  },
  extraReducers: (builder => {
    builder
      .addCase(fetchAttendances.pending, (state) => {
        state.attendancesStatus = 'loading';
        state.attendancesError = null;
      })
      .addCase(fetchAttendances.fulfilled, (state, action) => {
        state.attendancesStatus = 'resolved';
        state.attendances = action.payload;
        state.attendancesError = null;
      })
      .addCase(fetchAttendances.rejected, (state, action) => {
        state.attendancesStatus = 'rejected';
        state.attendancesError = action.payload;
      })
  })
});

export const { clearAttendances } = attendancesSlice.actions;

export const attendanceReducer = attendancesSlice.reducer;