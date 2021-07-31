import { useContext, createContext } from "react";

export const MetaMaskStateContext = createContext();

const useMetaState = () => {
  const { metaState } = useContext(MetaMaskStateContext);
  return metaState;
};

export default useMetaState;
