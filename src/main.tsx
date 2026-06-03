import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import MainTracker from "./MainTracker";
import { Provider } from "react-redux";
import { store } from "./Store/store";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <MainTracker />
    </Provider>
  </StrictMode>,
);
