import { useWeb3 } from '@components/providers';
import Link from 'next/link';
import { Button } from '@components/ui/common/Button';
import { useAccount } from '@components/hooks/web3';
import { useRouter } from 'next/router';

export const NavBar = () => {
  const { connect, isLoading, requireInstall } = useWeb3();
  const { account } = useAccount();
  const { pathname } = useRouter();

  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-12">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
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
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="ml-3 mr-3 relative">
              {/* <Link href="/create-nft">
                <a
                  href="#"
                  className=" border border-gray-400 rounded-full  text-gray-500 px-8 py-1  text-xs"
                  aria-current="page"
                >
                  Create
                </a>
              </Link> */}
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

            {/* <div className="ml-3 relative">
              <div>
                <button
                  type="button"
                  className=" flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  id="user-menu-button"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    className="h-8 w-8 rounded-full"
                    src="/images/user1.png"
                    alt=""
                  />
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>

      <div className="sm:hidden" id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a
            href="#"
            className="bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
            aria-current="page"
          >
            Dashboard
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Team
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Projects
          </a>

          <a
            href="#"
            className="text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};
