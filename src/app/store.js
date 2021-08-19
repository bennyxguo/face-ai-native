import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../components/auth/userSlice';
import faceRecognitionReducer from '../components/faceRecognition/faceRecognitionSlice';

export const store = configureStore({
  reducer: {
    faceRecognition: faceRecognitionReducer,
    user: userReducer
  }
});
