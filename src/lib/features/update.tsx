import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../types";

interface UserUpdateState {
  selectedUser: IUser | null;
}

const initialState: UserUpdateState = {
  selectedUser: null,
};


export const updateSlice = createSlice({
    name:"update",
    initialState,
    reducers:{
        selectUser: (state, action: PayloadAction<IUser>) => {
            state.selectedUser = action.payload
        },
        deleteUser: (state) => {
            state.selectedUser = null
        }
    }
})

export const {selectUser, deleteUser} = updateSlice.actions
export default updateSlice.reducer