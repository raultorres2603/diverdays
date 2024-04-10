import "./App.css";
import { Toaster } from "react-hot-toast";
import { MainContext } from "./contexts/MainContext";
import { CookiesProvider } from "react-cookie";
import { View } from "./components/View";

function App() {
  return (
    <>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        <MainContext>
          <View />
          <Toaster />
        </MainContext>
      </CookiesProvider>
    </>
  );
}

export default App;
