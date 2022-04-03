import { Web3Provider } from '@components/providers';
import { NavBar } from '@components/ui/common/NavBar';
import { Footer } from '@components/ui/common/Footer';
export const BaseLayout = ({ children }) => {
  return (
    <Web3Provider>
      <div className="max-w-9xl mx-auto px-4 flex flex-col min-h-screen">
        <NavBar />
        <div className="flex flex-grow flex-col justify-center">{children}</div>
        <Footer />
      </div>
    </Web3Provider>
  );
};
