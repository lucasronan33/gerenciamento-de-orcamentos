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
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br'

function AuthInitializer() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(authMeRequest())
  }, [dispatch])

  return null
}

function App() {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='pt-br'
    >
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID} >
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
      </GoogleOAuthProvider>
    </LocalizationProvider>
  );
}

export default App;
