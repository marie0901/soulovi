// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2; // required to accept structs as function parameters

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/ECDSAUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/cryptography/draft-EIP712Upgradeable.sol";
import "hardhat/console.sol";

contract NFTMarketplace is ERC721URIStorageUpgradeable, EIP712Upgradeable, AccessControlUpgradeable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    string private constant SIGNING_DOMAIN = "LazyNFT-Voucher";
    string private constant SIGNATURE_VERSION = "1";
    
     mapping (address => uint256) pendingWithdrawals;
    // Represents an un-minted NFT, which has not yet been recorded into the blockchain. A signed voucher can be redeemed for a real NFT using the redeem function.
    struct NFTVoucher {
        //The id of the token to be redeemed. Must be unique - if another token with this ID already exists, the redeem function will revert.
        uint256 tokenId;
        // The minimum price (in wei) that the NFT creator is willing to accept for the initial sale of this NFT.
        uint256 price;
        // The metadata URI to associate with this token.
        string uri;
        // The EIP-712 signature of all other fields in the NFTVoucher struct. For a voucher to be valid, it must be signed by an account with the MINTER_ROLE.
        bytes signature;
    }

    address payable owner;
    // uint256 listingPrice;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      uint256 tokenId;
      address payable seller;
      address payable owner;
      uint256 price;
      string tokenURI;
      bool sold;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address seller,
      address owner,
      uint256 price,
      string tokenURI,
      bool sold
    );

        function initialize(
        address payable minter
    ) public initializer {
        __AccessControl_init();
        _setupRole(MINTER_ROLE, minter);
        __ERC721_init("UkrainianArtistsNFT", "SLV");
        __EIP712_init(SIGNING_DOMAIN, SIGNATURE_VERSION);

          // listingPrice = 0.00025 ether;
          // owner = payable(msg.sender);
    }

    // /* Updates the listing price of the contract */
    // function updateListingPrice(uint _listingPrice) public payable {
    //   require(owner == msg.sender, "Only marketplace owner can update listing price.");
    //   listingPrice = _listingPrice;
    // }
    // /* Returns the listing price of the contract */
    // function getListingPrice() public view returns (uint256) {
    //   return listingPrice;
    // }

    /* Returns the current tokenId */
    function getCurrentTokenId() public view returns (uint256) {
      return _tokenIds.current();
    }

    /* List token in the marketplace without minting */
    function createToken(
      // string memory tokenURI, uint256 price
      NFTVoucher calldata voucher) public payable returns (uint) {

    // make sure signature is valid and get the address of the signer
      address signer = _verify(voucher);

      // make sure that the signer is authorized to mint NFTs
      require(hasRole(MINTER_ROLE, signer), "Signature invalid or unauthorized");
      require(voucher.tokenId == (_tokenIds.current() +1), "TokenId in the voucher is not valid any more");

      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      // _mint(msg.sender, newTokenId);
      // _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, voucher.price, voucher.uri);
      return newTokenId;
    }

    function createMarketItem(
      uint256 tokenId,
      uint256 price,
      string memory tokenURI
    ) private {
      // require(price > 0, "Price must be at least 1 wei");
      // require(msg.value == listingPrice, "Price must be equal to listing price");

      idToMarketItem[tokenId] =  MarketItem(
        tokenId,
        payable(msg.sender),
        payable(address(this)),
        price,
        tokenURI,
        false
      );

      // _transfer(msg.sender, address(this), tokenId);
      emit MarketItemCreated(
        tokenId,
        msg.sender,
        address(this),
        price,
        tokenURI,
        false
      );
    }

    function createMarketSale(
     uint256 tokenId ) public payable {
  
      uint price = idToMarketItem[tokenId].price;
      address seller = idToMarketItem[tokenId].seller;
      require(msg.value >= price, "Insufficient funds to redeem");
      // require if tokenId is not sold

      // first assign the token to the signer, to establish provenance on-chain
      _mint(seller, tokenId);
      _setTokenURI(tokenId, idToMarketItem[tokenId].tokenURI);

      idToMarketItem[tokenId].owner = payable(msg.sender);
      idToMarketItem[tokenId].sold = true;
      idToMarketItem[tokenId].seller = payable(address(0));
      _itemsSold.increment();
      _transfer(seller, msg.sender, tokenId);
      // payable(owner).transfer(listingPrice);
      payable(seller).transfer(msg.value);
    }
    /* Returns a single market item */
    function fetchMarketItem( uint256 tokenId) public view returns (MarketItem memory) {
      MarketItem storage Item = idToMarketItem[tokenId];
      return Item;
    }

    /* !!!TEST Returns all unsold market items */
    function testMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
    /* Returns all unsold market items */
    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](unsoldItemCount);
      for (uint i = 0; i < itemCount; i++) {
        if (idToMarketItem[i + 1].owner == address(this)) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    /* Returns only items that a user has purchased */
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 0; i < totalItemCount; i++) {
        if (idToMarketItem[i + 1].owner == msg.sender) {
          uint currentId = i + 1;
          MarketItem storage currentItem = idToMarketItem[currentId];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }
  
//////////////////////////////// Lazy Minting Part ///////////////////////////////////////
  // Transfers all pending withdrawal balance to the caller. Reverts if the caller is not an authorized minter.
  function withdraw() public {
    require(hasRole(MINTER_ROLE, msg.sender), "Only authorized minters can withdraw");
    
    // IMPORTANT: casting msg.sender to a payable address is only safe if ALL members of the minter role are payable addresses.
    address payable receiver = payable(msg.sender);

    uint amount = pendingWithdrawals[receiver];
    // zero account before transfer to prevent re-entrancy attack
    pendingWithdrawals[receiver] = 0;
    receiver.transfer(amount);
  }

  // Retuns the amount of Ether available to the caller to withdraw.
  function availableToWithdraw() public view returns (uint256) {
    return pendingWithdrawals[msg.sender];
  }

  // Returns a hash of the given NFTVoucher, prepared using EIP712 typed data hashing rules.
  function _hash(NFTVoucher calldata voucher) internal view returns (bytes32) {
    return _hashTypedDataV4(keccak256(abi.encode(
      keccak256("NFTVoucher(uint256 tokenId,uint256 price,string uri)"),
      voucher.tokenId,
      voucher.price,
      keccak256(bytes(voucher.uri))
    )));
  }

  // Returns the chain id of the current blockchain.
  //This is used to workaround an issue with ganache returning different values from the on-chain chainid() function and
  // the eth_chainId RPC method. See https://github.com/protocol/nft-website/issues/121 for context.
  function getChainID() external view returns (uint256) {
    uint256 id;
    assembly {
        id := chainid()
    }
    return id;
  }

  // Verifies the signature for a given NFTVoucher, returning the address of the signer.
  // Will revert if the signature is invalid. Does not verify that the signer is authorized to mint NFTs.
  function _verify(NFTVoucher calldata voucher) internal view returns (address) {
    bytes32 digest = _hash(voucher);
    return ECDSAUpgradeable.recover(digest, voucher.signature);
  }

  function supportsInterface(bytes4 interfaceId) public view virtual override (AccessControlUpgradeable, ERC721Upgradeable) returns (bool) {
    return ERC721Upgradeable.supportsInterface(interfaceId) || AccessControlUpgradeable.supportsInterface(interfaceId);
  }

}