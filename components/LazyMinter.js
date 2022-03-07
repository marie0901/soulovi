const ethers = require("ethers");

// These constants must match the ones used in the smart contract.
const SIGNING_DOMAIN_NAME = "LazyNFT-Voucher";
const SIGNING_DOMAIN_VERSION = "1";

/**
 * LazyMinter is a helper class that creates NFTVoucher objects and signs them, to be redeemed later by the LazyNFT contract.
 */
class LazyMinter {
  constructor({ contract, signer }) {
    this.contract = contract;
    this.signer = signer;
  }

  /**
   * Creates a new NFTVoucher object and signs it using this LazyMinter's signing key.
   *
   * @param {ethers.BigNumber | number} tokenId the id of the un-minted NFT
   * @param {string} uri the metadata URI to associate with this NFT
   * @param {ethers.BigNumber | number} minPrice the minimum price (in wei) that the creator will accept to redeem this NFT. defaults to zero
   *
   * @returns {NFTVoucher}
   */
  async createVoucher(tokenId, uri, price = 0) {
    const voucher = { tokenId, uri, price };
    const domain = await this._signingDomain();
    const types = {
      NFTVoucher: [
        { name: "tokenId", type: "uint256" },
        { name: "price", type: "uint256" },
        { name: "uri", type: "string" },
      ],
    };

    const signature = await this.signer._signTypedData(domain, types, voucher);
    return {
      ...voucher,
      signature,
    };
  }

  /**
   * @private
   * @returns {object} the EIP-721 signing domain, tied to the chainId of the signer
   */
  async _signingDomain() {
    if (this._domain != null) {
      return this._domain;
    }
    const chainId = await this.contract.getChainID();

    this._domain = {
      name: SIGNING_DOMAIN_NAME,
      version: SIGNING_DOMAIN_VERSION,
      verifyingContract: this.contract.address,
      chainId,
    };
    return this._domain;
  }
}

module.exports = {
  LazyMinter,
};
