import { createContext, ReactNode, useContext, useState } from "react";
import { User } from "../types/User";

type UserContextType = {
    currentUser: User | null;
    setCurrentUser: (user: User | null) => void;
}
const UserContext = createContext<UserContextType | undefined>(undefined);

export default function UserProvider({ children }: { children: ReactNode }) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

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