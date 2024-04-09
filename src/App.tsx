import "./App.css";
import { Login } from "./components/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Login />
      <Toaster />
      <div className="fixed bottom-3 left-50 text-md">
        © 2024 raultorres - All rights reserved
      </div>
    </>
  );
}

export default App;
