import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => storePathValues, [router.asPath]);

  function storePathValues() {
    const storage = globalThis?.sessionStorage;
    if (!storage) return;
    // Set the previous path as the value of the current path.
    const prevPath = storage.getItem('currentPath');
    storage.setItem('prevPath', prevPath);
    // Set the current path value by looking at the browser's location object.
    storage.setItem('currentPath', globalThis.location.pathname);
  }

  const Layout = Component.Layout ?? Noop;
  return (
    <Layout>
      <ToastContainer />
      <div className="flex flex-grow justify-center">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
