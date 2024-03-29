
import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';

import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </ChakraProvider>

);

