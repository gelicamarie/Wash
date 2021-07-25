// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address contractAddress; //will be storing the NFT Makrketplace address

    /**
        Marketplace contract needs to be deployed first.
     */
    constructor(address marketplaceAddress) ERC721("Wash Marketplace", "WASH") {
        contractAddress = marketplaceAddress;
    }

    function createNFT(string memory tokenURI) public returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        /*
         * Allow access to this token in other contracts
         * Allow token transfer
         */
        setApprovalForAll(contractAddress, true);

        /*
         * newItemId -> to call and retrieve info from the contract (FrontEnd)
         */
        return newTokenId;
    }
}
