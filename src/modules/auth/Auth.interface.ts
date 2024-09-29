export interface AuthContextType {
  session: null | UserSession;
  login: (session: UserSession) => void;
  deleteSession: () => void;
  update?: unknown;
  token: null | string;
  loginToken: (token: string) => void;
  getToken: () => void;
}

export interface UserSession {
  accessToken: {
    access_token: string;
    expires_at: number;
    token_type: string;
  };
  profile: {
    first_name: string;
    last_name: string;
    gender: "MALE" | "FEMALE";
  };
}
