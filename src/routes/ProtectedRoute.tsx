import { Outlet, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext"
import useTokenValidation from "../custom-hooks/useTokenValidation";
import { ReactNode, useCallback, useEffect } from "react";

type ProtectedRouteProps = {
    // openLoginForm: () => void,
    openLoginForm: (path?: string, state?: any) => void;
    children: ReactNode
}

export default function ProtectedRoute({ openLoginForm, children }: ProtectedRouteProps) {
    const { currentUser, setCurrentUser } = useUser();
    const location = useLocation();

    const handleSessionExpired = useCallback((expired: boolean) => {
        if (expired) {
            setCurrentUser(null);
        }
    }, [setCurrentUser]);

    // set user to null if token is expired
    const isTokenExpired = useTokenValidation({
        setIsSessionExpired: handleSessionExpired,
        userId: currentUser?.id || "", // Non-null assertion
    });

    useEffect(() => {
        if (isTokenExpired || !currentUser) {
            openLoginForm(location.pathname, location.state);
        }
    }, [isTokenExpired, currentUser, location.pathname, location.state, openLoginForm]);

    if (isTokenExpired || !currentUser) {
        return null;
    }

    return children ? <>{children}</> : <Outlet />;
}