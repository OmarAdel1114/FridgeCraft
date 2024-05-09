import { createSlice } from "@reduxjs/toolkit";
import { loginUser } from "../../api/services/auth.service";

const initialState = {
  data: [],
  loading: false,
  error: false,
  auth: false,
  token: "",
  status:""
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,

  reducers:()=>({
    signOut(state){
       state.auth=false;
       state.token=null;
       localStorage.clear();
    }
  }),

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log("action payload", action.payload.data);
      state.loading = false;
      state.data = action.payload.data;
      state.error = action.payload.data?.message;
      state.auth = true;
      state.token = action.payload.data.token;
      state.status=action.payload.status;
 
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
      state.data = [];
      console.log(action.payload, state.error);
    });
  },
});

export const {signOut}= AuthSlice.actions;

export default AuthSlice.reducer;
