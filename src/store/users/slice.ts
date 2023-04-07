import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const DEFAULT_STATE = [
	{
		id: "1",
		name: "John Doe",
		email: "djoelplay@gmail.com",
		github: "joel",
	},
	{
		id: "2",
		name: "Jane Doe",
		email: "janedoe@company.co",
		github: "joeltinx",
	},
];

export type UserId = string;

export interface User {
	name: string;
	email: string;
	github: string;
}

export interface UsersWithId extends User {
	id: UserId;
}

const initialState: Array<UsersWithId> = (() => {
	const persistedState = localStorage.getItem("__redux__state__");
	if (persistedState) {
		const parsedState = JSON.parse(persistedState);
		if (parsedState.users) {
			return parsedState.users;
		}
	}
	return DEFAULT_STATE;
})();

export const usersSlice = createSlice({
	name: "users",
	initialState,
	reducers: {
		addNewUser: (state, action: PayloadAction<User>) => {
			const id = crypto.randomUUID();
			// return [...state, { ...action.payload, id }];
			state.push({ ...action.payload, id }); // just works in redux toolkit and it use immer
		},
		deleteUserById: (state, action: PayloadAction<UserId>) => {
			const id = action.payload;
			return state.filter((user) => user.id !== id);
		},
		rollbackUser: (state, action: PayloadAction<UsersWithId>) => {
			const isUserAlreadyInState = state.some(
				(user) => user.id === action.payload.id,
			);
			if (!isUserAlreadyInState) {
				return [...state, action.payload];
			}
		},
	},
});

export default usersSlice.reducer;

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions;
