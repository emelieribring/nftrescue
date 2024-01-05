import React from 'react';
import './header.css';
import { useStateContext } from '../../StateContext';


export default function Header() {

    const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();


  return (
    <div className={isConnected ? 'headerBg' : 'contentHeaderBg'}>
        <div className='headerContent'>
        {!isConnected && ( <h1 className='homeTitle'>NFT Rescue</h1> )}
        {!isConnected && ( <p className='homeText'>connect your metamask to mint NFT</p> )}
      </div>
    </div>
  )
}
