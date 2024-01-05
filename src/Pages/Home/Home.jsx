import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import './home.css';
import { ethers } from 'ethers';
import { useStateContext } from '../../StateContext';


export default function Home() {
  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();
 
  return (
    <div  className={isConnected ? 'home' : 'contentBg'}>
      <Navbar isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask}/>
      <Header isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask}/>
        <div className='homePageDiv'>
          <div className="homeRight">
            <h1 className='connected'>{isConnected ? 'Connected to MetaMask' : 'Not connected to MetaMask'}</h1>
            {!isConnected && (  <p className='mintText'>Connect your MetaMask to mint and adopt!</p> )}
            {isConnected && (  <p className='mintText'>Mint and adopt your dog</p> )}
            {isConnected && (  <button className='minBtnConnected'>MINT</button> )}
          </div>
          <div className="homeLeft">
            <div className='dogPic'></div>
          </div>
        </div>
    </div>
  );
}
