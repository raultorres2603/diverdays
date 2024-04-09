import "./App.css";
import { Login } from "./components/Login";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      <Login />
      <Toaster />
    </>
  );
}

export default App;
