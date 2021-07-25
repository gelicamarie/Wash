// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//avoids contract recursive calls
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract Marketplace is ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds; //unique ID for all marketplace items
    Counters.Counter private _itemSold; //to keep track of inventory, for dynamic arrays later

    //marketplace owner profits huehue
    address payable owner;
    uint256 listingPrice = 10 ether;

    constructor() {
        owner = payable(msg.sender); //person to deploy the contract is the owner
    }

    struct Item {
        uint256 itemId;
        uint256 tokenId;
        uint256 price;
        address nftContract;
        address payable seller;
        address payable owner; //user who is purchasing the item
    }

    event NewItemCreated(
        uint256 itemId,
        uint256 tokenId,
        uint256 price,
        address nftContract,
        address seller,
        address owner //user who is purchasing the item
    );

    event SaleTransaction(address nftContract, uint256 itemId);

    mapping(uint256 => Item) private itemIdToCollection;

    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    //creates an item
    function createNewNFT(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public payable nonReentrant {
        require(price > 0, "The price cannot be 0.");
        require(
            msg.value == listingPrice,
            "The price has to equal the listing price"
        );

        _itemIds.increment();

        uint256 itemId = _itemIds.current();

        itemIdToCollection[itemId] = Item(
            itemId,
            tokenId,
            price,
            nftContract,
            payable(msg.sender),
            payable(address(0)) //empty address as there is no owner yet.
        );

        /**
            Transferring ownership of the nft
            from the person who is calling this function 
            to the address of this contract
         */
        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);

        emit NewItemCreated(
            itemId,
            tokenId,
            price,
            nftContract,
            msg.sender,
            address(0)
        );
    }

    //creates the transaction for the item
    function createMarketTransaction(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 tokenId = itemIdToCollection[itemId].tokenId;
        uint256 price = itemIdToCollection[itemId].price;

        require(
            msg.value == price,
            "The amount you entered is either more or less than the asking price. Please submit the right amount."
        );

        //transferring the value of the transaction to the seller
        itemIdToCollection[itemId].seller.transfer(msg.value);

        //transferring the item from the seller to the buyer
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);

        //updating ownership to the msg.sender
        itemIdToCollection[itemId].owner = payable(msg.sender);
        _itemSold.increment(); //to keep track of how many items have been sold
        payable(owner).transfer(listingPrice);

        emit SaleTransaction(nftContract, itemId);
    }

    function getCollection() public view returns (Item[] memory) {
        uint256 totalCount = _itemIds.current();
        uint256 inventoryCount = totalCount - _itemSold.current();

        Item[] memory inventory = new Item[](inventoryCount);
        uint256 index = 0;

        //populating inventory with items that are for sale
        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].owner == address(0)) {
                uint256 currId = itemIdToCollection[i + 1].itemId;
                Item storage currItem = itemIdToCollection[currId];
                inventory[index] = currItem;
                index++;
            }
        }

        return inventory;
    }

    function getMyCollection() public view returns (Item[] memory) {
        uint256 totalCount = _itemIds.current();
        uint256 inventoryCount = 0;

        /*
         * To find the size of this user's collection of nfts
         * to set the array size
         */
        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].owner == msg.sender) {
                inventoryCount++;
            }
        }

        Item[] memory inventory = new Item[](inventoryCount);
        uint256 index = 0;

        //populating inventory with items that are for sale
        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].owner == msg.sender) {
                uint256 currId = itemIdToCollection[i + 1].itemId;
                Item storage currItem = itemIdToCollection[currId];
                inventory[index] = currItem;
                index++;
            }
        }

        return inventory;
    }

    function getMyCreations() public view returns (Item[] memory) {
        uint256 totalCount = _itemIds.current();
        uint256 inventoryCount = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].owner == msg.sender) {
                inventoryCount++;
            }
        }

        Item[] memory inventory = new Item[](inventoryCount);
        uint256 index = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].seller == msg.sender) {
                uint256 currId = itemIdToCollection[i + 1].itemId;
                Item storage currItem = itemIdToCollection[currId];
                inventory[index] = currItem;
                index++;
            }
        }

        return inventory;
    }

    function getArtwork(uint tokenId) public view returns (Item memory) {
        uint256 totalCount = _itemIds.current();
        uint256 index = 0;

        for (uint256 i = 0; i < totalCount; i++) {
            if (itemIdToCollection[i + 1].tokenId == tokenId) {
                uint256 currId = itemIdToCollection[i + 1].itemId;
                return itemIdToCollection[currId];
            }
            index++;
        }
        revert('Not found');
    }
}
