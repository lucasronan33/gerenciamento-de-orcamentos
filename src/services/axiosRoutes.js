import axios from './axios'

export const show = (route) => axios.get(route)
export const store = (route, data) => axios.post(route, data)
export const update = (route, data) => axios.put(route, data)
export const destroy = (route) => axios.delete(route)