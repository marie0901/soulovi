import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { marketplaceAddress } from "config";

import NFTMarketplace from "@utils/NFTMarketplace.json";

import Image from "next/image";
import Link from "next/link";
// import { AnimateKeyframes } from "react-simple-animate";

export default function CardNft({ i, nft }) {
  console.log("!!!!!nft:", nft);

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
    // loadNFTs();
  }

  return (
    <div key={i} className="flex flex-wrap ">
      <div className="grow-0 shrink-0 basis-auto w-full ">
        <div className="flex justify-center ">
          <div className="w-full p-4 rounded-lg shadow-lg bg-white max-w-sm">
            {/* <Link href={`/nfts/${nft.id}`}> */}
            <Link href={`/nfts/1`}>
              <a href="#!">
                <img
                  className="w-full object-cover h-48 shadow-lg rounded-lg mb-6"
                  src={nft.image}
                  alt={nft.name}
                />
              </a>
            </Link>
            <div className="p-0  flex">
              <div className=" mb-2 w-3/4">
                <div className="text-gray-900 text-xl font-medium mb-2  truncate">
                  {nft.name}
                </div>
                <p className="text-gray-400 font-mono text-sm ">Axionov</p>
              </div>
              <div className="flex flex-col">
                <div className="text-mono text-xs text-gray-500">Price</div>
                <div className="text-xs flex">
                  <span className="inline-block pt-1">
                    <img
                      className="h-3 inline-block"
                      src="/images/eth-symbol.svg"
                    ></img>
                  </span>

                  <div className="pt-1">{nft.price}</div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-black">
              <button
                className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
                onClick={() => buyNft(nft)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    // <div key={i} className="border shadow rounded-xl overflow-hidden">
    //   <img src={nft.image} />
    //   <div className="p-4">
    //     <p style={{ height: "64px" }} className="text-2xl font-semibold">
    //       {nft.name}
    //     </p>
    //     <div style={{ height: "70px", overflow: "hidden" }}>
    //       <p className="text-gray-400">{nft.description}</p>
    //     </div>
    //   </div>
    //   <div className="p-4 bg-black">
    //     <p className="text-2xl font-bold text-white">{nft.price} ETH</p>
    //     <button
    //       className="mt-4 w-full bg-pink-500 text-white font-bold py-2 px-12 rounded"
    //       onClick={() => buyNft(nft)}
    //     >
    //       Buy
    //     </button>
    //   </div>
    // </div>
  );
}
