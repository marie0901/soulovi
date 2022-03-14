import axios from "axios";
import useSWR from "swr";
import { ethers } from "ethers";

export const handler = (web3, contract) => (tokenId, account) => {
  const swrRes = useSWR(
    () =>
      web3 && contract && account && tokenId ? `web3/nft/${tokenId}` : null,
    async () => {
      // const nft = await contract.method.testMarketItems().call();
      const nft = await contract.methods.fetchMarketItem("1").call();

      const nftMeta = await axios.get(nft.tokenURI);

      let item = {
        price: ethers.utils.formatUnits(`${nft.price}`, "ether"),
        tokenId: nft.tokenId,
        seller: nft.seller,
        owner: nft.owner,
        image: nftMeta.data.image,
        name: nftMeta.data.name,
        description: nftMeta.data.description,
      };

      return item;
    }
  );

  return {
    ...swrRes,
  };
};
