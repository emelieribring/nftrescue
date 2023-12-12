// StateContext.js
import { createContext, useContext, useState } from 'react';

const StateContext = createContext();

export const StateProvider = ({ children }) => {
    const [isConnected, setIsConnected] = useState(false);

    const connectToMetaMask = async () => {
      try {
        if (window.ethereum) {
          const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
          console.log('Connected to MetaMask with address:', accounts[0]);
          setIsConnected(true);
        } else {
          console.error('MetaMask not installed. Please install MetaMask to use this feature.');
        }
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    };
  
    const disconnectFromMetaMask = () => {
      // Perform any cleanup or additional actions on disconnect
      setIsConnected(false);
    };  

  return (
    <StateContext.Provider value={{ isConnected, connectToMetaMask, disconnectFromMetaMask }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  return useContext(StateContext);
};
