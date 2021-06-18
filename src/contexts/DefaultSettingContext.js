import { useState, useEffect, createContext } from 'react';
import Web3 from 'web3';
import {
    BSC_NODE_URL,
    WBNB_ADDRESS,
    BUSD_ADDRESS,
    PANCAKE_FACTORY_V1_ADDRESS,
    PANCAKE_FACTORY_V2_ADDRESS
} from '../config/constatns/baseItem';

//abi
import PancakeSwap from '../config/abi/PancakeSwap.json';
import pancakeFactoryV1 from '../config/abi/pancakeFactoryV1.json';
import pancakeFactoryV2 from '../config/abi/pancakeFactoryV2.json';

export const DefaultSettingContext = createContext();

const web3 = new Web3(BSC_NODE_URL);

const DefaultSettingContextProvider = ({ children }) => {
    const [wbnbContract, setWbnbContract] = useState();
    const [busdContract, setBusdContract] = useState();
    const [pancakeFactoryV1Contract, setPancakeFactoryV1Contract] = useState();
    const [pancakeFactoryV2Contract, setPancakeFactoryV2Contract] = useState();

    //WBNB / BUSD PAIR
    const [pairAddress, setPairAddress] = useState();
    const [pairAddress2, setPairAddress2] = useState();

    // PAIR CONTRACT
    const [pairAddressContract, setPairAddressContract] = useState();

    const initialSetting = () => {
        setWbnbContract(new web3.eth.Contract(PancakeSwap, WBNB_ADDRESS));
        setBusdContract(new web3.eth.Contract(PancakeSwap, BUSD_ADDRESS));
        setPancakeFactoryV1Contract(new web3.eth.Contract(pancakeFactoryV1, PANCAKE_FACTORY_V1_ADDRESS));
        setPancakeFactoryV2Contract(new web3.eth.Contract(pancakeFactoryV2, PANCAKE_FACTORY_V2_ADDRESS));
    }

    useEffect(() => {
        if (!pairAddress2) return;
        const pairAddressContractSetting = async () => {
            setPairAddressContract(new web3.eth.Contract(PancakeSwap, pairAddress2));
        }

        pairAddressContractSetting();
    }, [pairAddress2])

    useEffect(() => {
        const pairAddressSetting = async () => {
            if (!pancakeFactoryV1Contract) return;

            setPairAddress(await pancakeFactoryV1Contract.methods.getPair(WBNB_ADDRESS, BUSD_ADDRESS).call());
            setPairAddress2(await pancakeFactoryV2Contract.methods.getPair(WBNB_ADDRESS, BUSD_ADDRESS).call());
        }

        pairAddressSetting();
    }, [pancakeFactoryV1Contract, pancakeFactoryV2Contract]);

    useEffect(() => {
        initialSetting();
    }, []);

    return (
        <DefaultSettingContext.Provider
            value={{
                wbnbContract,
                busdContract,
                pancakeFactoryV1Contract,
                pancakeFactoryV2Contract,
                pairAddress,
                pairAddress2,
                pairAddressContract,
            }}
        >
            {children}
        </DefaultSettingContext.Provider>
    )
}

export default DefaultSettingContextProvider;

