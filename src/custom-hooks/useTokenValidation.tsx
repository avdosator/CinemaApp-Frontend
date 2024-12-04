import { useEffect, useState } from "react";
import ApiService from "../service/ApiService";
import { RefreshTokenResponse } from "../types/RefreshTokenResponse";

type useTokenValidationProps = {
    setIsSessionExpired: (expired: boolean) => void,
    userId: string
}

// Custom hook that checks if jwt is expired
export default function useTokenValidation({ setIsSessionExpired, userId }: useTokenValidationProps): boolean {
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

    useEffect(() => {
        if (!userId) {
            console.log("No userId provided, treating token as expired.");
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
                        console.log("Token expired, checking for refresh token...");

                        if (refreshToken) {
                            try {
                                const response: RefreshTokenResponse = await ApiService.post<RefreshTokenResponse>(
                                    "/auth/refresh-token",
                                    { refreshToken, userId });
                                const { newJwt, newExpiresIn } = response;
                                const expiryDate = new Date().getTime() + newExpiresIn;
                                localStorage.setItem("authToken", newJwt);
                                localStorage.setItem("authTokenExpiry", expiryDate.toString());
                                setIsTokenExpired(false);
                                setIsSessionExpired(false);
                                console.log("Token refreshed successfully.");
                            } catch (error) {
                                console.error("Failed to refresh token:",);
                                clearLocalStorage();
                                setIsTokenExpired(true);
                                setIsSessionExpired(true);
                            }
                        } else {
                            console.log("No refresh token, logging out...");
                            clearLocalStorage();
                            setIsTokenExpired(true);
                            setIsSessionExpired(true);
                        }
                    } else {
                        console.log("Token is still valid.");
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
        };

        // Initial check on mount
        checkTokenExpiration();

    }, [setIsSessionExpired]);

    return isTokenExpired;
}