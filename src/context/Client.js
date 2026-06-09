const { createContext, useState, useContext } = require('react');

const ClientContext = createContext()

export const ClientProvider = ({ children }) => {
    const [client, setClient] = useState({})

    function resetClientState() {
        setClient({})
    }

    function updateClient(field, settings) {
        setClient(prev => ({
            ...prev,
            [field]: settings
        }))
    }
    function updateSubClient(field, subfield, setting) {
        setClient(prev => ({
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
        <ClientContext.Provider value={
            {
                client,
                setClient,
                updateClient,
                updateSubClient,
                resetClientState,
            }
        }>
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    return useContext(ClientContext)
}
