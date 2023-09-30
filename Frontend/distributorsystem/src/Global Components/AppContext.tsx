import React, { createContext, useState } from "react";


interface AppContextContextDoer{
    objectid: string,
    setObjectId : (objectid: string) => void;
}

export const AppContext = createContext<AppContextContextDoer | null>(null);

export default function AppProvider(props:{children:React.ReactNode}){
    const [objectid, setObjectID] = useState<string>('');
      
      const setObjectId = (objectid:string) => {
        setObjectID(objectid);
      }

    return (
        <AppContext.Provider value={{objectid, setObjectId}}>
            {props.children}
        </AppContext.Provider>
    )
}