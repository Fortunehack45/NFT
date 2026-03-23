# NFT Website Integration Guide

This guide contains everything you need to connect your `ArgusGenesis` NFT contract to your React or HTML website.

## 1. Contract Configuration
- **Network**: Base (Mainnet)
- **Contract Address**: `0xA171059521DE838D9070bB08E732066DF7B43d4E`
- **Mint Price**: `0.0025 ETH`

## 2. Contract ABI
Copy this JSON and save it as `contractABI.json` in your website project.

```json
[
  {
    "inputs": [],
    "name": "mint",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "MAX_SUPPLY",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]
```

## 3. "Mint" Button JavaScript
Use this code with `ethers.js` to handle the transaction:

```javascript
import { ethers } from "ethers";

const contractAddress = "0xA171059521DE838D9070bB08E732066DF7B43d4E";
const abi = [...]; // Paste the ABI here

async function mintNFT() {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

    try {
      console.log("Preparing to mint...");
      const tx = await contract.mint({
        value: ethers.parseEther("0.0025")
      });
      await tx.wait();
      alert("Success! NFT Minted.");
    } catch (error) {
      console.error("Minting failed", error);
    }
  } else {
    alert("Please install MetaMask!");
  }
}
```
