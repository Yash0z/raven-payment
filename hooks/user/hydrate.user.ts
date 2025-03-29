import { userAtom } from "@/atoms/userAtom";
import { userData } from "@/types/types";
import { useAtom } from "jotai";
import { useEffect } from "react";

export const persistUser = (user: userData) => {
	try {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		} else {
			localStorage.removeItem("user");
		}
	} catch (error) {
		console.error("Error persisting user:", error);
	}
};

export const getPersistedUser = () => {
	try {
		const userString = localStorage.getItem("user");
		return userString ? JSON.parse(userString) : null;
	} catch (error) {
		console.error("Error retrieving persisted user:", error);
		return null;
	}
};

export const useHydrateUser = () => {
	const [_, setUser] = useAtom(userAtom);

	useEffect(() => {
		const persistedUser = getPersistedUser();
		if (persistedUser) {
			setUser(persistedUser);
		}
	}, [setUser]);
};

export const useRemoveUser = () => {
	const [_, setUser] = useAtom(userAtom);
	const logout = () => {
		// Clear user state in Jotai atom
		setUser(null as any);
		// Remove user from localStorage
		persistUser(null as any);
		localStorage.removeItem("user");
	};
	return logout;
};
