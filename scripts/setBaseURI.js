const hre = require("hardhat");

async function main() {
    const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS"; // Replace after deployment
    const baseURI = "ipfs://bafkreiddjj4fpmpwaee5ii5zueeekgpnenowgaxsamrvd3o2ioalylmsja"; // Your exact metadata JSON URI

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
