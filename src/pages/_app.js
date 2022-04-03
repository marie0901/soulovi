import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const Noop = ({ children }) => <>{children}</>;

function MyApp({ Component, pageProps }) {
  const Layout = Component.Layout ?? Noop;
  return (
    <Layout>
      <ToastContainer />
      <div className="flex flex-grow">
        <Component {...pageProps} />
      </div>
    </Layout>
  );
}

export default MyApp;
