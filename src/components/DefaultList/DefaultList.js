import React, {useState} from 'react';
import styled from 'styled-components';
import TokenItem from "./TokenItem";
import DefaultTokens from '../../config/constatns/defaultTokens.json';

const isSearch = (words, defaultToken) => {
    const {name, symbol} = defaultToken;
    if ( name.toLowerCase().indexOf(words) > -1 ||
         symbol.toLowerCase().indexOf(words) > -1)
            return defaultToken;
}

const DefaultList = () => {
    const [defaultTokens, setDefaultTokens] = useState(DefaultTokens);
    //debounce
    const [debounceTimer, setDebounceTimer] = useState(0);

    const onSearchInputChange = (e) => {
        const searchWords = e.target.value.toLowerCase();

        if (debounceTimer) clearTimeout(debounceTimer);

        const newDebounceTimer = setTimeout(() => {
            const filterTokens = DefaultTokens.filter(defaultToken => isSearch(searchWords, defaultToken));

            setDefaultTokens(filterTokens);
        }, 200);

        setDebounceTimer(newDebounceTimer);
    }
    return (
        <WrapListContent>
                <SearchInput
                    type='text'
                    name='search'
                    placeholder='token name search'
                    onChange={onSearchInputChange}
                />
                <WrapTokens>
                    {
                        defaultTokens.map((defaultToken, index) => {
                            const { logoURI, name } = defaultToken;
                            return <TokenItem logoURI={logoURI} name={name} key={index}/>
                        })
                    }
                </WrapTokens>
        </WrapListContent>
    )
}

const WrapTokens = styled.div`
    display: inline-block;
    width: 100%;
    height: 90%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 10px;
    };
    &::-webkit-scrollbar-thumb {
        background-color: #50555e;
    };
    &::-webkit-scrollbar-track {
        background-color: #282c34;
    };
`;

const SearchInput = styled.input`
    margin: 0.6rem;
    padding: 0.1rem;
    border: 0.3rem solid #00000d;
    display: inline-block;
    width: 15vw;
    outline: none;
    border-radius: 1rem;
    text-align: center;
    box-shadow: 0 3px 3px rgba(0, 0, 0, 0.3);
    &:hover {
        border-color: #50555e;
    };
`;
const WrapListContent = styled.div`
    display: inline-block;
    position: fixed;
    width: 17vw;
    top: 5.25rem;
    bottom: 0;
    box-shadow: 2px 0 0 rgba(0, 0, 0, 0.4);
    @media screen and (max-width: 1000px) {
        display: none;
    }
`;

export default DefaultList;
