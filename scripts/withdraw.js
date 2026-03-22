const hre = require("hardhat");

async function main() {
    const contractAddress = "0xA171059521DE838D9070bB08E732066DF7B43d4E"; // Deployed on Base Mainnet

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
