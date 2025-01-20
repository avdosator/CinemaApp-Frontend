import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/User";
import ApiService from "../service/ApiService";
import { RefreshTokenResponse } from "../types/RefreshTokenResponse";

type UserContextType = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        // On app startup, restore session and set user using refreshToken and userId
        const userId = localStorage.getItem("userId");
        const refreshToken = localStorage.getItem("refreshToken");

        if (userId && refreshToken) {
            ApiService.post<RefreshTokenResponse>("/auth/refresh-token", { userId, refreshToken })
                .then((response) => {
                    const { jwt, expiresIn } = response;
                    const expiryDate = Date.now() + expiresIn;

                    // Store new tokens in localStorage
                    localStorage.setItem("authToken", jwt);
                    localStorage.setItem("authTokenExpiry", expiryDate.toString());

                    // Fetch user details and set context
                    return ApiService.get<User>(`/users/${userId}`);
                })
                .then((user) => {
                    setCurrentUser(user); // Set user in context
                })
                .catch((error) => {
                    console.error("Failed to refresh token or fetch user:", error.response?.data || error.message);
                    localStorage.removeItem("userId");
                    localStorage.removeItem("authToken");
                    localStorage.removeItem("authTokenExpiry");
                    localStorage.removeItem("refreshToken");
                    setCurrentUser(null);
                });
        }
    }, []);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }} >
            {children}
        </UserContext.Provider >
    );
}

export function useUser(): UserContextType {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}