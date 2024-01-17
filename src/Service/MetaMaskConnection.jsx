import React from 'react';
import Home from '../Pages/Home/Home';
import Navbar from '../Components/Navbar/Navbar';
import { useStateContext } from './StateContext';

const MetaMaskConnection = () => {
  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();

  return (
    <>
      <Home isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask} />
      <Navbar isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask} />
    </>
  );
};

export default MetaMaskConnection;
