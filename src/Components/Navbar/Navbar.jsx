import React, { useState } from 'react';
import { ethers } from 'ethers';
import './navbar.css';
import { NavLink } from 'react-router-dom';

export default function Navbar({ profile, isConnected, connectToMetaMask, disconnectFromMetaMask }) {

  return (
    <div className='navbar'>
      {profile && (
        <NavLink to="/"><button className='backBtn'>BACK TO HOME</button></NavLink>
      )}
      {!isConnected && (
        <button className='connect' onClick={connectToMetaMask}>
          CONNECT TO METAMASK
        </button>
      )}
      {isConnected && (
        <div>
          <NavLink to="/profile"><button className='profileBtn'>MY PROFIL</button></NavLink>
          <button className='disconnectBtn' onClick={disconnectFromMetaMask}>
            DISCONNECT
          </button>
        </div>
      )}
    </div>
  )
}
