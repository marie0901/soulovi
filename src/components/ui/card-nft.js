import Image from 'next/image';
import Link from 'next/link';
// import { AnimateKeyframes } from "react-simple-animate";

export const CardNft = ({ i, nft }) => {
  return (
    <div key={i} className="flex flex-wrap ">
      <div className="grow-0 shrink-0 basis-auto w-full ">
        <div className="flex justify-center ">
          <div className="w-full p-4 border rounded-lg bg-white max-w-sm">
            <Link href={`/nfts/${nft.tokenId}`}>
              {/* <Link href={`/nfts/1`}> */}
              <a href="#!">
                <img
                  className="w-full object-cover h-64 shadow-lg rounded-lg mb-6"
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

                <Link href={`/artist-nfts/${nft.artist}`}>
                  <a href="#!">
                    <p className="text-gray-400 font-mono text-sm ">
                      {nft.artist}
                    </p>
                  </a>
                </Link>
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
  );
};
