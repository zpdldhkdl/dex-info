import React, { useState, createContext, useEffect } from 'react';

export const DexInfoContext = createContext();

const initState = {
    address: null,
}

const DexInfoContextProvider = ({ children }) => {
    const [tokenInfo, setTokenInfo] = useState(initState);

    const tokenInfoSetting = address => {
        setTokenInfo({
            address: address
        })
    }

    useEffect(() => {
        setTokenInfo(initState);
    }, []);

    return (
        <DexInfoContext.Provider value={{ tokenInfo, tokenInfoSetting }}>
            {children}
        </DexInfoContext.Provider>
    )
}

export default DexInfoContextProvider;