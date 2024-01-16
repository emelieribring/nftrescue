import React from 'react';
import './info.css';
import logoRescue from '../../Images/logoRescue.png';
import dog from '../../Images/dog.png';

export default function Info() {
  return (
    <div className='infoDiv'>
        <div className="infoBox">
        <p className='infoTitle'>HOW IT WORKS</p>
        <p className='infoText'>Click here to read more about how you mint your nft and and adopt your first pup. 
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quo in illo culpa perferendis, 
        ipsum dolorum quos. 
        </p>
        </div>
        <div className="infoBox">
            <p className='infoTitle'>ABOUT NFT RESCUE</p>
            <p className='infoText'>We've reimagined the adoption experience by blending cutting-edge technology with compassion. Click here to read more about NFTRescue and the work around our organisation. </p>
        </div>
        <div className="infoBox">
        <p className='infoTitle'>THE SHELTERS</p>
        <p className='infoText'>Click here to read more about the amazing shelters that we collaborate with.</p>
        </div>
    </div>
  )
}
