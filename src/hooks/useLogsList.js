import { useState, useEffect } from 'react';
import abiDecode from '../utils/abiDecode';
import usePastLogs from './usePastLogs';

const useLogsList = (lpAddress, decimals, address) => {
    const [list, setList] = useState([]);

    const logs = usePastLogs(lpAddress);

    useEffect(() => {
        setList([]);
    }, [lpAddress])

    useEffect(() => {
        if (!logs) return;
        const fetchDecodeLogs = async () => {
            const decodeLogs = await abiDecode(logs, decimals, address, lpAddress);

            setList(list => list.concat(decodeLogs));
        }

        fetchDecodeLogs();

    }, [logs, decimals, address])

    return list;
}

export default useLogsList;