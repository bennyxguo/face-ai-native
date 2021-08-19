import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import request from '../../utils/request';

const initialState = {
  boxes: [],
  loading: false,
  error: ''
};

export const updateEntry = createAsyncThunk('image/updateEntry', async (body) => {
  const response = await request.put('/image/updateEntry', body);
  return response.data;
});

export const faceRecognition = createAsyncThunk('image/faceRecognition', async ({ imageUrl }) => {
  const response = await request.post('/image/faceRecognition', { imageUrl });
  return response.data;
});

export const faceRecognitionSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(faceRecognition.pending, (state) => {
        if (state.loading === false) state.loading = true;
      })
      .addCase(faceRecognition.fulfilled, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.user = action.payload;
        }
      })
      .addCase(faceRecognition.rejected, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.error = action.error;
        }
      });
  }
});

export const selectBoxes = (state) => state.faceRecognition.boxes;

export default faceRecognitionSlice.reducer;
