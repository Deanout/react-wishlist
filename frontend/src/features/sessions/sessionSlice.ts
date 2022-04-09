import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "../../api/sessionApi";
import { RootState } from "../../app/store";

export interface User {
  id: string;
  email: string;
  role: string;
  createdAt: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
interface AuthState {
  currentUser: User | null | undefined;
  loading: boolean;
  error: boolean;
  errorMessage: string;
  accessToken: string | null | undefined;
  refreshToken: string | null | undefined;
  expiresIn: number | null | undefined;
  tokenType: string | null | undefined;
}

const initialState: AuthState = {
  currentUser: {
    id: "",
    email: "",
    role: "",
    createdAt: "",
  },
  loading: false,
  error: false,
  errorMessage: "",
  accessToken: null,
  refreshToken: null,
  expiresIn: null,
  tokenType: null,
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
    if (response.data.errors) {
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
        state.currentUser!.createdAt = data.created_at.toString();

        state.loading = false;
        state.error = false;
      })
      .addCase(signUpUser.rejected, (state, action: any) => {
        state.loading = false;
        state.error = true;
        state.errorMessage = action.payload.errors;
      });
  },
});

export const selectLoading = (state: RootState) => state.session?.loading;

export const selectErrorMessage = (state: RootState) => state.session?.error;

export const selectCurrentUser = (state: RootState) =>
  state.session?.currentUser;

export default sessionSlice.reducer;
