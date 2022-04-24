// const hre = require('hardhat');

const proxyAddress = '0x3d41276834c063b018cD8da33eB0C32C00Ee2c06';

async function main() {
  console.log(proxyAddress, ' original NFTMarketplace(proxy) address');
  const NFTMarketplaceV2 = await ethers.getContractFactory('NFTMarketplaceV2');
  console.log('upgrade to NFTMarketplaceV2...');
  const nftMarketplaceV2 = await upgrades.upgradeProxy(
    proxyAddress,
    NFTMarketplaceV2
  );
  console.log(
    nftMarketplaceV2.address,
    ' NFTMarketplaceV2 address(should be the same)'
  );

  console.log(
    await upgrades.erc1967.getImplementationAddress(nftMarketplaceV2.address),
    ' getImplementationAddress'
  );
  console.log(
    await upgrades.erc1967.getAdminAddress(nftMarketplaceV2.address),
    ' getAdminAddress'
  );
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
