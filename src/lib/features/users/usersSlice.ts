import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ObjectId } from 'mongodb';

// Define a type for the slice state
export interface User {
  _id: ObjectId | string;
  firstName: string;
  lastName: string;
}

export interface UsersState {
  users: User[];
}

// Define the initial state using that type
const initialState: UsersState = {
  users: [],
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initialiseUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    
    // Example for adding a single user
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    
    // Example for removing a user
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id !== action.payload);
    },
  },
});

export const { initialiseUsers, addUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
