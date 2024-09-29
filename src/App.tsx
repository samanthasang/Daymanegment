import { useState } from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import AppRoutes from "./AppRouter";

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
