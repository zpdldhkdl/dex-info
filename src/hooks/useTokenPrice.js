import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { BSC_NODE_URL, PANCAKE_FACTORY_V2_ADDRESS, WBNB_ADDRESS } from '../config/constatns/baseItem';
import pancakeFactoryV2 from '../config/abi/pancakeFactoryV2.json';
import PancakeSwap from '../config/abi/PancakeSwap.json';

const useTokenPrice = (address, wbnbPrice) => {
    const web3 = new Web3(BSC_NODE_URL);
    const [tokenPrice, setTokenPrice] = useState(0);
    const [lpAddress, setLpAddress] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const pancakeFactoryV2Contract = new web3.eth.Contract(pancakeFactoryV2, PANCAKE_FACTORY_V2_ADDRESS);
            const wbnbContract = new web3.eth.Contract(PancakeSwap, WBNB_ADDRESS);
            const currentTokenContract = new web3.eth.Contract(PancakeSwap, address);

            const lpAddr = await pancakeFactoryV2Contract.methods.getPair(WBNB_ADDRESS, address).call();
            setLpAddress(lpAddr);

            const currentTokenDecimal = await currentTokenContract.methods.decimals().call();
            const wbnbDecimal = await wbnbContract.methods.decimals().call();

            let wbnbBalance = await wbnbContract.methods.balanceOf(lpAddr).call();
            wbnbBalance = (wbnbBalance * (1 / Math.pow(10, wbnbDecimal)))
            let currentTokenBalance = await currentTokenContract.methods.balanceOf(lpAddr).call();
            currentTokenBalance = (currentTokenBalance * (1 / Math.pow(10, currentTokenDecimal)))

            setTokenPrice(wbnbBalance / currentTokenBalance);
        }
        fetchData();
    }, [wbnbPrice, address, web3.eth.Contract, lpAddress]);

    return {
        tokenPrice,
        lpAddress
    };
};

export default useTokenPrice;