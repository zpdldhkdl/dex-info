import React, { useContext } from 'react';
import styled from 'styled-components';
import { Input, message } from 'antd';
import { DexInfoContext } from '../../contexts/DexInfoContext';
import checkAailableAddress from '../../utils/checkAvailableAddress';
const { Search } = Input;

const Header = () => {
    const { tokenInfoSetting } = useContext(DexInfoContext);

    const onSearch = async (address) => {
        if (address.length !== 42) {
            message.error("The address format is incorrect.")
            return;
        }

        const check = await checkAailableAddress(address);

        if (!check) {
            message.error("This address does not exist")
            return;
        }

        tokenInfoSetting(address);
    }
    return (
        <HeaderWrap>
            <Search
                placeholder="input contract address"
                onSearch={onSearch}
                allowClear
                style={{ width: '50rem', margin: '0 auto' }}
            />
        </HeaderWrap>
    )
};

const HeaderWrap = styled.div`
    position: fixed;
    display: flex;
    width: 100%;
    height: 5.25rem;
    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.4);
    align-items: center;
    background: #050506;
    z-index: 1000;
`;

export default Header;
