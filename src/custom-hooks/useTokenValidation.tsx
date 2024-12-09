import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { RefreshTokenResponse } from "../types/RefreshTokenResponse";
import { useLocation } from "react-router-dom";

type useTokenValidationProps = {
    setIsSessionExpired: (expired: boolean) => void,
    userId: string
}

// Custom hook that checks if jwt is expired
export default function useTokenValidation({ setIsSessionExpired, userId }: useTokenValidationProps): boolean {
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);
    const location = useLocation();

    useEffect(() => {
        if (!userId) {
            setIsTokenExpired(true);
            setIsSessionExpired(true);
        }

        const checkTokenExpiration = async () => {
            try {
                const jwt = localStorage.getItem("authToken");
                const tokenExpiration = localStorage.getItem("authTokenExpiry");
                const refreshToken = localStorage.getItem("refreshToken");

                if (jwt && tokenExpiration) {
                    const expiresAt = parseInt(tokenExpiration, 10);
                    const now = Date.now();

                    // If the token is expired
                    if (now >= expiresAt) {

                        if (refreshToken) {
                            try {
                                const response: RefreshTokenResponse = await ApiService.post<RefreshTokenResponse>(
                                    "/auth/refresh-token",
                                    { refreshToken, userId });
                                const { jwt, expiresIn } = response;
                                const expiryDate = new Date().getTime() + expiresIn;
                                localStorage.setItem("authToken", jwt);
                                localStorage.setItem("authTokenExpiry", expiryDate.toString());
                                setIsTokenExpired(false);
                                setIsSessionExpired(false);
                            } catch (error) {
                                console.error("Failed to refresh token:",);
                                clearLocalStorage();
                                setIsTokenExpired(true);
                                setIsSessionExpired(true);
                            }
                        } else {
                            clearLocalStorage();
                            setIsTokenExpired(true);
                            setIsSessionExpired(true);
                        }
                    } else {
                        setIsTokenExpired(false);
                        setIsSessionExpired(false);
                    }
                } else {
                    setIsTokenExpired(true);
                    setIsSessionExpired(true);
                }
            } catch (error: any) {
                console.error("Error checking token expiration:", error);
                clearLocalStorage();
                setIsTokenExpired(true);
                setIsSessionExpired(true);
            }
        }

        const clearLocalStorage = () => {
            localStorage.removeItem("authToken");
            localStorage.removeItem("authTokenExpiry");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userId");
        };

        // Initial check on mount
        checkTokenExpiration();

    }, [userId, setIsSessionExpired, location.pathname]);

    return isTokenExpired;
}