import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedConversation: null,
  messages: [],
};

export const messageSlice = createSlice({
  name: "messageSlice",
  initialState,
  reducers: {
    setConversation(state, action) {
      state.selectedConversation = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
  },
});

export const { setConversation, setMessages } = messageSlice.actions;
export default messageSlice.reducer;
