// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;
pragma abicoder v2; // required to accept structs as function parameters

import "./NFTMarketplace.sol";

contract NFTMarketplaceV2 is NFTMarketplace {
// TODO: remove this test function
    /* For testing upgradable Returns the listing price of the contract */
    function testUpgrade() public view returns (uint256) {
      return 777;
    }

}