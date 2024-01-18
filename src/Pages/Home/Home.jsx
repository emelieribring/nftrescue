import React, { useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar';
import Header from '../../Components/Header/Header';
import Info from '../../Components/InformationLinks/Info';
import './home.css';
import { ethers } from 'ethers';
import { Web3Provider } from '@ethersproject/providers';
import { useStateContext } from '../../Service/StateContext';


export default function Home() {
  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();
  const [loading, setLoading] = useState(false);

  const mintNFT = async () => { 
    try {
      setLoading(true);

      // Connect to MetaMask
      const provider = new Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contractAddress = '0xff2A14bEE1ef736A07d6915C7A25CfD225e06EeC';
      const contractABI = require('../../Service/myNFT.json').abi; 
      const contract = new ethers.Contract(contractAddress, contractABI, signer);

      // Call the mint function on the contract
      const tx = await contract.mint(1, { value: ethers.parseEther('0.08') });
      console.log('Transaction:', tx);
      console.log('Transaction Hash:', tx.hash);
  
      let receipt = null;
      const maxAttempts = 10; 
  
      for (let i = 0; i < maxAttempts; i++) {

        await new Promise(resolve => setTimeout(resolve, 5000));
  
        receipt = await provider.getTransactionReceipt(tx.hash);
  
        if (receipt && receipt.confirmations !== undefined) {
          break;
        }
      }

  
      if (receipt) {
        console.log('Transaction mined with', receipt.confirmations, 'confirmations');
        console.log('Transaction receipt:', receipt);
      } else {
        console.log('Transaction receipt not available after multiple attempts.');
      }

      console.log('NFT Minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={isConnected ? 'home' : 'contentBg'}>
      <Navbar isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask} />
      <Header isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask} />
      <Info/>
      <div className='homePageDiv'>
        <div className="homeRight">
          <h1 className='connected'>{isConnected ? 'Connected to MetaMask' : 'Not connected to MetaMask'}</h1>
          {!isConnected && (<p className='mintText'>Connect your MetaMask to mint and adopt!</p>)}
          {isConnected && (<p className='mintText'>Mint and adopt your dog</p>)}
          {isConnected && (
            <button className='minBtnConnected' onClick={mintNFT} disabled={loading}>
              {loading ? 'Minting...' : 'MINT'}
            </button>
          )}
        </div>
        <div className="homeLeft">
          <div className='dogPic'></div>
        </div>
      </div>
    </div>
  );
}

