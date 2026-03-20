const hre = require("hardhat");

async function main() {
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace after deployment
    const newState = true; // Set to true to enable, false to disable

    const argus = await hre.ethers.getContractAt("ArgusGenesis", contractAddress);

    console.log("Setting Mint Active to:", newState);
    const tx = await argus.setMintActive(newState);
    await tx.wait();

    console.log("Mint state updated!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
