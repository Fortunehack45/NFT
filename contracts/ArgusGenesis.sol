// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "erc721a/contracts/ERC721A.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract ArgusGenesis is ERC721A, Ownable {
    using Strings for uint256;

    uint256 public constant MAX_SUPPLY = 500000;
    uint256 public constant MINT_PRICE = 0.0025 ether;
    address public constant WITHDRAW_ADDRESS_1 = 0x56F0Fdbe1B09C0f65DA1cb73ef878C07EC645417;
    address public constant WITHDRAW_ADDRESS_2 = 0x59148d6A9dFf263a772B5a84280bc88530f38636;

    string private _baseTokenURI;
    bool public mintActive = false;

    error MintNotActive();
    error MaxSupplyExceeded();
    error InsufficientPayment();
    error WithdrawalFailed();

    error MintLimitExceeded();

    constructor() ERC721A("Argus Genesis", "ARGUS") Ownable(msg.sender) {}

    function mint() external payable {
        if (!mintActive) revert MintNotActive();
        if (_totalMinted() + 1 > MAX_SUPPLY) revert MaxSupplyExceeded();
        if (_numberMinted(msg.sender) + 1 > 1) revert MintLimitExceeded();
        if (msg.value < MINT_PRICE) revert InsufficientPayment();

        _mint(msg.sender, 1);
    }

    function setBaseURI(string calldata baseURI) external onlyOwner {
        _baseTokenURI = baseURI;
    }

    function tokenURI(uint256 tokenId) public view virtual override returns (string memory) {
        if (!_exists(tokenId)) revert URIQueryForNonexistentToken();
        return _baseTokenURI;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setMintActive(bool active) external onlyOwner {
        mintActive = active;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        uint256 half = balance / 2;
        
        (bool success1, ) = payable(WITHDRAW_ADDRESS_1).call{value: half}("");
        if (!success1) revert WithdrawalFailed();
        
        (bool success2, ) = payable(WITHDRAW_ADDRESS_2).call{value: address(this).balance}("");
        if (!success2) revert WithdrawalFailed();
    }

    function _startTokenId() internal view virtual override returns (uint256) {
        return 1;
    }
}
