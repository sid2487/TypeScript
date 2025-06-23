import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import baseURL from "../utils/api";

interface UserType {
    firstName: string;
    lastName: string;
    email: string;
}

interface AuthContextType {
    isAuthenticated: boolean,
    setIsAuthenticated: (value: boolean) => void;
    loading: boolean;
    user: UserType | null;
    setUser: (user: UserType | null) => void
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<UserType | null>(null);

    useEffect(() => {
        const verifyUser = async () => {
            try {
                const res = await axios.get(`${baseURL}/user/me`, {
                    withCredentials: true,
                });
                console.log("me data:", res.data);

                if(res.data.success){
                    setIsAuthenticated(true);
                    setUser(res.data.user);
                    
                }
            } catch (error) {
                setIsAuthenticated(false);
                setUser(null);
            } finally{
                setLoading(false);
            }
        };

        verifyUser();
    }, [])


    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, user, setUser}}>
            {children}
        </AuthContext.Provider>
    )
};

export const useAuth = () => {
    const ctx = useContext(AuthContext);
    if(!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}



