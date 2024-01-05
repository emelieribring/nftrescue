import React from 'react';
import './profile.css';
import Navbar from '../../Components/Navbar/Navbar';
import { useStateContext } from '../../StateContext';

export default function Profile() {

  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();

  return (
    <div className='profile'>
      <Navbar profile={Profile} isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask}/>
      <div className='profileDogs'>
        <h1 className='title'>My adopted dogs</h1>
      </div>
    </div>
  )
}
