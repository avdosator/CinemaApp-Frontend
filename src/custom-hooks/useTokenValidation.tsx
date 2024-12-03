import { useEffect } from "react";
import { useUser } from "../context/UserContext";

// Custom hook that checks if jwt is expired
export default function useTokenValidation(setIsSessionExpired: (expired: boolean) => void) {
    const { setCurrentUser } = useUser();

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
                        setCurrentUser(null); // Reset user state in context
                        setIsSessionExpired(true); // Notify the app that the session has expired
                    }
                }
            } catch (error: any) {
                console.error("Error checking token expiration:", error);
                setCurrentUser(null); // Safeguard in case of an unexpected issue
                setIsSessionExpired(true);
            }

        }

        // Initial check on mount
        checkTokenExpiration();

    }, [setCurrentUser, setIsSessionExpired]);
}