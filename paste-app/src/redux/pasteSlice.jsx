import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  pastes: JSON.parse(localStorage.getItem("pastes")) || [],
};

const pasteSlice = createSlice({
  name: "paste",
  initialState,
  reducers: {
    addToPastes: (state, action) => {
      state.pastes.push(action.payload);
      localStorage.setItem("pastes", JSON.stringify(state.pastes));
      toast("✅ Paste created successfully!");
    },

    updateToPastes: (state, action) => {
      const index = state.pastes.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.pastes[index] = action.payload;
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("✅ Paste updated successfully!");
      }
    },

    resetAllPastes: (state) => {
      state.pastes = [];
      localStorage.removeItem("pastes");
      toast("✅ All pastes deleted successfully!");
    },

    removeFromPastes: (state, action) => {
      const pasteId = action.payload;
      const index = state.pastes.findIndex((paste) => paste._id === pasteId);
      if (index === -1) {
        toast("❌ Paste not found!");
      } else {
        state.pastes.splice(index, 1);
        localStorage.setItem("pastes", JSON.stringify(state.pastes));
        toast("✅ Paste deleted successfully!");
      }
    },
  },
});

export const {
  addToPastes,
  updateToPastes,
  resetAllPastes,
  removeFromPastes,
} = pasteSlice.actions;

export default pasteSlice.reducer;
