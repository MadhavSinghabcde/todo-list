import { Dispatch, SetStateAction } from "react";

type RegisterUserDetails = {
    username: string,
    email: string,
    password: string
}

type LoginUserDetails = Omit<RegisterUserDetails, 'username'>;

type AuthUser = {
    username: string;
    email: string;
    token: string;
} 

type AuthUserCheck = {
    user: AuthUser | null;
    error: string | null
}

type AuthContextType = {
    currentAuthUser: AuthUser | null;
    setCurrentAuthUser: Dispatch<SetStateAction<AuthUser | null>>;
}

export type {
    RegisterUserDetails,
    LoginUserDetails,
    AuthUser,
    AuthUserCheck,
    AuthContextType
};
