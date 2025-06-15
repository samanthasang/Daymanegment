import { PropsWithChildren, useState } from "react";
import { AuthContext } from "./Auth.context";
import { UserSession } from "./Auth.interface";

export default function AuthProvider({ children }: PropsWithChildren) {
	const [session, setSession] = useState<UserSession | null>(null);

	const [token, setToken] = useState<string | null>(null);

	function login(sessionData: UserSession) {
		setSession(sessionData);
		storeToken(sessionData);
	}
	function loginToken(token: string) {
		setToken(token);
	}

	function deleteSession() {
		setSession(null);
		clearToken();
	}

	function storeToken(session: UserSession) {
		localStorage.setItem("AuthProvider", JSON.stringify(session));
		document.cookie = `AuthProvider=${JSON.stringify(session)}`;
	}

	function clearToken() {
		localStorage.removeItem("AuthProvider");
	}

	function getToken() {
		const token = localStorage.getItem("AuthProvider");
		if (token != null) console.log(JSON.parse(token));
		if (token != null) login(JSON.parse(token));
		if (token == null) deleteSession();

		// return token != null && JSON.parse(token)?.profile != null ? token : null;
	}

	return (
		<AuthContext.Provider
			value={{
				session,
				login,
				deleteSession,
				token,
				loginToken,
				getToken,
			}}>
			{children}
		</AuthContext.Provider>
	);
}
