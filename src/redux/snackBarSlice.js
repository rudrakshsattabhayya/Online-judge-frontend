import { createSlice } from "@reduxjs/toolkit";

const snackBarSlice = createSlice({
  name: "snackBarSlice",
  initialState: {
    visible: false,
    type: "error",
    message: null
  },
  reducers: {
    openSnackBar : (state, action) => {
        state.message = action.payload.message;
        state.type = action.payload.type;
        state.visible = true;
    },
    closeSnackBar : (state, action) => {
        state.visible = false;
    }
  },
});

export const { openSnackBar, closeSnackBar } = snackBarSlice.actions;
export default snackBarSlice.reducer;