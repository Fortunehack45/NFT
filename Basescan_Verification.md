# How to Verify Your Smart Contract on Basescan

Since your computer's internet connection is currently blocking the Basescan API, you can easily verify the contract manually through your browser. 

This proves to your users that the smart contract code is safe and legitimate.

### Step 1: Open Basescan
Go to your contract page on Basescan:
👉 [https://basescan.org/verifyContract?a=0xA171059521DE838D9070bB08E732066DF7B43d4E](https://basescan.org/verifyContract?a=0xA171059521DE838D9070bB08E732066DF7B43d4E)

### Step 2: Fill out the initial form
1. **Contract Address**: Ensure it says `0xA171059521DE838D9070bB08E732066DF7B43d4E`
2. **Compiler Type**: Select **Solidity (Single file)**
3. **Compiler Version**: Select **v0.8.20+commit.a1b79de6**
4. **Open Source License Type**: Select **MIT License (MIT)**
5. Click **"Continue"**

### Step 3: Paste the Source Code
On the next page, you will see a large box labeled "Enter the Solidity Contract Code below".

1. Open the newly generated `flattened.sol` file inside your project folder (`C:\Users\ALEX\nft\flattened.sol`).
2. Copy **ALL** the text inside `flattened.sol`.
3. Paste the entire code into that box on Basescan.

### Step 4: Finalize
1. **Optimization**: Ensure it is set to **No** (we didn't use optimization in Hardhat).
2. **EVM Version**: Click "Advanced Settings" (if available) or look for EVM Version, and set it to **paris** instead of default/shanghai.
3. Complete the Captcha.
4. Click **"Verify and Publish"**.

Within a few seconds, a green checkmark will appear next to your "Contract" tab! 🎉
