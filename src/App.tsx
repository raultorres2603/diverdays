import "./App.css";
import { Login } from "./components/Login";
import { Toaster } from "react-hot-toast";
import { MainContext } from "./contexts/MainContext";

function App() {
  return (
    <>
      <MainContext>
        <Login />
        <Toaster />
        <div className="fixed bottom-3 left-50 text-md">
          © 2024 raultorres - All rights reserved
        </div>
      </MainContext>
    </>
  );
}

export default App;
