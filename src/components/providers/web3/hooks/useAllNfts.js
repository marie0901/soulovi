import axios from 'axios';
import useSWR from 'swr';
import { ethers } from 'ethers';

export const handler = (web3, contract) => () => {
  const swrRes = useSWR(
    () => (contract ? `web3/allNfts` : null),
    async () => {
      const allNfts = await contract.methods.fetchMarketItems().call();
      // console.log('!!!!!allNfts', allNfts);
      const allNftsMeta = await Promise.all(
        allNfts.map(async i => {
          const tokenUri = i.tokenURI;
          if (!tokenUri || tokenUri == 'undefined') {
            console.log(
              `Warning: tokenUri is not defined for the tokenId ${i.tokenId}`
            );
            //  continue;
          } else {
            const meta = await axios.get(tokenUri);
            let price = ethers.utils.formatUnits(`${i.price}`, 'ether');
            let item = {
              price,
              tokenId: +i.tokenId,
              seller: i.seller,
              owner: i.owner,
              image: meta.data.image,
              name: meta.data.name,
              artist: meta.data.artist,
              description: meta.data.description,
            };
            return item;
          }
        })
      );
      return allNftsMeta.filter(element => {
        return element !== undefined;
      });
    }
  );

  return {
    ...swrRes,
  };
};
