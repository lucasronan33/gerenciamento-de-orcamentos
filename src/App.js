import React from "react";
import history from "./services/history";
import { BrowserRouter } from "react-router-dom";

import Header from "./components/Header";
import GlobalStyles from "./styles/GlobalStyles";
import Routers from "./routes";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter >
          <GlobalStyles />
          <Routers />
        </BrowserRouter>
      </PersistGate>
    </Provider>

  );
}

export default App;
