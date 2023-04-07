import { configureStore, type Middleware } from "@reduxjs/toolkit";
import { toast } from "sonner";
import usersStore, { rollbackUser } from "./users/slice";

const persistanceLocalStorageMiddleware: Middleware =
	(store) => (next) => (action) => {
		// console.log(store.getState());
		// console.log(action);
		next(action);
		// console.log(store.getState());
		localStorage.setItem("__redux__state__", JSON.stringify(store.getState()));
	};

const syncWithDatabaseMiddleware: Middleware =
	(store) => (next) => (action) => {
		const { type, payload } = action;
		const previousState = store.getState();
		next(action);
		if (type === "users/deleteUserById") {
			const userToRemove = previousState.users.find(
				(user) => user.id === payload,
			);
			fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
				method: "DELETE",
			})
				.then((res) => {
					if (res.ok) toast.success("success");
					// throw new Error("Error while deleting user");
				})
				.catch((err) => {
					toast.error(`Error while deleting user: ${userToRemove.name}`);
					if (userToRemove) {
						store.dispatch(rollbackUser(userToRemove));
					}
					console.error(err);
				});
		}
	};

export const store = configureStore({
	reducer: {
		users: usersStore,
	},
	middleware: [persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
