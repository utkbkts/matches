import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setMessages(state, action) {
      console.log("🚀 ~ setMessages ~ action:", action);
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messageSlice.actions;
export default messageSlice.reducer;
