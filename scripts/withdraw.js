const hre = require("hardhat");

async function main() {
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace after deployment

    const argus = await hre.ethers.getContractAt("ArgusGenesis", contractAddress);

    console.log("Triggering withdrawal split...");
    const tx = await argus.withdraw();
    await tx.wait();

    console.log("Funds withdrawn and split successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
