import { show } from '../../services/axiosRoutes'

const { createContext, useContext, useState, useCallback } = require('react')

const SettingsContext = createContext()

const initialState = {
    services: {
        workDays: [],
        priceHour: 0,
        endHour: '00:00',
        startHour: '00:00',
        stepHour: 30,
        minTimeService: '00:00'
    }
}

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(initialState)

    const fetchSettings = useCallback(async () => {
        try {
            const { data } = await show('/user/settings')
            setSettings(data)
        } catch (error) {
            setSettings(initialState)
        }
    }, [])

    function updateSettings(field, settings) {
        setSettings(prev => ({
            ...prev,
            [field]: settings
        }))
    }
    function updateSubSettings(field, subfield, setting) {
        console.log(settings)
        setSettings(prev => ({
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
        <SettingsContext.Provider value={
            {
                settings,
                setSettings,
                updateSettings,
                updateSubSettings,

                fetchSettings
            }
        }
        >
            {children}
        </SettingsContext.Provider>
    )
}

export function useSettings() {
    return useContext(SettingsContext)
}