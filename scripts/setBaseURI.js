const hre = require("hardhat");

async function main() {
    const contractAddress = "0xA171059521DE838D9070bB08E732066DF7B43d4E"; // Deployed on Base Mainnet
    const baseURI = "ipfs://bafkreifakemjdcy7opc622gkcuyiurzgkhkhd6mopdvtvfn2bszjphquem"; // Updated metadata with Pinata HTTPS image

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
