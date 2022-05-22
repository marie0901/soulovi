import { useEthers } from '@components/providers';
import Link from 'next/link';
import { Button } from '@components/ui/common/Button';
import { useAccount } from '@components/hooks/ethers';
import { useRouter } from 'next/router';

import { useState } from 'react'; // import state

export const NavBar = () => {
  const { connect, isLoading, requireInstall, requireConnectMetamask } =
    useEthers();
  const { account } = useAccount();
  // const { pathname } = useRouter();

  const [isNavOpen, setIsNavOpen] = useState(false); // initiate isNavOpen state with false

  return (
    // <nav className=" py-2 " style={{ boxShadow: '0px 2px rgba(0, 0, 0, 0.1)' }}>
    <nav className=" shadow-[0_2px_rgba(0,0,0,0.1)]">
      {/* 0px 2px 10px rgba(0, 0, 0, 0.1) */}
      <div className="mx-auto">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 right-0 flex items-center sm:hidden">
            <button
              type="button"
              className="p-2 "
              aria-controls="mobile-menu"
              data-dropdown-toggle="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsNavOpen(prev => !prev)}
            >
              <span className="sr-only">Open main menu</span>

              <img src="images/wallet1.png" alt="open menu"></img>
            </button>
          </div>
          <div className="p-2 flex-1 flex sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/">
                <a aria-label="Home">
                  <img
                    className="block lg:hidden h-8 w-auto"
                    src="/images/VI.png"
                    alt="logo"
                  />
                  <img
                    className="hidden lg:block h-8 w-auto"
                    src="/images/VI.png"
                    alt="logo"
                  />
                </a>
              </Link>
            </div>

            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/all-nfts">
                  <a
                    href="#"
                    className=" px-3 py-2 text-gray-700 rounded-md text-sm "
                    aria-current="page"
                  >
                    All NFTs
                  </a>
                </Link>
              </div>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <Link href="/my-nfts">
                  <a
                    href="#"
                    className="text-gray-700 px-3 py-2 rounded-md text-sm"
                    aria-current="page"
                  >
                    My NFTs
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div className="hidden absolute inset-y-0 right-0 sm:flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 mr-3 relative">
              <Link href="/create-nft">
                <Button className="mr-2" variant={'gray'}>
                  Create
                </Button>
              </Link>

              {/* Connect Button */}
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  Loading...
                </Button>
              ) : account.data ? (
                <Button hoverable={false} className="cursor-default">
                  Hi there {account.isAdmin && 'Admin'}
                </Button>
              ) : requireInstall ? (
                <Button
                  onClick={() =>
                    window.open('https://metamask.io/download.html', '_blank')
                  }
                >
                  Install Metamask
                </Button>
              ) : (
                <Button onClick={connect}>Connect</Button>
              )}
              {/* End of Connect Button */}
            </div>
          </div>
        </div>
      </div>

      <div
        className="sm:hidden"
        id="mobile-menu"
        onClick={() => setIsNavOpen(prev => !prev)} // toggle isNavOpen state on click
      >
        {/* <div className={isNavOpen ? 'showMenuNav' : 'hideMenuNav'}> */}
        <div className={isNavOpen ? 'flex' : 'hidden'}>
          {/* <div className={isNavOpen ? 'flex' : 'flex'}> */}
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/all-nfts">
              <a
                href="#"
                className=" block px-3 py-2 text-gray-300 hover:text-gray-700 rounded-md text-sm "
                aria-current="page"
              >
                All NFTs
              </a>
            </Link>

            <Link href="/my-nfts">
              <a
                href="#"
                className="block px-3 py-2 text-gray-300 hover:text-gray-700 rounded-md text-sm "
                aria-current="page"
              >
                My NFTs
              </a>
            </Link>

            <Link href="/create-nft">
              <a
                href="#"
                className="block px-3 py-2 text-gray-300 hover:text-gray-700 rounded-md text-sm "
                aria-current="page"
              >
                Create
              </a>
            </Link>

            {/* Connect Button */}
            {isLoading ? (
              <Button disabled={true} onClick={connect}>
                Loading...
              </Button>
            ) : account.data ? (
              <Button hoverable={false} className="cursor-default">
                Hi there {account.isAdmin && 'Admin'}
              </Button>
            ) : requireInstall ? (
              <Button
                onClick={() =>
                  window.open('https://metamask.io/download.html', '_blank')
                }
              >
                Install Metamask
              </Button>
            ) : (
              <Button onClick={connect}>Connect</Button>
            )}
            {/* End of Connect Button */}
          </div>
        </div>
      </div>
    </nav>
  );
};
