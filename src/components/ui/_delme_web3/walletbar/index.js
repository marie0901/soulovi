// import { useWalletInfo } from '@components/hooks/web3';
import { useWalletInfo } from '@components/hooks/ethers';
import { useWeb3 } from '@components/providers';
import { Button } from '@components/ui/common/Button';

export default function WalletBar() {
  const { requireInstall } = useWeb3();
  const { account, network } = useWalletInfo();

  return (
    <section className=" bg-ukrgray rounded-lg">
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 ">
        <div className="pr-4">
          <h1 className="text-base xs:text-xl break-words">
            Hello, {account.data}
          </h1>
          <h2 className="subtitle text-sm xs:text-base">
            I hope you are having a great day!
          </h2>
        </div>

        <div className="flex justify-end items-center">
          <div className="pl-4">
            {network.hasInitialResponse && !network.isSupported && (
              <div className="bg-red-400 p-4 rounded-lg">
                <div>Connected to wrong network</div>
                <div>
                  Connect to: {` `}
                  <span className="text-xl">{network.target}</span>
                </div>
              </div>
            )}
            {requireInstall && (
              <div className="bg-yellow-500 p-4 rounded-lg">
                Cannot connect to network. Please install Metamask.
              </div>
            )}
            {!requireInstall && network.data && (
              <div>
                <span>Currently on </span>
                <span className="text-xl">{network.data}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
