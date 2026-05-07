import { show } from '../../services/axiosRoutes';

const { createContext, useState, useContext } = require('react');

const BudgetContext = createContext()

export function BudgetProvider({ children }) {
    const initialState = {
        basic: {},
        client: {},
        items: [],
        conditions: {},
        totals: {
            discount: 0,
            taxes: 0,
            shipping: 0,
            subtotal: 0,
            total: 0,
        }
    }
    const [budget, setBudget] = useState(initialState)
    const [budgets, setBudgets] = useState([])

    async function fetchBudgets() {
        const response = await show('/budgets')
        await setBudgets(response.data)
    }

    function updateBudget(field, subfield, value) {
        setBudget(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subfield]: value
            }
        }))
    }

    function updateTotals(field, value) {
        setBudget(prev => ({
            ...prev,
            totals: {
                ...prev.totals,
                [field]: value
            }
        }))
    }

    function calcTotal(item) {
        let total =
            item.quantity * item.unityPrice -
            item.quantity * item.unityPrice * (item.discount / 100)

        total *= (item.taxes / 100) + 1

        return total.toFixed(2)
    }

    function updateItem(id, field, value) {


        setBudget(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if (item.id !== id) {
                    return item
                }
                const updated = { ...item, [field]: value }
                updated.total = calcTotal(updated)
                return updated
            })
        }))
    }

    return (
        <BudgetContext.Provider
            value={{
                budget,
                budgets,
                initialState,
                fetchBudgets,
                setBudget,
                updateBudget,
                updateItem,
                updateTotals,
                calcTotal,
            }}>
            {children}
        </BudgetContext.Provider>
    )
}

export function useBudget() {
    return useContext(BudgetContext)
}