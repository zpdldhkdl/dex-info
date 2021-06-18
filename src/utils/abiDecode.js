import Web3 from 'web3';
import { BSC_NODE_URL } from '../config/constatns/baseItem';
import lpAbi from '../config/abi/lpAbi.json';

const WBNB_DECIMAL = 18;

const ABI = [
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0In",
        "type": "uint256"
    },
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1In",
        "type": "uint256"
    },
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount0Out",
        "type": "uint256"
    },
    {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount1Out",
        "type": "uint256"
    }
];

const abiDecode = async (logs, decimals, address, lpAddress) => {
    const web3 = new Web3(BSC_NODE_URL);

    const lpAddressContract = new web3.eth.Contract(lpAbi, lpAddress);

    const token1 = await lpAddressContract.methods.token1().call();

    let returnLogs = [];

    if (logs === undefined) return;

    logs.map(async log => {
        const { transactionHash } = log;

        const decodeLog = web3.eth.abi.decodeLog(ABI, log.data);

        const { amount0In, amount1In, amount0Out, amount1Out } = decodeLog;

        let returnLog = {
            type: 'BUY',
            tokenAmount: 0,
            bnbAmount: 0,
            transactionHash: transactionHash,
        };

        if (token1.toLowerCase() === address.toLowerCase()) {
            if (amount1In > 0) {
                returnLog['tokenAmount'] = (amount1In * (1 / (Math.pow(10, decimals)))).toFixed(4);
                returnLog['bnbAmount'] = (amount0Out * (1 / (Math.pow(10, WBNB_DECIMAL)))).toFixed(6);
            } else {
                returnLog['type'] = 'SELL';
                returnLog['tokenAmount'] = (amount1Out * (1 / (Math.pow(10, decimals)))).toFixed(4);
                returnLog['bnbAmount'] = (amount0In * (1 / (Math.pow(10, WBNB_DECIMAL)))).toFixed(6);
            }
        } else {
            if (amount1In > 0) {
                returnLog['tokenAmount'] = (amount0Out * (1 / (Math.pow(10, decimals)))).toFixed(4);
                returnLog['bnbAmount'] = (amount1In * (1 / (Math.pow(10, WBNB_DECIMAL)))).toFixed(6);
            } else {
                returnLog['type'] = 'SELL';
                returnLog['tokenAmount'] = (amount0In * (1 / (Math.pow(10, decimals)))).toFixed(4);
                returnLog['bnbAmount'] = (amount1Out * (1 / (Math.pow(10, WBNB_DECIMAL)))).toFixed(6);
            }
        }


        return returnLogs.push(returnLog);
    })

    return returnLogs;
}

export default abiDecode;