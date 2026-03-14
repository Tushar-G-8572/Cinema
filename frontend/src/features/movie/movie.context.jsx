import { createContext, useState } from "react";


export const MovieContext = createContext();


export const MovieProvider = ({children})=>{
   const [moviesData,setMoviesData] = useState(null);
   const [loading,setLoading] = useState(true);

   return (
    <MovieContext.Provider value={{moviesData,loading,setLoading,setMoviesData}} >
        {children}
    </MovieContext.Provider>
   )
}