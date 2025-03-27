import { userData } from "@/types";
import { atom } from "jotai";

export const userAtom = atom<userData>({
	id: "",
	name: "",
	email: "",
	avatar: "",
});
