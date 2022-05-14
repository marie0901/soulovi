import { useEthers } from '@components/providers';
import { useAllNfts, useWalletInfo } from '@components/hooks/ethers';
import { WalletBar } from '@components/ui/ethers';

import { BaseLayout } from '@components/ui/layout';

import { CardNft } from '@components/ui/card-nft';
import Loader from '@components/ui/common/loader';

if (typeof window === 'undefined') {
  require('dotenv').config();
}

export default function AllNfts() {
  const { ethers, contract, signer } = useEthers();
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();
  const { allNfts } = useAllNfts();
  return (
    <div className="flex-grow">
      {allNfts.data ? (
        <div>
          <div className="flex  py-4">
            <h2 className="font-bold leading-tight text-3xl ">All NFTs</h2>
            <div className=" pl-3   font-mono text-xs font-normal flex justify-end flex-col pb-1">
              <div className="flex ">{allNfts.data.length} items listed</div>
            </div>
          </div>
          <WalletBar />
          <div className="flex justify-center flex-col">
            <div className="">
              {/* <div className="px-4" style={{ maxWidth: '1600px' }}> */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {allNfts.data.map((nft, i) => (
                  <CardNft key={i} nft={nft}></CardNft>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex  py-4">
            <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
              All NFTs
            </h2>
          </div>
          <WalletBar />
          {/* <Loader /> */}
        </div>
      )}
    </div>
  );
}

AllNfts.Layout = BaseLayout;
