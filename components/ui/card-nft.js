import Image from "next/image";
import Link from "next/link";
// import { AnimateKeyframes } from "react-simple-animate";

export default function CardNft({ i, nft }) {
  console.log("!!!!!nft:", nft);
  return (
    <div key={i} className="flex flex-wrap ">
      <div className="grow-0 shrink-0 basis-auto w-full ">
        <div className="flex justify-center ">
          <div className="w-full p-4 rounded-lg shadow-lg bg-white max-w-sm">
            <a href="#!">
              <img
                className="w-full object-cover h-48 shadow-lg rounded-lg mb-6"
                src={nft.image}
                alt={nft.name}
              />
            </a>
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
