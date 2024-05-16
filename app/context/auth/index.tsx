'use client'

import { createContext, useEffect, useContext, ReactNode, useState, useMemo } from "react";
import { setCookie, destroyCookie, parseCookies } from "nookies";
import Router from "next/router";
import { api } from "@/app/services/axios-config";
import { toast } from "react-toastify";


type User = {
    email: string;
    role: string;
    _id: string;
};
type AuthProviderProps = {
    children: ReactNode;
};
type LoginCredentials = {
    email: string;
    password: string;
};
type AuthContextData = {
    login(credentials: LoginCredentials): Promise<void>;
    isAuthenticated: boolean;
    user: User | null;
};
export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const isAuthenticated = !!user;
    const parseJSON = (json: string) => {
        try {
            return JSON.parse(json);
        } catch (error) {
            return null;
        }
    };
    useEffect(() => {
        const {
            "pe_na_trilha.user": userComingFromCookie,
            "pe_na_trilha.refreshToken": refreshToken = null,
        } = parseCookies();
        const parsedUser = parseJSON(userComingFromCookie);
        if (parsedUser && refreshToken) {
            setUser(parsedUser);
        } else {
            signOut();
        }
    }, []);

    const login = async ({ email, password }: LoginCredentials) => {
        try {
            const response = await api.post("/sessions/password", {
                email,
                password,
            });

            const { accessToken: token, refreshToken, user: userComing } = response?.data || {};
            setCookie(undefined, "pe_na_trilha.token", token, {
                maxAge: 60 * 60 * 24,
                path: "/",
            });
            setCookie(undefined, "pe_na_trilha.refreshToken", refreshToken, {
                maxAge: 60 * 60 * 24,
                path: "/",
            });
            setCookie(undefined, "pe_na_trilha.user", JSON.stringify(userComing), {
                maxAge: 60 * 60 * 24,
                path: "/",
            });
            setUser(userComing);
            api.defaults.timeout = 5000;
            api.defaults.headers["Authorization"] = `Bearer ${token}`;
            toast.success('Login realizado com sucesso.')
            // location.pathname = '/'
        } catch (err: any) {
            toast.error(err?.response?.data?.message || 'Erro no servidor')
        }
    };
    const contextValue = useMemo(
        () => ({ login, isAuthenticated, user }),
        [isAuthenticated, user]
    );
    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
export const useAuth = () => useContext(AuthContext);

export function signOut() {
    destroyCookie(undefined, "pe_na_trilha.token");
    destroyCookie(undefined, "pe_na_trilha.refreshToken");
    destroyCookie(undefined, "pe_na_trilha.user");
    // location.pathname = '/'
}