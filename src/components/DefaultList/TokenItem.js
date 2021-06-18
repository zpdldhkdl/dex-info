import React, { useContext } from 'react';
import styled from 'styled-components';
import { DexInfoContext } from '../../contexts/DexInfoContext';
import defaultTokens from '../../config/constatns/defaultTokens.json';

const TokenItem = ({ logoURI, name }) => {
    const { tokenInfoSetting } = useContext(DexInfoContext);

    const onTokenItemClick = e => {
        const { innerText } = e.target;

        const token = defaultTokens.find(defaultToken => defaultToken.name === innerText);

        tokenInfoSetting(token.address);
    }

    return (
        <TokenItemWrapper>
            <img
                src={logoURI}
                alt={name}
                style={{ width: '1.875rem', height: '1.875rem' }}
            />
            <TokenItemName onClick={onTokenItemClick}>
                {name}
            </TokenItemName>
        </TokenItemWrapper>
    )
}

const TokenItemName = styled.p`
    margin-left: 0.5rem;
    padding-top: 0.7rem;
    white-space: nowrap;
    &:hover {
        transition: border-bottom 0.5s;
        cursor: pointer;
        border-bottom: 0.125rem solid #50555e;
    };
`;

const TokenItemWrapper = styled.div`
    margin-left: 0.625rem;
    color: white;
    margin: 0.1875rem 0.625rem;
    display: flex;
    height: 2.5rem;
    font-size: 1rem;
    align-items: center;
`;

export default React.memo(TokenItem);
