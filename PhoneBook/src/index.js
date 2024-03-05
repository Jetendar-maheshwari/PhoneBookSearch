import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import PhoneBook from "./components/PhoneBook/PhoneBookComponent";
import { ApolloProvider } from "@apollo/client";

import client from "./configuration/ApolloClient";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <PhoneBook />
    </ApolloProvider>
  </React.StrictMode>
);

reportWebVitals();
