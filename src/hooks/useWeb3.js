import { useState, useEffect } from 'react';
import Web3 from 'web3';
import { BSC_NODE_URL } from '../config/constatns/baseItem';

const useWeb3 = () => {
    const [web3, setWeb3] = useState();

    useEffect(() => {
        setWeb3(new Web3(BSC_NODE_URL));
    }, [])

    return web3;
}

export default useWeb3;