import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getCurrentUser,
  loginWithEmailAndPassword,
  logoutUserWithToken,
  requestAccessTokenWithRefreshToken,
} from "../../api/sessionApi";
import { RootState } from "../../store";

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
  refreshToken?: string | null;
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
  loading: true,
  error: false,
  errorMessage: undefined,
  accessToken: undefined,
  refreshToken: getRefreshToken(),
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
    if (response.errors) {
      return rejectWithValue(response.data);
    }
    return response;
  }
);

export const loginUser = createAsyncThunk(
  "session/loginUser",
  async (payload: UserLoginData, { rejectWithValue }) => {
    let loginResponse = await loginWithEmailAndPassword(
      payload.email,
      payload.password
    );
    // if response has errors rejectwithvalue
    console.log(loginResponse);
    if (loginResponse.error) {
      return rejectWithValue(loginResponse.data);
    }
    let userResponse = await getCurrentUser(loginResponse.access_token);
    if (userResponse.error) {
      return rejectWithValue(userResponse.data);
    }
    let response = {
      ...loginResponse,
      ...userResponse,
    };
    return response;
  }
);

export const logoutUser = createAsyncThunk(
  "session/logoutUser",
  async (payload: string, { rejectWithValue }) => {
    let response = await logoutUserWithToken(payload);
    // if response has errors rejectwithvalue
    console.log(response);
    if (response.error) {
      return rejectWithValue(response.data);
    }
    return response;
  }
);

export const refreshAccessToken = createAsyncThunk(
  "session/refreshAccessToken",
  async (refreshToken: string | undefined | null, { rejectWithValue }) => {
    if (!refreshToken) {
      return rejectWithValue("No refresh token");
    }
    let refreshResponse = await requestAccessTokenWithRefreshToken(
      refreshToken
    );
    if (refreshResponse.error) {
      return rejectWithValue(refreshResponse.data);
    }
    let userResponse = await getCurrentUser(refreshResponse.access_token);
    if (userResponse.error) {
      return rejectWithValue(userResponse.data);
    }
    let response = {
      ...refreshResponse,
      ...userResponse,
    };

    return response;
  }
);

export const currentUser = createAsyncThunk(
  "session/currentUser",
  async (accessToken: string | undefined | null, { rejectWithValue }) => {
    if (!accessToken) {
      return rejectWithValue("No access token");
    }
    let response = await getCurrentUser(accessToken);
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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(signUpUser.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.tokenType = action.payload.token_type;
        state.currentUser!.id = action.payload.id;
        state.currentUser!.email = action.payload.email;
        state.currentUser!.role = action.payload.role;
        state.currentUser!.createdAt = action.payload.created_at;

        storeRefreshToken(action.payload.refresh_token);
        // storeUser(state.currentUser!);

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
        state.currentUser!.id = action.payload.id;
        state.currentUser!.email = action.payload.email;
        state.currentUser!.role = action.payload.role;
        state.currentUser!.createdAt = action.payload.created_at;

        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
      })
      .addCase(loginUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload.error;
      })
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(logoutUser.fulfilled, (state, action: any) => {
        state.currentUser = {
          id: undefined,
          email: undefined,
          role: undefined,
          createdAt: undefined,
        };
        state.accessToken = undefined;
        state.refreshToken = undefined;
        state.expiresIn = undefined;
        state.tokenType = undefined;
        removeRefreshToken();

        state.loading = false;
        state.error = false;
      })
      .addCase(logoutUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload.error;
      })
      .addCase(refreshAccessToken.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(refreshAccessToken.fulfilled, (state, action: any) => {
        state.accessToken = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.expiresIn = action.payload.expires_in;
        state.currentUser!.id = action.payload.id;
        state.currentUser!.email = action.payload.email;
        state.currentUser!.role = action.payload.role;
        state.currentUser!.createdAt = action.payload.created_at;
        storeRefreshToken(action.payload.refresh_token);

        state.loading = false;
        state.error = false;
      })
      .addCase(refreshAccessToken.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(currentUser.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(currentUser.fulfilled, (state, action: any) => {
        state.currentUser = {
          id: action.payload.id,
          email: action.payload.email,
          role: action.payload.role,
          createdAt: action.payload.created_at,
        };
        state.loading = false;
        state.error = false;
      })
      .addCase(currentUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export const { setLoading } = sessionSlice.actions;

export const selectLoading = (state: RootState) => state.session?.loading;

export const selectErrorMessage = (state: RootState) => state.session?.error;

export const selectCurrentUser = (state: RootState) =>
  state.session?.currentUser;

export default sessionSlice.reducer;

function storeRefreshToken(token: string) {
  localStorage.setItem("refreshToken", token);
}

function removeRefreshToken() {
  localStorage.removeItem("refreshToken");
}

function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}
