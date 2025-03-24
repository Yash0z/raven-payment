"use client";
import { authClient } from "@/lib/auth-client";
import { createAuthClient } from "better-auth/react";
const { useSession } = createAuthClient();

export default function Dashboard() {
	return <>HEllO USER</>;
}
