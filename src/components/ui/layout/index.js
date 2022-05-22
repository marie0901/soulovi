import { EthersProvider, Web3Provider } from '@components/providers';
import { NavBar } from '@components/ui/common/NavBar';
import { Footer } from '@components/ui/common/Footer';
export const BaseLayout = ({ children }) => {
  return (
    // <Web3Provider>
    <EthersProvider>
      <div className="overflow-hidden max-w-9xl mx-auto sm:px-4 flex flex-col min-h-screen">
        {/* <div className="container overflow-hidden"> */}
        <NavBar />
        <div className="flex flex-grow flex-col justify-center">{children}</div>
        <Footer />
      </div>
    </EthersProvider>
    // </Web3Provider>
  );
};
