import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { GlobalContextProvider } from "./context/GlobalContext";
import { JobsContextProvider } from "./context/JobsContext";

import { Auth0Provider } from "@auth0/auth0-react";

// Font Awesome
import "@fortawesome/fontawesome-free/css/all.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <BrowserRouter>
        <GlobalContextProvider>
          <JobsContextProvider>
            <Toaster position="top-center" />
            <App />
          </JobsContextProvider>
        </GlobalContextProvider>
      </BrowserRouter>
    </Auth0Provider>
  </React.StrictMode>
);