import { toast } from 'react-toastify';
import { show } from '../services/axiosRoutes';

const { createContext, useState, useContext, useCallback } = require('react');

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

    const fetchUser = useCallback(async () => {
        try {
            const { data } = await show('/user')
            return data.user
        } catch (err) {
            toast.error(err.message)
        }
    }, [])

    function updateUser(field, settings) {
        setUser(prev => ({
            ...prev,
            [field]: settings
        }))
    }
    function updateSubUser(field, subfield, setting) {
        setUser(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subfield]:
                    typeof setting === 'function'
                        ? setting(prev[field][subfield])
                        : setting
            }
        }))
    }

    return (
        <UserContext.Provider value={
            {
                user,
                setUser,
                fetchUser,
                updateUser,
                updateSubUser,
            }
        }>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}
