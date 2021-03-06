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
          <div className="flex  py-4 mx-4 sm:mx-0">
            <Return />
            <div className="pl-4 leading-tight text-3xl">{props.slug}</div>
            <div className="pl-4   font-mono text-xs font-normal  pb-1 hidden sm:flex">
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
