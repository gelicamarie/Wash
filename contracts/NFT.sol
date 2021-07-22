// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor(
        address _owner,
        string memory _name, // name of artwork
        string memory _symbol, // abbreviated name
        string memory _photoURL
    ) ERC721(_name, _symbol) {
        _mint(_owner, _photoURL);
    }

    function _mint(address _to, string memory _photoURL) private {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(_to, newItemId);
        _setTokenURI(newItemId, _photoURL);
    }

    // function getID() public view returns (uint256) {
    //     return _tokenIds.current();
    // }
}
