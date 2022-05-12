import axios from 'axios';
import useSWR from 'swr';
import { ethers } from 'ethers';

export const handler = (web3, contract) => (tokenId, account) => {
  const swrRes = useSWR(
    () => (contract && tokenId ? `web3/nft/${tokenId}` : null),
    async () => {
      // const nft = await contract.methods.fetchMarketItem(`${tokenId}`).call();

      const nft = await contract.fetchMarketItem(`${tokenId}`);

      // MM TODO use this commented code to debug.
      //  Then comment againe because the const inside try block is not visible further
      //
      // try {
      //   const nft = await contract.fetchMarketItem(`${tokenId}`);

      //   console.log('!!!!!nft', nft);
      // } catch (err) {
      //   console.log('!!!!!Error nft', err);
      // }

      const nftMeta = await axios.get(nft.tokenURI);
      let item = {
        price: ethers.utils.formatUnits(`${nft.price}`, 'ether'),
        priceRow: nft.price,
        tokenId: nft.tokenId,
        seller: nft.seller,
        owner: nft.owner,
        image: nftMeta.data.image,
        name: nftMeta.data.name,
        artist: nftMeta.data.artist,
        description: nftMeta.data.description,
      };

      return item;
    }
  );

  return {
    ...swrRes,
  };
};
