const express = require('express');
const cors = require('cors');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, this is your server!');
});

// Specify the port to listen on
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



const web3 = new Web3('http://localhost:3000'); // Replace with your server's URL

    // Load the compiled ABI and contract address
    const contractABI = require('../../Service/myNFT.json').abi;
    const contractAddress = '0x038E31cF6B8EbD490b2F34202ebcD4288836CE72'; // Replace with your deployed contract address

    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // User's wallet address
    const provider = new Web3Provider(window.ethereum);
    const userAddress = await provider.getSigner().getAddress();

    // Fetch the number of tokens owned by the user
    contract.methods.balanceOf(userAddress).call()
      .then(async (balance) => {
        // Fetch metadata for each token
        for (let i = 0; i < balance; i++) {
          const tokenId = await contract.methods.tokenOfOwnerByIndex(userAddress, i).call();
          // Fetch metadata using the token ID
          const tokenMetadata = await fetchMetadata(tokenId);
          // Display the NFT on the user's profile
          displayNFT(tokenMetadata);
        }
      })
      .catch((error) => {
        console.error('Error fetching NFTs:', error);
      });

    // Function to fetch metadata for a given token ID
    async function fetchMetadata(tokenId) {
      const CID = 'bafybeidnm77sw6yrihmr3s2vjhz3eyujshgj7scvda364zinnoodfxcdd4';
      const metadataURL = `https://ipfs.io/ipfs/${CID}`;

      try {
        const response = await fetch(metadataURL);
        if (!response.ok) {
          throw new Error(`Failed to fetch metadata: ${response.status} - ${response.statusText}`);
        }
    
        const metadata = await response.json();
        console.log('Metadata Response:', metadata);
        return metadata;
      } catch (error) {
        console.error('Error fetching metadata:', error);
        return null;
      }
    }
  

      // Function to display NFT on the user's profile
    function displayNFT(metadata) {
      // Implement logic to create HTML elements or components to display the NFT
      if (metadata) {
        console.log('Displaying NFT:', metadata);
        // Create HTML elements or React components to display the NFT
      } else {
        console.error('Invalid metadata:', metadata);
      }
    }