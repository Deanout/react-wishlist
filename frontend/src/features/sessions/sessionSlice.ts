import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  loginWithEmailAndPassword,
} from "../../api/sessionApi";
import { RootState } from "../../app/store";

export interface User {
  id?: string;
  email?: string;
  role?: string;
  createdAt?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
interface AuthState {
  currentUser?: User;
  loading: boolean;
  error: boolean;
  errorMessage?: string;
  accessToken?: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}

const initialState: AuthState = {
  currentUser: {
    id: undefined,
    email: undefined,
    role: undefined,
    createdAt: undefined,
  },
  loading: false,
  error: false,
  errorMessage: undefined,
  accessToken: undefined,
  refreshToken: undefined,
  expiresIn: undefined,
  tokenType: undefined,
};

export const signUpUser = createAsyncThunk(
  "session/signUpUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    let response = await createUserWithEmailAndPassword(
      payload.email,
      payload.password
    );
    console.log(response);
    // if response has errors rejectwithvalue
    if (response.errors) {
      return rejectWithValue(response.data);
    }
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    let response = await loginWithEmailAndPassword(
      payload.email,
      payload.password
    );
    console.log(response);
    // if response has errors rejectwithvalue
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response;
  }
);

export const sessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    //   setCurrentUser: (state, action) => {
    //     return produce(state, (draftState) => {
    //       draftState.currentUser = action.payload.user;
    //       draftState.loading = false;
    //     });
    //   },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signUpUser.fulfilled, (state, action: any) => {
        let data = action.payload.data;
        state.accessToken = data.access_token;
        state.refreshToken = data.refresh_token;
        state.expiresIn = data.expires_in;
        state.tokenType = data.token_type;
        state.currentUser!.id = data.id;
        state.currentUser!.email = data.email;
        state.currentUser!.role = data.role;
        state.currentUser!.createdAt = data.created_at;

        state.loading = false;
        state.error = false;
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload.errors;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(loginUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.loading = false;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload.error;
      });
  },
});

export const selectLoading = (state: RootState) => state.session?.loading;

export const selectErrorMessage = (state: RootState) => state.session?.error;

export const selectCurrentUser = (state: RootState) =>
  state.session?.currentUser;

export default sessionSlice.reducer;
