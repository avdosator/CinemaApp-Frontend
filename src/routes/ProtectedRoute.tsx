import { Outlet } from "react-router-dom";
import { useUser } from "../context/UserContext"
import useTokenValidation from "../custom-hooks/useTokenValidation";
import { ReactNode, useState } from "react";
import SessionExpiredAlert from "../components/shared-components/session-expired-alert/SessionExpiredAlert";

type ProtectedRouteProps = {
    openLoginForm: () => void,
    children: ReactNode
}

export default function ProtectedRoute({ openLoginForm, children }: ProtectedRouteProps) {
    const { currentUser, setCurrentUser } = useUser();
    const [showSessionExpired, setShowSessionExpired] = useState<boolean>(false);

    // set user to null if token is expired
    const isTokenExpired = useTokenValidation((expired) => {
        if (expired) {
            setCurrentUser(null);
            setShowSessionExpired(true);
        }
    });

    if (isTokenExpired || !currentUser) {
        if (showSessionExpired) {
            return (<SessionExpiredAlert openLoginForm={openLoginForm} />)
        }
        // Returning null ensures nothing is rendered until the alert is displayed
        return null;
    }
    // return {children};
    return children ? <>{children}</> : <Outlet />;

}