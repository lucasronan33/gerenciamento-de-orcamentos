import React from "react";
import history from "./services/history";
import { Router } from "react-router-dom";

import Header from "./components/Header";
import GlobalStyles from "./styles/GlobalStyles";
import Routes from "./routes";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history} >
          {/* <Header /> */}
          <Routes />
          <GlobalStyles />
        </Router>
      </PersistGate>
    </Provider>

  );
}

export default App;
