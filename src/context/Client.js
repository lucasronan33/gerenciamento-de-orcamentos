const { createContext, useState, useContext } = require('react');

const ClientContext = createContext()
const initialState = {
    name: '',
    cpf_cnpj: '',
    phone: '',
    whatsapp: '',
    address: {
        street: '',
        number: '',
        city: '',
        state: '',
        zipCode: '',
    },
}

export const ClientProvider = ({ children }) => {
    const [client, setClient] = useState(initialState)

    function resetClientState() {
        setClient(initialState)
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
