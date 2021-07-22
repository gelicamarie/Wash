// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./NFT.sol";

contract Factory is Ownable {
    event NewNFTCreated(
        address _owner,
        string _name,
        string symbol,
        string photoURL
    );

    mapping(address => address[]) private nfts;
    address[] private collection;

    function createNFT(
        string memory _name, // name of artwork
        string memory _symbol, // abbreviated name
        string memory _photoURL
    ) external returns (address) {
        address _token;

        NFT nft = new NFT(msg.sender, _name, _symbol, _photoURL);
        _token = address(nft);

        nfts[msg.sender].push(_token);
        collection.push(_token);

        emit NewNFTCreated(msg.sender, _name, _symbol, _photoURL);
        return _token;
    }

    function getCollection() external view returns (address[] memory) {
        return collection;
    }

    function getCollectionFrom(address _owner)
        external
        view
        returns (address[] memory)
    {
        return nfts[_owner];
    }
}
