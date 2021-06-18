import { useCallback } from 'react';
import { useState, useEffect, useContext } from 'react';
import { DefaultSettingContext } from '../contexts/DefaultSettingContext';
import useWeb3 from './useWeb3';

const useWbnbPrice = () => {
    const { wbnbContract, busdContract, pairAddressContract, pairAddress2 } = useContext(DefaultSettingContext);
    const [wbnbPrice, setWbnbPrice] = useState(0);
    const web3 = useWeb3();

    const getWbnbPrice = useCallback(async () => {
        if (!pairAddressContract || !web3) return;

        let wbnbBalance = await wbnbContract.methods.balanceOf(pairAddress2).call();
        let busdBalance = await busdContract.methods.balanceOf(pairAddress2).call();

        wbnbBalance = parseFloat(web3.utils.fromWei(wbnbBalance, 'ether')).toFixed(5);
        busdBalance = parseFloat(web3.utils.fromWei(busdBalance, 'ether')).toFixed(5);

        const WbnbPrice = (parseFloat(busdBalance / wbnbBalance)).toFixed(5);

        if (wbnbPrice === WbnbPrice) return;

        setWbnbPrice(WbnbPrice);
    }, [busdContract, pairAddress2, pairAddressContract, wbnbContract, web3, wbnbPrice])

    useEffect(() => {
        const timer = setInterval(() => {
            getWbnbPrice();
        }, 5000);

        return () => {
            clearInterval(timer);
        }
    }, [getWbnbPrice])

    return wbnbPrice;
}

export default useWbnbPrice;