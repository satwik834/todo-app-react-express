import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';


export const AuthContext = createContext();

const API = 'http://localhost:3000/auth';

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const response = await axios.get(`${API}/me`, { 
                    withCredentials: true 
                });
                if (response?.data?.user) {
                    setUser(response.data.user);
                    setIsLoggedIn(true);
                }
            } catch (err) {
                setUser(null);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        
        checkAuth();
    }, []);


    const login = async (email,password) => {
        try{
            const response = await axios.post(`${API}/login`,{
                email,
                password
            },{withCredentials: true});

            setUser(response.data.user)
            setIsLoggedIn(true);
            return response.data;
        }catch(err){
            throw err.response.data || {error: "login failed "}
        }

    }
    const register = async (username,email,password) => {
        try{
            const response = await axios.post(`${API}/register`,{
                username,
                email,
                password
            },{withCredentials: true});
            return response.data;
        }catch(err){
            throw err.response.data || {error: "register failed "}
        }

    }
    const logout = async () => {
        try{
            const response = await axios.post(`${API}/logout`,{},{withCredentials: true});

            setUser(null)
            setIsLoggedIn(false);
        }catch(err){
            throw err.response.data || {error: "logout failed "}
        }

    }
    const value = {
        user,
        isLoggedIn,
        login,
        register,
        logout,
        loading
    }
    if (loading){
        return <div>loading</div>
    }




    return(
        <AuthContext.Provider value={value} >{children}</AuthContext.Provider>
    )
}