import { useEffect, useState } from "react";

// Custom hook that checks if jwt is expired
export default function useTokenValidation(setIsSessionExpired: (expired: boolean) => void): boolean {
    const [isTokenExpired, setIsTokenExpired] = useState<boolean>(false);

    useEffect(() => {
        const checkTokenExpiration = () => {
            try {
                const jwt = localStorage.getItem("authToken");
                const tokenExpiration = localStorage.getItem("authTokenExpiry");

                if (jwt && tokenExpiration) {
                    const expiresAt = parseInt(tokenExpiration, 10);
                    console.log(expiresAt);
                    const now = Date.now();

                    // If the token is expired
                    if (now >= expiresAt) {
                        console.log("Token expired, updating UI...");
                        localStorage.removeItem("authToken"); // Clear the token
                        localStorage.removeItem("authTokenExpiry");
                        setIsTokenExpired(true);
                        setIsSessionExpired(true); // Notify the app that the session has expired
                    }
                } else {
                    setIsTokenExpired(true);
                    setIsSessionExpired(true);
                }

            } catch (error: any) {
                console.error("Error checking token expiration:", error);
                setIsTokenExpired(true); // Safeguard in case of an unexpected issue
                setIsSessionExpired(true);
            }

        }

        // Initial check on mount
        checkTokenExpiration();

    }, [setIsSessionExpired]);

    return isTokenExpired;
}