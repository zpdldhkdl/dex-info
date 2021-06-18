import React from 'react';
import styled from 'styled-components';
import useLogsList from '../../hooks/useLogsList';
import { Spin } from 'antd';
import numberWithCommas from '../../utils/numberWithCommas';

const widthBreakPoint = '1000px';

const TokenTransactionBox = ({ address, lpAddress, decimals, wbnbPrice, symbol }) => {
    const list = useLogsList(lpAddress, decimals, address);

    return (
        <>
            { (list.length !== 0 && list) ?
                <TokenTransactionBoxWrapper>
                    <TokenTransactionContentWrapper>
                        <div style={{ color: 'white', fontWeight: '600' }}>
                            <ExplainLine sell /> SELL
                            <ExplainLine style={{ marginLeft: '10px' }} /> BUY
                        </div>
                        <table>
                            <thead>
                                <tr>
                                    <th className="theadFixed">token</th>
                                    <th className="theadFixed">price</th>
                                    <th className="theadFixed">price/token</th>
                                    <th className="theadFixed">txhash</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    list.reverse().map(({ tokenAmount, bnbAmount, type, transactionHash }, index) => {
                                        if (tokenAmount < 1) return <></>;
                                        return (
                                            <tr style={type === 'SELL' ? { color: 'red' } : { color: 'green' }} key={index}>
                                                <td>{numberWithCommas(`${tokenAmount} ${symbol}`)}</td>
                                                <td>
                                                    {`$${numberWithCommas((bnbAmount * wbnbPrice).toFixed(2))}`}
                                                    <div style={{ fontSize: '0.5rem' }}>{`${bnbAmount} BNB`}</div>
                                                </td>
                                                <td>{`$${(type === 'SELL' ? (bnbAmount * wbnbPrice) / tokenAmount : (bnbAmount * wbnbPrice) / tokenAmount).toFixed(2)}`}</td>
                                                <td>
                                                    <a href={`https://bscscan.com/tx/${transactionHash}`} target="_blank" rel="noreferrer">
                                                        {`${transactionHash.substr(0, 5)}...${transactionHash.substr(transactionHash.length - 5, transactionHash.length)}`}
                                                    </a>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </TokenTransactionContentWrapper>
                </TokenTransactionBoxWrapper>
                :
                <SpinWrapper>
                    <Spin size="large" color="red" />
                    <h1 style={{ display: 'block', color: 'gray' }}>Waiting for Transaction List</h1>
                </SpinWrapper>
            }
        </>
    );
};

const SpinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`;

const ExplainLine = styled.div`
    display: inline-block;
    width: 1.875rem;
    height: 5px;
    background: ${props => props.sell ? 'red' : 'green'};
    margin-right: 10px;
`;

const TokenTransactionContentWrapper = styled.div`
    position: relative;
    display: block;
    width: 95%;
    height: 95%;
    margin: 0 auto;
    margin-top: 1rem;
    overflow-y: auto;
    overflow-x: hidden;
    &::-webkit-scrollbar {
        width: 10px;
    };
    &::-webkit-scrollbar-thumb {
        background-color: #50555e;
    };
    &::-webkit-scrollbar-track {
        background-color: #282c34;
    };
    @media screen and (max-width: ${widthBreakPoint}) {
        height: 16rem;
    }

    table {
        border-left: 2px solid #18181B; 
        border-right: 2px solid #18181B;
        border-bottom: 2px solid #18181B;
        width: 100%;
        color: white;
    }
    thead th {
        background: #050506;
        font-size: 1.1rem;
    }

    .theadFixed {
        position: sticky;
        top: 0;
    }

    td, th {
        text-align: right;
        padding: 8px;
    }
    tbody tr {
        background: #27272A;
        font-weight: 600;
    }

    tr:nth-child(even) {
        background-color: #18181B;
    }
`;

const TokenTransactionBoxWrapper = styled.div`
    position: absolute;
    display: inline-block;
    margin-top: 1rem;
    width: 50vw;
    height: 36rem;
    background: #27272A;
    border-radius: 0.3rem;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
    @media screen and (max-width: ${widthBreakPoint}) {
        display: block;
        margin-top: 1.5rem;
        top: 20rem;
        width: 90%;
        height: 18rem;
    }
`;


export default React.memo(TokenTransactionBox);