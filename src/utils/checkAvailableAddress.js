import Web3 from 'web3'
import { BSC_NODE_URL } from '../config/constatns/baseItem';
import PancakeSwap from '../config/abi/PancakeSwap.json';

const checkAailableAddress = async (address) => {
    const web3 = new Web3(BSC_NODE_URL);
    const contract = new web3.eth.Contract(PancakeSwap, address);

    try {
        const name = await contract.methods.name().call();
        if (name) return true;
        return false;
    }
    catch {
        return false;
    }
}

export default checkAailableAddress;