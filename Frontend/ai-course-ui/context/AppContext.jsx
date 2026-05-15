import { useState } from "react";






export const AppContext=createContext();
const AppContextProvider=(props)=>{

 const [loggedIn,setLoggedIn]=useState(false);
const value={loggedIn,setLoggedIn};
    return(
        <AppContextProvider value={value}>
            {props.children}
        </AppContextProvider>
    )
}
export default AppContextProvider;