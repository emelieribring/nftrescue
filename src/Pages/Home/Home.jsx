import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import './home.css';
import { ethers } from 'ethers';
import { useStateContext } from '../../StateContext';


export default function Home() {
  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();
 
  return (
    <div  className={isConnected ? 'home' : 'contentBg'}>
      <Navbar isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask}/>
      <div className='content'>
        <h1>{isConnected ? 'Connected to MetaMask' : 'Not connected to MetaMask'}</h1>
        {!isConnected && ( <h1 className='homeTitle'>NFT Rescue</h1> )}
        {!isConnected && ( <p className='homeText'>connect your metamask to continue</p> )}
      </div>
    </div>
  );
}
