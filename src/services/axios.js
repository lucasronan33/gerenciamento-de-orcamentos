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

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config
        const isUnauthorized = error.response?.status === 401
        const isRefreshRequest = originalRequest?.url?.includes('/auth/refresh')

        if (isUnauthorized && originalRequest && !originalRequest._retry && !isRefreshRequest) {
            originalRequest._retry = true

            try {
                const response = await api.post('/auth/refresh', null, { _skipAuthRefresh: true })
                const accessToken = response.data?.accessToken

                if (accessToken) {
                    setAccessToken(accessToken)
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`
                }

                return api(originalRequest)
            } catch (refreshError) {
                console.log('REFRESH FALHOU')
                clearAccessToken()
                store.dispatch(authMeFailure())
                return Promise.reject(refreshError)
            }
        }

        return Promise.reject(error)
    }
)

export default api
