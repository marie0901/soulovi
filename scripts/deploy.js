const fs = require('fs');

async function main() {
  const NFTMarketplace = await ethers.getContractFactory('NFTMarketplace');

  //TODO replace my account wth Luka's account of the minter
  const nftMarketplace = await upgrades.deployProxy(NFTMarketplace, [
    '0x80bc2298872d8c88f0eca80fa1a63953ac3093f8',
  ]);
  // NFTMarketplace.deploy('0x80BC2298872D8C88f0Eca80fA1a63953Ac3093F8');

  await nftMarketplace.deployed();

  console.log(nftMarketplace.address, ' nftMarketplace(proxy) address');
  console.log(
    await upgrades.erc1967.getImplementationAddress(nftMarketplace.address),
    ' getImplementationAddress'
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(nftMarketplace.address),
    ' getAdminAddress'
  );

  // fs.writeFileSync(
  //   './config.js',
  //   `
  // export const marketplaceAddress = "${nftMarketplace.address}"
  // `
  // );
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
