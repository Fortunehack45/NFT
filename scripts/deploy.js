const hre = require("hardhat");

async function main() {
    console.log("Deploying Argus Genesis NFT...");

    const ArgusGenesis = await hre.ethers.getContractFactory("ArgusGenesis");
    const argus = await ArgusGenesis.deploy();

    await argus.waitForDeployment();

    const address = await argus.getAddress();
    console.log("Argus Genesis deployed to:", address);

    console.log("\nNext steps:");
    console.log("1. Update your .env with the deployed address.");
    console.log("2. Set the base URI using: npx hardhat run scripts/setBaseURI.js --network base-mainnet");
    console.log("3. Enable minting using: npx hardhat run scripts/toggleMint.js --network base-mainnet");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
