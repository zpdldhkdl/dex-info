import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { BSC_NODE_URL } from '../config/constatns/baseItem';

const useBlock = () => {
    const [block, setBlock] = useState(0);

    const web3 = new Web3(BSC_NODE_URL);

    useEffect(() => {
        const interval = setInterval(async () => {
            const latestBlockNumber = await web3.eth.getBlockNumber();

            if(block === latestBlockNumber) return;

            setBlock(latestBlockNumber);
            console.log(block)

        }, 1000)
        return () => clearInterval(interval);
    }, [block, web3.eth])

    return block;
}

export default useBlock;