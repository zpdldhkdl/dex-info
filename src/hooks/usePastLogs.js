import { useEffect, useState } from 'react';
import Web3 from 'web3';
import { BSC_NODE_URL } from '../config/constatns/baseItem';

const usePastLogs = lpAddress => {
    const [pastLogs, setPastLogs] = useState();

    useEffect(() => {
        const web3 = new Web3(BSC_NODE_URL);
        let first = true;
        let lastBlock = 0;

        const logInterval = setInterval(async () => {
            const fromBlock = await web3.eth.getBlockNumber();

            if (lastBlock === fromBlock) return;

            await web3.eth.getPastLogs({
                fromBlock: first ? fromBlock - 1000 : fromBlock,
                toBlock: 'latest',
                address: lpAddress,
                topics:
                    ['0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822']
                // ,
                //     null,
                //     [`0x000000000000000000000000${lpAddress.replace('0x', '')}`]],
            })
                .then(logs => {
                    if (!logs || !logs.length) return;

                    if (first) first = false;

                    lastBlock = fromBlock;
                    setPastLogs(logs);
                });
        }, 3000);

        return () => clearInterval(logInterval);
    }, [lpAddress]);

    return pastLogs;
}

export default usePastLogs;