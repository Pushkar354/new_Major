import { useState,createContext } from "react";






export const AppContext=createContext();
const AppContextProvider=(props)=>{

 const [loggedIn,setLoggedIn]=useState(false);
const value={loggedIn,setLoggedIn};
    return(
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;