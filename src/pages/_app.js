import { MetamaskStateProvider } from "use-metamask";
import { useState } from "react";

import "../styles/globals.css";
import { MetaMaskStateContext } from "../lib/use-metastate";

function MyApp({ Component, pageProps }) {
  const [metaState, setMetaState] = useState({
    account: null,
    isConnected: false,
  });

  return (
    <MetamaskStateProvider>
      <MetaMaskStateContext.Provider value={{ metaState, setMetaState }}>
        <Component {...pageProps} />
      </MetaMaskStateContext.Provider>
    </MetamaskStateProvider>
  );
}

export default MyApp;
