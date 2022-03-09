import "styles/globals.css";
import Link from "next/link";
import Image from "next/image";

function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col h-screen">
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

                {/* <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>

                <svg
                  className="hidden h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg> */}
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
                <Link href="/create-nft">
                  <a
                    href="#"
                    className=" border border-gray-400 rounded-full  text-gray-500 px-8 py-1  text-xs"
                    aria-current="page"
                  >
                    Create
                  </a>
                </Link>
              </div>
              <button
                type="button"
                className=" p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              >
                <span className="sr-only">View notifications</span>

                <img
                  className="h-8 w-8 rounded-full"
                  src="/images/wallet1.png"
                  alt=""
                />
              </button>

              <div className="ml-3 relative">
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
                {/* 
                <div
                  className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div> */}
              </div>
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
      <div className="flex flex-grow">
        <Component {...pageProps} />
      </div>

      <footer className="text-center lg:text-left  text-gray-600">
        <div className="font-mono text-xs flex justify-center items-center lg:justify-between p-4  border-gray-300">
          <div className="mr-12 hidden lg:block ">
            <span>About Us</span>
          </div>
          <div className="flex justify-center">
            <a href="#!" className="mr-6 text-gray-600">
              Instagram
            </a>
            <a href="#!" className="mr-6 text-gray-600">
              Twitter
            </a>
            <a href="#!" className="mr-6 text-gray-600">
              Facebook
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MyApp;
