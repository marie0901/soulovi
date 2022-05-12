import { useAccount, useNft } from '@components/hooks/ethers';
import { useWeb3 } from '@components/providers';
import { useState } from 'react';

import { useAllNfts, useWalletInfo } from '@components/hooks/ethers';
import { BaseLayout } from '@components/ui/layout';

import Loader from '@components/ui/common/loader';
import { WalletBar } from '@components/ui/ethers';
import { CardNft } from '@components/ui/card-nft';
import { Return } from '@components/ui/common/Return';

export default function ArtistNfts(props) {
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();

  const { allNfts } = useAllNfts(account.data);
  return (
    <div className="flex-grow">
      {allNfts.data ? (
        <div>
          <div className="flex  py-4 font-lato">
            <Return />
            <div className="pl-4 font-bold leading-tight text-3xl">
              {props.slug}
            </div>
            <div className="pl-4   font-mono text-xs font-normal  pb-1 flex">
              <div className="flex justify-end flex-col">
                <a href="#!" className="mr-6 text-gray-600">
                  Instagram
                </a>
              </div>
              <div className="flex justify-end flex-col">
                <a href="#!" className="mr-6 text-gray-600">
                  Twitter
                </a>
              </div>
              <div className="flex justify-end flex-col">
                <a href="#!" className="mr-6 text-gray-600">
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <WalletBar />
          <div className="flex justify-center flex-col">
            <div className="">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                {allNfts.data
                  .filter(item => item.artist == props.slug)
                  .map((nft, i) => (
                    <CardNft key={i} nft={nft}></CardNft>
                  ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex  py-4">
            {/* <Return /> */}
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

  //   <div className="container">
  //     <div className="pt-4">
  //       <WalletBar />
  //     </div>

  //     <div className="flex px-4 py-4">
  //       <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
  //         All NFTs
  //       </h2>
  //       <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
  //         {allNfts.data.filter(item => item.artist == props.slug).length} items
  //         listed
  //       </div>
  //     </div>

  //     <div className="flex justify-center">
  //       <div className="px-4" style={{ maxWidth: '1600px' }}>
  //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
  //           {allNfts.data
  //             .filter(item => item.artist == props.slug)
  //             .map((nft, i) => (
  //               <CardNft key={i} nft={nft}></CardNft>
  //             ))}
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // ) : (
  //   <Loader />
  // );
}

export function getStaticPaths() {
  return {
    paths: [
      {
        params: {
          slug: 'default-slug',
        },
      },
    ],
    fallback: true,
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

ArtistNfts.Layout = BaseLayout;
