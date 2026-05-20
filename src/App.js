import React from "react"
import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";
import Routers from "./routes";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { persistor } from "./store/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { authMeRequest } from "./store/modules/auth/actions";
import { authMeFailure } from "./store/modules/auth/actions";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br'
import { setAccessToken } from "./services/authToken";

function AuthInitializer() {
  const dispatch = useDispatch()
  const accessToken = useSelector((state) => state.auth?.accessToken)

  useEffect(() => {
    if (!accessToken) {
      dispatch(authMeFailure())
      return
    }

    setAccessToken(accessToken)
    dispatch(authMeRequest())
  }, [dispatch, accessToken])

  return null
}

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID?.trim()
  const appContent = (
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
  )

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale='pt-br'
    >
      {googleClientId ? (
        <GoogleOAuthProvider clientId={googleClientId}>
          {appContent}
        </GoogleOAuthProvider>
      ) : appContent}
    </LocalizationProvider>
  );
}

export default App;
