import { Web3Provider } from '@components/providers';
import { NavBar } from '@components/ui/common/NavBar';

export const BaseLayout = ({ children }) => {
  return (
    <Web3Provider>
      <div className="max-w-9xl mx-auto px-4">
        <NavBar />
        <div className="fit">{children}</div>
      </div>
      {/* <Footer /> */}
    </Web3Provider>
  );
};
