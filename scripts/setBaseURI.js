const hre = require("hardhat");

async function main() {
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace after deployment
    const baseURI = "ipfs://bafybeib5snlqa76l7n5fznhyfhem6iwtifwxhc4kp7my7h6aldoltktnja"; // Your exact metadata JSON URI

    const argus = await hre.ethers.getContractAt("ArgusGenesis", contractAddress);

    console.log("Setting Base URI to:", baseURI);
    const tx = await argus.setBaseURI(baseURI);
    await tx.wait();

    console.log("Base URI updated successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
