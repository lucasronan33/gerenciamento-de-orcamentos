import axios from "axios";
import { clearAccessToken, getAccessToken, setAccessToken } from "./authToken";
import store from '../store/store'
import { authMeFailure } from '../store/modules/auth/actions';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URI,
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const accessToken = getAccessToken()

    config.headers.Authorization = `Bearer ${accessToken}`

    return config
})

let refreshTokenPromise = null
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const isUnauthorized = error.response?.status === 401
        const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh')

        if (isUnauthorized
            && originalRequest
            && !originalRequest._retry
            && !isRefreshRequest) {
            originalRequest._retry = true

            try {
                if (!refreshTokenPromise) {
                    refreshTokenPromise = api
                        .post('/auth/refresh', null, { _skipAuthRefresh: true })
                        .then(response => {
                            const token = response.data?.accessToken

                            if (token) {
                                setAccessToken(token)
                            }
                            return token
                        })
                        .finally(() => { refreshTokenPromise = null })
                }

                const accessToken = await refreshTokenPromise
                originalRequest.headers.Authorization = `Bearer ${accessToken}`

                return api(originalRequest)
            } catch (refreshError) {
                clearAccessToken()
                store.dispatch(authMeFailure())
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api
