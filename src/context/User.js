const { createContext, useState, useContext } = require('react');

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({})

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
