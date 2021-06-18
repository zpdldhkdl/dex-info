import React, { useContext, useRef } from 'react';
import styled from 'styled-components';
import { DexInfoContext } from '../../contexts/DexInfoContext';
import useTokenInfo from '../../hooks/useTokenInfo';
import useTokenPrice from '../../hooks/useTokenPrice';
import TokenTransactionBox from './TokenTransactionBox';
import numberWithCommas from '../../utils/numberWithCommas';
import { Spin } from 'antd';
import { Helmet } from 'react-helmet';
import useWbnbPrice from '../../hooks/useWbnbPrice';
import priceRangeCheck from '../../utils/priceRangeCheck';

const widthBreakPoint = '1000px';

const TokenInfo = () => {
    const { tokenInfo: { address } } = useContext(DexInfoContext);
    const tokenImageRef = useRef();
    const wbnbPrice = useWbnbPrice();
    const { tokenPrice, lpAddress } = useTokenPrice(address, wbnbPrice);
    const { name, symbol, totalSupply, logoURI, decimals } = useTokenInfo(address);

    const price = priceRangeCheck(tokenPrice, wbnbPrice);

    return (
        <>
            <Wrapper>
                {
                    price ?
                        <>
                            <Helmet>
                                <title>{`${name}/BNB ${price}`}</title>
                            </Helmet>
                            <TokenInfoBox>
                                <TokenImage
                                    src={logoURI}
                                    alt="tokenImage"
                                    ref={tokenImageRef}
                                />
                                <TokenText style={{ color: 'white', fontSize: '0.75rem', marginTop: '0.5rem' }}>
                                    {`(${symbol}/BNB)`}
                                </TokenText>
                                <ItemDescriptor>Token Name</ItemDescriptor>
                                <TokenText>
                                    {name}
                                </TokenText>

                                <ItemDescriptor>TotalSupply</ItemDescriptor>
                                <TokenText style={{ fontSize: '1.25rem' }}>{numberWithCommas(totalSupply)}</TokenText>

                                <ItemDescriptor>MarketCap</ItemDescriptor>
                                <TokenText>{`$${Math.floor(totalSupply * price)}`}</TokenText>

                                <ItemDescriptor>TokenPrice</ItemDescriptor>
                                <TokenText>
                                    {`$${price}`}
                                </TokenText>
                            </TokenInfoBox>
                            <TokenTransactionBox
                                address={address}
                                lpAddress={lpAddress}
                                decimals={decimals}
                                wbnbPrice={wbnbPrice}
                                symbol={symbol}
                            />
                        </>
                        :
                        <SpinWrapper>
                            <Spin size="large" color="red" />
                            <h1 style={{ display: 'block', color: 'gray' }}>Waiting for Initial Setting</h1>
                        </SpinWrapper>
                }
            </Wrapper>
        </>
    )
}

const SpinWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ItemDescriptor = styled.div`
    color: white;
    font-size: 1rem;
`;

const Wrapper = styled.div`
    display: inline-block;
    position: relative;
    margin-top: 1rem;
    left: 20vw;
    top: 5.25rem;
    width: 80vw;
    height: 17.5rem;
    @media screen and (max-width: ${widthBreakPoint}) {
        display: flex;
        position: absolute;
        width: 100%;
        left: 0;
        align-items: center;
        justify-content: center;
        top: 8rem;
    }
`;

const TokenInfoBox = styled.div`
    display: inline-block;
    background: #27272A;
    margin: 1rem;
    border-radius: 0.3rem;
    width: 15rem;
    height: auto;
    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
    overflow: auto;
    text-align: center;
`;

const TokenImage = styled.img`
    width: 4rem;
    height: 4rem;
    margin-top: 1rem;
`;

const TokenText = styled.div`
    font-size: 1rem;
    font-weight: 600;
    color: grey;
    font-size: 1.5rem;
`;

export default React.memo(TokenInfo);
