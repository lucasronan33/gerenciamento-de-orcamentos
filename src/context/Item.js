const { createContext, useState, useContext } = require('react');

const ItemContext = createContext()
const initialState = {
    code: '',
    name: '',
    category: '',
    unity: '',
    unityPrice: '',
    taxes: '',
    obsItem: '',
}

export const ItemProvider = ({ children }) => {
    const [item, setItem] = useState(initialState)

    function resetItemState() {
        setItem(initialState)
    }

    function updateItem(field, settings) {
        setItem(prev => ({
            ...prev,
            [field]: settings
        }))
    }

    return (
        <ItemContext.Provider value={
            {
                item,
                setItem,
                updateItem,
                resetItemState,
            }
        }>
            {children}
        </ItemContext.Provider>
    )
}

export function useItem() {
    return useContext(ItemContext)
}
