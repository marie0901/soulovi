import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import axios from 'axios';
import Web3Modal from 'web3modal';

import Link from 'next/link';
import Image from 'next/image';

import { BaseLayout } from '@components/ui/layout';

import { marketplaceAddress } from '../../config';
import NFTMarketplace from '@utils/NFTMarketplace.json';

if (typeof window === 'undefined') {
  require('dotenv').config();
}

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');
  useEffect(() => {
    // loadNFTs();
  }, []);

  if (loadingState === 'loaded' && !nfts.length)
    return <h1 className="px-20 py-10 text-3xl">No items in marketplace</h1>;
  return (
    <div className="container px-2 sm:px-6 mx-auto flex flex-col justify-center">
      <div className="hidden sm:flex flex-col pt-6">
        <div className="flex">
          <div className=" font-hanson text-7xl text-ukrblue tracking-wider">
            SUPPORT
          </div>
          <div className="text-gray-500 text-xs font-mono pl-3 pt-2 tracking-widest">
            &#40;Non-Profit Platform&#41;
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 lg:w-4/12">
            <div className="flex justify-center">
              <div className="p-4 rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!">
                  <img
                    className="rounded-t-lg aspect-square"
                    src="/images/backhomes.jpg"
                    alt=""
                  />
                </a>
                <div className="pt-4">
                  <div className="text-gray-900 text-xl font-medium mb-2">
                    Stand with Ukraine
                  </div>
                  <a
                    href=" https://www.instagram.com/eduard_ov"
                    className="  text-gray-400 font-mono text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    eduard_ov
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12 md:pl-12 text-center md:text-left">
            <div className="font-hanson text-7xl text-ukryellow tracking-wider">
              UKRAINE
            </div>
            <div className="mt-16 grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12">
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio est ab iure inventore dolorum consectetur? Molestiae
                aperiam atque quasi consequatur aut? Repellendus alias dolor ad
                nam, soluta distinctio quis accusantium!
              </p>
            </div>
            <div className="mb-6 mt-12 flex space-x-4 justify-center md:justify-start">
              <Link href="/all-nfts">
                <a
                  href="#"
                  className="text-center w-28 border border-gray-400 rounded-full  text-white bg-black px-4 py-2  text-sm font-medium"
                  aria-current="page"
                >
                  Explore
                </a>
              </Link>
              <Link href="/create-nft">
                <a
                  href="#"
                  className="text-center w-28 border border-gray-400 rounded-full  text-gray-500 px-4 py-2  text-sm font-medium"
                  aria-current="page"
                >
                  Create
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="flex sm:hidden flex-col pt-6">
        <div className="flex flex-col ">
          <div className="text-5xl font-hanson text-ukrblue tracking-wider">
            SUPPORT
          </div>
          <div className=" text-5xl font-hanson text-ukryellow">UKRAINE</div>
          <div className="text-gray-500 text-xs font-mono pt-2 tracking-widest">
            &#40;Non-Profit Platform&#41;
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="grow-0 shrink-0 basis-auto w-full md:w-3/12 lg:w-4/12">
            <div className="flex justify-center">
              <div className="p-2 rounded-lg shadow-lg bg-white max-w-sm">
                <a href="#!">
                  <img
                    className="rounded-t-lg aspect-square"
                    src="/images/backhomes.jpg"
                    alt=""
                  />
                </a>
                <div className="pt-4">
                  <div className="text-gray-900 text-xl font-medium mb-2">
                    Stand with Ukraine
                  </div>
                  <a
                    href=" https://www.instagram.com/eduard_ov"
                    className="  text-gray-400 font-mono text-xs"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    eduard_ov
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12 md:pl-12 text-center md:text-left">
            <div className="mt-4 grow-0 shrink-0 basis-auto w-full md:w-9/12 lg:w-8/12">
              <p className="text-xs">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Distinctio est ab iure inventore dolorum consectetur? Molestiae
                aperiam atque quasi consequatur aut? Repellendus alias dolor ad
                nam, soluta distinctio quis accusantium!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Home.Layout = BaseLayout;
