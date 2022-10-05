import React, { createContext, useEffect, useState } from "react";
import LoadingGif from "/loading.gif"

export const LoadingContext = createContext();

export function LoadingProvider({children}) {
    const [loading, setLoading] = useState(true)
    return (
        <LoadingContext.Provider
            value={{
                loading, setLoading
            }}
        >
            {loading && 
                <div className="fixed h-full w-full bg-[rgba(0,0,0,.84)] backdrop-filter grid place-items-center">
                    <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                </div>
            }
            {children}
        </LoadingContext.Provider>
    );
}
