import { User, UserId, addNewUser, deleteUserById } from "@/store/users/slice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
	const dispatch = useAppDispatch();

	const removeUser = (id: UserId) => {
		dispatch(deleteUserById(id));
	};

	const createUser = (user: User) => {
		dispatch(addNewUser(user));
	};

	return { removeUser, createUser };
};
