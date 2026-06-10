import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgetsRequest } from '../store/modules/budget/actions';

const { createContext, useState, useContext, useCallback, useEffect, useMemo } = require('react');

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
    const [budgetOpen, setBudgetOpen] = useState(false)
    const [viewBudget, setViewBudget] = useState(false)
    const [filterSelected, setFilterSelected] = useState('all states')
    const [searchBudget, setSearchBudget] = useState('')
    const [filteredBudgets, setFilteredBudgets] = useState([])
    const { budgets, success, loadedBudgets } = useSelector(state => state.budget)
    const { isLoggedIn } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    function inputFilterBudgets(value) {
        setSearchBudget(value)
    }

    function filterBudgets(filterValue) {
        setFilterSelected(filterValue)
    }

    const calcTotalBudgets = useMemo(() => {
        const total = budgets.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total) || 0
            return prevValue + value
        }, 0).toFixed(2)

        return total
    }, [
        budgets
    ])

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

    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchBudgetsRequest())
    }, [
        dispatch,
        success,
        isLoggedIn,
        loadedBudgets
    ])

    useEffect(() => {
        const normalizeValue = String(searchBudget).toLowerCase().trim()

        const filtered = budgets.filter(item => {
            if (filterSelected !== 'all states' && item.basic.status !== filterSelected) {
                return false
            }

            if (!normalizeValue) return true

            const code = String(item.basic.code || '').toLowerCase()
            const name = String(item.basic.name || '').toLowerCase()
            const enterpriseName = String(item.client?.enterpriseName || '').toLowerCase()
            const email = String(item.client?.email || '').toLowerCase()

            return (
                code.includes(normalizeValue) ||
                name.includes(normalizeValue) ||
                enterpriseName.includes(normalizeValue) ||
                email.includes(normalizeValue)
            )
        })

        setFilteredBudgets(filtered)
    }, [budgets, filterSelected, searchBudget])

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

                    budgetOpen,
                    setBudgetOpen,
                    viewBudget,
                    setViewBudget,

                    budgets,
                    calcTotalBudgets,
                    getBudgetsByStatus,

                    filterSelected,
                    setFilterSelected,
                    inputFilterBudgets,
                    filterBudgets,
                    filteredBudgets,
                }
            }>
            {children}
        </BudgetContext.Provider>
    )
}

export function useBudget() {
    return useContext(BudgetContext)
}
