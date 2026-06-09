import dayjs from 'dayjs';
import { show } from '../services/axiosRoutes';

const { createContext, useState, useContext, useCallback } = require('react');

const BudgetContext = createContext()

const initialState = {
    basic: {
        title: '',
        date: dayjs().format('DD-MM-YYYY'),
    },
    items: [],
    conditions: {
        paymentMethod: 'À vista'
    },
    totals: {
        discount: 0,
        taxes: 0,
        shipping: 0,
        shippingType: 'SF',
    }
}
export function BudgetProvider({ children }) {
    const [budget, setBudget] = useState(initialState)
    const [budgets, setBudgets] = useState([])
    const [modalOpen, setModalOpen] = useState(false)
    const [filterSelected, setFilterSelected] = useState('')
    const [filteredBudgets, setFilteredBudgets] = useState([])

    const fetchBudgets = useCallback(async () => {
        const response = await show('/budgets')
        setBudgets(response.data)
        setFilteredBudgets(response.data)
    }, [])

    function inputFilterBudgets(value) {
        if (value === 'Todos os status') {
            setFilteredBudgets(budgets)
            return
        }
        const filtered = budgets.filter(
            item => {
                const normalizeValue = String(value).toLowerCase()
                if (item.basic.status !== filterSelected) return false

                if (item.basic.code.includes(normalizeValue)) return true
                if (item.basic.name.includes(normalizeValue)) return true
                if (item.client?.enterpriseName?.includes(normalizeValue)) return true
                if (item.client?.email?.includes(normalizeValue)) return true
                return false
            }
        )
        setFilteredBudgets(filtered)
    }

    function filterBudgets(filterValue) {
        if (filterValue === 'Todos os status') {
            setFilteredBudgets(budgets)
            return
        }

        const filtered = budgets.filter(
            item => {
                if (item.basic.status === filterValue) return item
                return null
            }
        )
        setFilteredBudgets(filtered)
    }

    function calcTotalBudgets() {

        const total = budgets.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total) || 0
            return prevValue + value
        }, 0).toFixed(2)

        return total
    }

    function getBudgetsByStatus(status) {
        const total = budgets.filter(
            item => status.includes(item.basic.status.toLowerCase().trim())
        )
        return total
    }

    const updateBudget = useCallback((field, subfield, value) => {
        setBudget(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                [subfield]: value
            }
        }))
    }, [])

    const updateTotals = useCallback((field, value) => {

        setBudget(prev => {

            if (prev.totals[field] === value) return prev

            return {
                ...prev,
                totals: {
                    ...prev.totals,
                    [field]: value
                }
            }
        })
    }, [])

    function calcTotal(item) {
        let total =
            item.quantity * item.unityPrice -
            item.quantity * item.unityPrice * (item.discount / 100)

        total *= (item.taxes / 100) + 1

        return total.toFixed(2)
    }

    const updateItem = useCallback((id, field, value) => {


        setBudget(prev => ({
            ...prev,
            items: prev.items.map(item => {
                if (item._id !== id) {
                    return item
                }
                const updated = { ...item, [field]: value }
                return updated
            })
        }))
    }, [])

    return (
        <BudgetContext.Provider
            value={
                {
                    initialState,
                    budget,
                    setBudget,
                    updateBudget,
                    updateItem,
                    updateTotals,
                    calcTotal,

                    modalOpen,
                    setModalOpen,

                    budgets,
                    setBudgets,
                    calcTotalBudgets,
                    getBudgetsByStatus,

                    filterSelected,
                    setFilterSelected,
                    inputFilterBudgets,
                    filterBudgets,
                    filteredBudgets,
                    fetchBudgets,
                }
            }>
            {children}
        </BudgetContext.Provider>
    )
}

export function useBudget() {
    return useContext(BudgetContext)
}
