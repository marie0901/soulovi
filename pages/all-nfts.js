import { ethers } from "ethers";
import { useEffect, useState } from "react";
import axios from "axios";
import Web3Modal from "web3modal";

import { marketplaceAddress } from "../config";
import CardNft from "@components/ui/card-nft";

import NFTMarketplace from "../utils/NFTMarketplace.json";
if (typeof window === "undefined") {
  require("dotenv").config();
}

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    // const provider = new ethers.providers.JsonRpcProvider();
    const provider = new ethers.providers.AlchemyProvider(
      "rinkeby",
      process.env.ALCHEMY_API_KEY
    );
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      provider
    );
    const data = await contract.fetchMarketItems();

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */

    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        // const tokenUri = await contract.tokenURI(i.tokenId);
        const tokenUri = i.tokenURI;
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  async function buyNft(nft) {
    /* needs the user to sign the transaction, so will use Web3Provider and sign it */
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer
    );

    /* user will be prompted to pay the asking proces to complete the transaction */
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(nft.tokenId, {
      value: price,
    });
    await transaction.wait();
    loadNFTs();
  }

  if (loadingState === "loaded" && !nfts.length)
    return (
      <div className="container">
        <div className="flex px-4 py-4">
          <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
            All NFTs
          </h2>
          <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
            {nfts.length} items listed
          </div>
        </div>

        <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>
      </div>
    );
  return (
    <div className="container">
      <div className="flex px-4 py-4">
        <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
          All NFTs
        </h2>
        <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
          {nfts.length} items listed
        </div>
      </div>
      {loadingState === "loaded" ? (
        <div className="flex justify-center">
          <div className="px-4" style={{ maxWidth: "1600px" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
              {nfts.map((nft, i) => (
                // <div>jkjkjkjk</div>
                <CardNft key={i} nft={nft}></CardNft>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>LOADING...</div>
      )}
    </div>
  );
}
