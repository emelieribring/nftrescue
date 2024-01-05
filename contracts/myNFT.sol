// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19; 

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";


contract MyNFT is ERC721, Ownable {
    using Strings for uint256; 

    uint256 public constant MAX_TOKENS = 10000;
    uint private constant TOKEN_RESERVED = 5;
    uint256 public price = 80000000000000000;
    uint256 public constant MAX_MINT_PER_TX = 10;

    bool public isSaleAtive;
    uint256 public totalSupply;
    mapping(address => uint256) private mintedPerWallet;

    string public baseUri;
    string public baseExtension;

    constructor() ERC721("NFT name", "SYMBOL") Ownable(msg.sender) {
        baseUri = "ipfs://xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx/";
        for (uint256 i = 1; i <= TOKEN_RESERVED; i++){
            _safeMint(msg.sender, i);
        } 
        totalSupply = TOKEN_RESERVED;
    }

    //PUBLIC FUNCTIONS
    function mint(uint256 _numTokens) external payable {
        require(isSaleAtive, "The sale is paused.");
        require(_numTokens <= MAX_MINT_PER_TX, "You can only mint a maximum of 10 NFTs per transaction.");
        require(mintedPerWallet[msg.sender] + _numTokens <= 10, "You can only min 10 per wallet.");
        uint256 curTotalSupply = totalSupply;
        require(curTotalSupply + _numTokens <= MAX_TOKENS, "Exceeds `MAX_TOKENS`");
        require(_numTokens * price <= msg.value, "Insufficient funds. You need more ETH!");

        for(uint256 i = 1; i <= _numTokens; ++i) {
            _safeMint(msg.sender, curTotalSupply + 1);
        } 
        mintedPerWallet[msg.sender] += _numTokens;
        totalSupply += _numTokens;
    }

    // OWNER ONLY FUNCTIONS 
    function flipSaleState() external onlyOwner {
        isSaleAtive = !isSaleAtive;
    }

    function setBaseURI(string memory _baseUri) external onlyOwner {
        baseUri = _baseUri;
    }

    function setPrice(uint256 _price) external onlyOwner {
        price = _price;
    }

    function withdrawAll() external onlyOwner {
        uint256 balance = address(this).balance;
        uint balanceOne = balance * 50 / 100;
        uint256 balanceTwo = balance * 50 / 100;
        (bool transferOne, ) = payable(0x2a5820DA8405F1CdaC333cE919B780CAcE1f695E).call{value: balanceOne}("");
        (bool transferTwo, ) = payable(0x2a5820DA8405F1CdaC333cE919B780CAcE1f695E).call{value: balanceTwo}("");
        require(transferOne && transferTwo, "Transfer failed");
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
    address owner = ownerOf(tokenId);
    require(
        owner != address(0),
        "ERC721Metadata: URI query for nonexistent token"
    );

    string memory currentBaseURI = _baseURI();
    return bytes(currentBaseURI).length > 0
        ? string(abi.encodePacked(currentBaseURI, tokenId.toString(), baseExtension))
        : "";
    }


    //Internal functions 
    function _baseURI() internal view virtual override returns (string memory) {
        return baseUri;
    }

}

