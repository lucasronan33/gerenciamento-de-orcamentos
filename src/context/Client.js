import { toast } from 'react-toastify';
import { show } from '../services/axiosRoutes';

const { createContext, useState, useContext, useCallback } = require('react');

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

    const fetchClient = useCallback(async () => {
        try {
            const { data } = await show('/client')
            return data.Client
        } catch (err) {
            toast.error(err.message)
        }
    }, [])

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
                fetchClient,
                updateClient,
                updateSubClient,
            }
        }>
            {children}
        </ClientContext.Provider>
    )
}

export function useClient() {
    return useContext(ClientContext)
}
