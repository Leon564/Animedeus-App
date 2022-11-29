import { NativeRouter } from "react-router-native";
import Main from "./src/components/Main";
import useFetchLastAppVersion from "./src/hooks/useFetchLastAppVersion";

export default function App() {
  useFetchLastAppVersion();
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
