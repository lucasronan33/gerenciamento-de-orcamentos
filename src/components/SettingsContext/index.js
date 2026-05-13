const { createContext, useContext, useState } = require('react')

const SettingsContext = createContext()

const initialState = {
}

export function SettingsProvider({ children }) {
    const [settings, setSettings] = useState(initialState)

    function updateSettings(field, settings) {
        setSettings(prev => ({
            ...prev,
            [field]: settings
        }))
    }

    return (
        <SettingsContext.Provider value={
            {
                settings,
                setSettings,
                updateSettings,
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