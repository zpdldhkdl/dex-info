import { useState, useEffect } from 'react';
import PancakeSwap from '../config/abi/PancakeSwap.json';
import { PANCAKE_LOGO_URI_BASE } from '../config/constatns/baseItem';
import Web3 from 'web3';
import { BSC_NODE_URL } from '../config/constatns/baseItem';

const initialTokenInfo = {
    name: '',
    address: '',
    symbol: '',
    decimals: '',
    logoURI: '',
    nowPrice: 0,
    totalSupply: 0,
    marketCap: 0,
}

const useTokenInfo = address => {
    const [tokenInfo, setTokenInfo] = useState(initialTokenInfo);

    useEffect(() => {
        if (!address) return;
        const web3 = new Web3(BSC_NODE_URL);
        const contract = new web3.eth.Contract(PancakeSwap, address);

        const getTokenInfo = async () => {
            const name = await contract.methods.name().call();
            const symbol = await contract.methods.symbol().call();
            const decimals = await contract.methods.decimals().call();
            let totalSupply = await contract.methods.totalSupply().call();
            totalSupply = Math.floor(totalSupply * (1 / (Math.pow(10, decimals))));
            const logoURI = `${PANCAKE_LOGO_URI_BASE}${address}.png`;

            // return {address, name, symbol, totalSupply, decimals, logoURI};

            setTokenInfo({
                address: address,
                name: name,
                symbol: symbol,
                totalSupply: totalSupply,
                decimals: decimals,
                logoURI: logoURI,
            })
        }

        getTokenInfo();
    }, [address]);

    return tokenInfo;
}

export default useTokenInfo;