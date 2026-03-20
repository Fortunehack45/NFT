# Argus Genesis NFT

The foundational artifact of the Argus network. A unique digital masterpiece symbolizing the birth of the celestial observer.

## Features

- **Standard**: ERC721A (Efficient Batch Minting)
- **Supply**: 5,000,000
- **Price**: 0.0025 ETH
- **Network**: Base (Mainnet & Sepolia)
- **Withdrawal**: Automatic 50/50 split between two treasury addresses.

## Setup

1.  **Install dependencies**:
    ```bash
    npm install
    ```

2.  **Environment Variables**:
    Create or edit `.env`:
    ```env
    PRIVATE_KEY=your_private_key_here
    BASESCAN_API_KEY=your_basescan_api_key_here
    ```

## Deployment

### 1. Deploy Contract
```bash
npx hardhat run scripts/deploy.js --network base-mainnet
```

### 2. Configure Metadata
Update the `contractAddress` in `scripts/setBaseURI.js`, then run:
```bash
npx hardhat run scripts/setBaseURI.js --network base-mainnet
```

### 3. Enable Minting
Update the `contractAddress` in `scripts/toggleMint.js`, then run:
```bash
npx hardhat run scripts/toggleMint.js --network base-mainnet
```

## Maintenance

### Withdraw Funds
Trigger the treasury split:
```bash
npx hardhat run scripts/withdraw.js --network base-mainnet
```

## Testing
Run the suite:
```bash
npx hardhat test
```
