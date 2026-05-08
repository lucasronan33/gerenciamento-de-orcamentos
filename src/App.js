import React from "react"
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Routers from "./routes";
import { Provider, useDispatch } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authMeRequest } from "./store/modules/auth/actions";

function AuthInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMeRequest())
  }, [dispatch])

  return null
}

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <BrowserRouter >
          <GlobalStyles />
          <ToastContainer autoClose={3000} />
          <AuthInitializer />
          <Routers />
        </BrowserRouter>
      </PersistGate>
    </Provider>

  );
}

export default App;
