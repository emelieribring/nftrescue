import React, { useState, useEffect } from 'react';
import './profile.css';
import Navbar from '../../Components/Navbar/Navbar';
import { StateProvider, useStateContext } from '../../Service/StateContext';
import { Web3Provider } from '@ethersproject/providers';
import Web3 from 'web3';


export default function Profile() {

  const { isConnected, connectToMetaMask, disconnectFromMetaMask } = useStateContext();

  const [mintedNFTs, setMintedNFTs] = useState([]);

  useEffect(() => {
    console.log('Profile component rendered');
    if (isConnected) {
      showMintedNFTs();
    }
  }, [isConnected]);


  

  const showMintedNFTs = async () => {

    const provider = window.ethereum || 'http://localhost:3000';
    const web3 = new Web3(provider);
      
    const contractABI = require('../../Service/myNFT.json').abi;
    const contractAddress = '0xff2A14bEE1ef736A07d6915C7A25CfD225e06EeC';

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    try {
      const provider = new Web3Provider(window.ethereum);
      const userAddress = await provider.getSigner().getAddress();
      const totalTokens = await contract.methods.totalSupply().call();
  
      const mintedNFTsArray = [];
  
      for (let i = 1; i <= totalTokens; i++) {
        const tokenId = i;
        const owner = await contract.methods.ownerOf(tokenId).call();
  
        if (owner.toLowerCase() === userAddress.toLowerCase()) {
          const tokenMetadata = await fetchMetadata(tokenId);
  
          // Check if metadata is not null before adding to the array
          if (tokenMetadata !== null) {
            mintedNFTsArray.push(tokenMetadata);
          }
        }
      }
  
      setMintedNFTs(mintedNFTsArray);
    } catch (error) {
      console.error('Error fetching NFTs:', error);
    }
  };

  

  const fetchMetadata = async (tokenId) => {

    const metadataCIDs = [
      'bafkreihiuvzgrean6tpjoiviawcfeywsy26q2mhv2lwdjkh77my672aut4',
      'bafkreihiuvzgrean6tpjoiviawcfeywsy26q2mhv2lwdjkh77my672aut4',
      'bafkreihbo2sxyapz7kgd52aimfdr6xgi2j2jopkqae3e4tsxosjskq3mdm',
      'bafkreicwtkdypexi3r47pg2ek2blva6tcb7fvezzyy7bgy5unhrst3kw6a',
      'bafkreiadqk7klb6vewgk33l2o67mmfiijac6vzwsxdxm2zticvbe3wnchq',
      'bafkreigo2e77zkg3vvthkwwd2asslue7pythfc2a7rgpr3ueauyrcwslie',
      'bafkreiedykvhmrb5dnnlxcdaoezy2hmcbefuyxrjfbyskjit5ttnkyy33u',
      'bafkreihsakgx2wplt2cfwkejos6e7xyw66tnjxsh5e4i4aryxjob76faja',
      'bafkreiakyabvcmwgdxoulzpilbfv7qiadw6uuwxbzncz2lftamw32uef5e',
      'bafkreidaxlvlqpmagnd54bmgvgso6uohxfxuetso62izcelrhf2pkid5ve',
      'bafkreibgrlhcxtito2whylma2k3dkfsvaxmzi3zaxoaino4ykhedcfoxm4',
      'bafkreiawdaacl4sdfp7uykfvcp5j6renhzttf76ms2a7f2xcn54nbny7vy',
      'bafkreiawdaacl4sdfp7uykfvcp5j6renhzttf76ms2a7f2xcn54nbny7vy'
    ];
    
    const CID = metadataCIDs[tokenId];
    const metadataURL = `https://ipfs.io/ipfs/${CID}`;

    try {
      const response = await fetch(metadataURL);
      if (!response.ok) {
        throw new Error(`Failed to fetch metadata: ${response.status} - ${response.statusText}`);
      }

      const metadata = await response.json();
      return metadata;
    } catch (error) {
      console.error('Error fetching metadata:', error);
      return null;
    }

  };

  return (
    <StateProvider>
      <div className='profile'>
        <Navbar profile={Profile} isConnected={isConnected} connectToMetaMask={connectToMetaMask} disconnectFromMetaMask={disconnectFromMetaMask}/>
        <div className='profileDogs'>
          <h1 className='title'>My adopted dogs</h1>
          {isConnected && (
          <div className='mintedNFTs'>
            {mintedNFTs.map((nft, index) => (
              <div key={index} className='nftCard'>
                <p className='nftName'>{nft.name}</p>
                <img src={`${nft.image}`} />
                <p className='nftDesc'> {nft.description}</p>
                <div className='nftCardBtns'>
                  <button>Send food</button>
                  <button>Send toy</button>
                  <button>Send candy</button>
                </div>
              </div> 
            ))} 
          </div> )}
        </div>
      </div>
    </StateProvider>
  )
};
