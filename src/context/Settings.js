const { createContext, useContext, useState } = require('react')

const SettingsContext = createContext()

const initialState = {
    services: {
        workDays: [1, 2, 3, 4, 5, 6],
        priceHour: 0,
        endHour: '23:59',
        startHour: '00:00',
        stepHour: 30,
        minTimeService: '00:00'
    }
}

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(initialState)

    function updateSettings(field, settings) {
        setSettings(prev => ({
            ...prev,
            [field]: settings
        }))
    }
    function updateSubSettings(field, subfield, setting) {
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
                initialState,
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
