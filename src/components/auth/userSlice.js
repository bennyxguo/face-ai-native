import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import request from '../../utils/request';

const storageKey = '@fai_storage';

const initialState = {
  token: null,
  loading: false,
  user: {},
  error: ''
};

export const getStoredState = async () => {
  try {
    let state = Object.assign({}, defaultState);
    const storedState = await AsyncStorage.getItem(storageKey);
    if (storedState) Object.assign(state, { token: storedState });
    return state;
  } catch (e) {}
};

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
  const response = await request.get('/user');
  return response.data;
});

export const signinUser = createAsyncThunk('users/signinUser', async ({ email, password }) => {
  const response = await request.post('/login', {
    email,
    password
  });
  return response.data;
});

export const signToken = createAsyncThunk('users/signToken', async (token) => {
  try {
    const bearerToken = `Bearer ${token}`;
    await AsyncStorage.setItem(storageKey, bearerToken);
    return bearerToken;
  } catch (e) {
    return null;
  }
});

export const fetchToken = createAsyncThunk('users/fetchToken', async () => {
  try {
    const storedState = await AsyncStorage.getItem(storageKey);
    return storedState || null;
  } catch (e) {
    return null;
  }
});

export const revokeToken = createAsyncThunk('users/revokeToken', async (token) => {
  try {
    await AsyncStorage.removeItem(storageKey);
    return null;
  } catch (e) {
    return null;
  }
});

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(signToken.fulfilled, (state, action) => {
      if (action.payload) state.token = action.payload;
    });
    builder.addCase(fetchToken.fulfilled, (state, action) => {
      if (action.payload) state.token = action.payload;
    });
    builder.addCase(revokeToken.fulfilled, (state, action) => {
      state.token = action.payload;
    });
    builder
      .addCase(fetchUser.pending, (state) => {
        if (state.loading === false) state.loading = true;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.user = action.payload;
        }
      })
      .addCase(fetchUser.rejected, (state, action) => {
        if (state.loading === true) {
          state.loading = false;
          state.error = action.error;
        }
      });
    builder
      .addCase(signinUser.pending, (state) => {
        if (state.loading === false) state.loading = true;
      })
      .addCase(signinUser.fulfilled, (state) => {
        if (state.loading === true) {
          state.loading = false;
        }
      })
      .addCase(signinUser.rejected, (state) => {
        if (state.loading === true) {
          state.loading = false;
        }
      });
  }
});

export const selectToken = (state) => state.user.token;
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
