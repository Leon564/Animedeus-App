import { NativeRouter } from "react-router-native";
import 'react-native-url-polyfill/auto';
import { LogBox } from 'react-native';
import AuthProvider from "./src/components/AuthContext";
import Main from "./src/components/Main";
import useFetchLastAppVersion from "./src/hooks/useFetchLastAppVersion";

LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message

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
