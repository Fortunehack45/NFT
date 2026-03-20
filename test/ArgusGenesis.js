const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ArgusGenesis", function () {
    let ArgusGenesis;
    let argus;
    let owner;
    let addr1;
    let addr2;

    beforeEach(async function () {
        [owner, addr1, addr2] = await ethers.getSigners();
        ArgusGenesis = await ethers.getContractFactory("ArgusGenesis");
        argus = await ArgusGenesis.deploy();
    });

    describe("Deployment", function () {
        it("Should set the right owner", async function () {
            expect(await argus.owner()).to.equal(owner.address);
        });

        it("Should have the correct name and symbol", async function () {
            expect(await argus.name()).to.equal("Argus Genesis");
            expect(await argus.symbol()).to.equal("ARGUS");
        });

        it("Should return the same URI for all tokens", async function () {
            const uri = "ipfs://test-uri";
            await argus.setMintActive(true);
            await argus.setBaseURI(uri);

            await argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") });
            await argus.connect(addr2).mint({ value: ethers.parseEther("0.0025") });

            expect(await argus.tokenURI(1n)).to.equal(uri);
            expect(await argus.tokenURI(2n)).to.equal(uri);
        });
    });

    describe("Minting", function () {
        it("Should fail if minting is not active", async function () {
            await expect(
                argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") })
            ).to.be.revertedWithCustomError(argus, "MintNotActive");
        });

        it("Should mint successfully when active and paid", async function () {
            await argus.setMintActive(true);
            await argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") });
            expect(await argus.balanceOf(addr1.address)).to.equal(1);
            expect(await argus.ownerOf(1)).to.equal(addr1.address);
        });

        it("Should fail if payment is insufficient", async function () {
            await argus.setMintActive(true);
            await expect(
                argus.connect(addr1).mint({ value: ethers.parseEther("0.0024") })
            ).to.be.revertedWithCustomError(argus, "InsufficientPayment");
        });

        it("Should fail if wallet tries to mint twice", async function () {
            await argus.setMintActive(true);
            await argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") });
            await expect(
                argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") })
            ).to.be.revertedWithCustomError(argus, "MintLimitExceeded");
        });
    });

    describe("Withdrawal", function () {
        it("Should split funds 50/50 between the two hardcoded addresses", async function () {
            const addr1Pay = "0x56F0Fdbe1B09C0f65DA1cb73ef878C07EC645417";
            const addr2Pay = "0x59148d6A9dFf263a772B5a84280bc88530f38636";

            await argus.setMintActive(true);
            await argus.connect(addr1).mint({ value: ethers.parseEther("0.0025") });

            const initBalance1 = await ethers.provider.getBalance(addr1Pay);
            const initBalance2 = await ethers.provider.getBalance(addr2Pay);

            await argus.withdraw();

            const finalBalance1 = await ethers.provider.getBalance(addr1Pay);
            const finalBalance2 = await ethers.provider.getBalance(addr2Pay);

            const half = ethers.parseEther("0.0025") / 2n;

            expect(finalBalance1).to.equal(initBalance1 + half);
            expect(finalBalance2).to.equal(initBalance2 + half);
        });
    });
});
