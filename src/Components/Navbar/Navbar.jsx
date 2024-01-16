import React, { useState } from 'react';
import { ethers } from 'ethers';
import './navbar.css';
import { NavLink } from 'react-router-dom';
import { StateProvider } from '../../StateContext';

export default function Navbar({ profile, isConnected, connectToMetaMask, disconnectFromMetaMask }) {

  return (
    <StateProvider>
      <div className='navbar'>
        {profile && (
          <NavLink to="/"> 
          <button className="fancy">
            <span className="top-key"></span>
            <p className="">Home</p>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </NavLink>
        )}
        {!profile && (
        <div className='navbarLeft'>
          <p className='logo'>LOGO</p>
          <button className="fancy">
            <span className="top-key"></span>
            <p className="">About</p>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
          <button className="fancy">
            <span className="top-key"></span>
            <p className="">Contact</p>
            <span className="bottom-key-1"></span>
            <span className="bottom-key-2"></span>
          </button>
        </div>
        )}
        {!isConnected && (
          <button className='connect' onClick={connectToMetaMask}>
            CONNECT 
          </button>
        )}
        {isConnected && (
          <div> 
            <NavLink to="/profile"> 
              <button className="fancy">
                <span className="top-key"></span>
                <p className="">My Dogs</p>
                <span className="bottom-key-1"></span>
                <span className="bottom-key-2"></span>
              </button>
            </NavLink>
            <button className='disconnectBtn' onClick={disconnectFromMetaMask}>
              DISCONNECT
            </button>
          </div>
        )}
      </div>
    </StateProvider>
  )
}

