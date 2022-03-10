import axios from "axios";
import useSWR from "swr";
import { ethers } from "ethers";

export const handler = (web3, contract) => (account) => {
  const swrRes = useSWR(
    () => (web3 && contract && account ? `web3/allNfts/${account}` : null),
    async () => {
      const allNfts = await contract.methods.fetchMarketItems().call();
      const allNftsMeta = await Promise.all(
        allNfts.map(async (i) => {
          // const tokenUri = await contract.tokenURI(i.tokenId);
          const tokenUri = i.tokenURI;
          const meta = await axios.get(tokenUri);
          let price = ethers.utils.formatUnits(`${i.price}`, "ether");
          let item = {
            price,
            tokenId: +i.tokenId,
            seller: i.seller,
            owner: i.owner,
            image: meta.data.image,
            name: meta.data.name,
            description: meta.data.description,
          };
          return item;
        })
      );
      return allNftsMeta;
    }
  );

  return {
    ...swrRes,
  };
};
