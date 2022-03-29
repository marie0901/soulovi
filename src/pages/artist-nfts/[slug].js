import { useAccount, useNft } from '@components/hooks/web3';
import { useWeb3 } from '@components/providers';
import { useState } from 'react';

import { useAllNfts, useWalletInfo } from '@components/hooks/web3';
import { BaseLayout } from '@components/ui/layout';

import Loader from '@components/ui/common/loader';
import { WalletBar } from '@components/ui/web3';
import { CardNft } from '@components/ui/card-nft';

export default function ArtistNfts(props) {
  const { hasConnectedWallet, isConnecting, account } = useWalletInfo();

  const { allNfts } = useAllNfts(account.data);
  return allNfts.data ? (
    // {let artistNfts = allNfts.data.filter(item => item.artist == 'ttt')}
    <div className="container">
      <div className="pt-4">
        <WalletBar />
      </div>

      <div className="flex px-4 py-4">
        <h2 className="font-medium leading-tight text-4xl mt-0 mb-2 text-gray-800">
          All NFTs
        </h2>
        <div className="text-gray-500 text-xs font-mono pl-3 pt-6 tracking-widest align-bottom">
          {allNfts.data.filter(item => item.artist == props.slug).length} items
          listed
        </div>
      </div>

      <div className="flex justify-center">
        <div className="px-4" style={{ maxWidth: '1600px' }}>
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
    <Loader />
  );
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
