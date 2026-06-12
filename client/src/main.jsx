import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

import "./index.css";

import { BrowserRouter } from "react-router-dom";

import { Toaster } from "react-hot-toast";

import { GlobalContextProvider } from "./context/GlobalContext";
import { JobsContextProvider } from "./context/JobsContext";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <GlobalContextProvider>
        <JobsContextProvider>
          <Toaster position="top-center" />

          <App />
        </JobsContextProvider>
      </GlobalContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);