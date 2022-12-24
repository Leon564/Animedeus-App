import { NativeRouter } from "react-router-native";
import AuthProvider from "./src/components/AuthContext";
import Main from "./src/components/Main";
import useFetchLastAppVersion from "./src/hooks/useFetchLastAppVersion";

export default function App() {
  useFetchLastAppVersion();
  return (
    <NativeRouter>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </NativeRouter>
  );
}
