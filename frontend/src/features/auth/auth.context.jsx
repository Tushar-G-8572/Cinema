import { createContext } from "react";
import { useState,useEffect } from "react";
import { toast } from "react-toastify";


export const AuthContext = createContext();

export const AuthProvider = ({children})=>{
    
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);
    
    function notify(message,type='success'){
       return toast(message,{type});
    }

    return <AuthContext.Provider value={{user,setUser,loading,setLoading,notify}}>
            {children}
            </AuthContext.Provider>
}