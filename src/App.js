import React from 'react';
import Header from "./components/Header";
import DefaultList from "./components/DefaultList";
import TokenInfo from './components/TokenInfo';
import { useContext } from 'react';
import { DexInfoContext } from './contexts/DexInfoContext';

const App = () => {
  const { tokenInfo: { address } } = useContext(DexInfoContext)

  return (
    <>
      <Header />
      <DefaultList />
      {address && <TokenInfo />}
    </>
  )
}

export default App;
