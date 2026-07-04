import {
    useEffect
} from "react";
import {
    BrowserRouter
} from "react-router-dom";

import {
    LocalizationProvider
} from '@mui/x-date-pickers';
import {
    AdapterDayjs
} from '@mui/x-date-pickers/AdapterDayjs';
import {
    GoogleOAuthProvider
} from '@react-oauth/google';
import 'dayjs/locale/pt-br';
import {
    Provider,
    useDispatch,
    useSelector
} from "react-redux";
import {
    ToastContainer
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    PersistGate
} from 'redux-persist/integration/react';
import Routers from "./routes";
import {
    setAccessToken
} from "./services/authToken";
import {
    authMeFailure,
    authMeRequest
} from "./store/modules/auth/actions";
import store, {
    persistor
} from "./store/store";
import GlobalStyles from "./styles/GlobalStyles";

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
    const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim()
    const appContent = ( <
        Provider store = {
            store
        } >
        <
        PersistGate persistor = {
            persistor
        } >
        <
        BrowserRouter >
        <
        GlobalStyles / >
        <
        ToastContainer autoClose = {
            3000
        }
        /> <
        AuthInitializer / >
        <
        Routers / >
        <
        /BrowserRouter> <
        /PersistGate> <
        /Provider>
    )

    return ( <
        LocalizationProvider dateAdapter = {
            AdapterDayjs
        }
        adapterLocale = 'pt-br' >
        {
            googleClientId ? ( <
                GoogleOAuthProvider clientId = {
                    googleClientId
                } > {
                    appContent
                } <
                /GoogleOAuthProvider>
            ) : appContent
        } <
        /LocalizationProvider>
    );
}

export default App;