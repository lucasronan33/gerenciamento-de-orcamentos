import React from 'react'
import { useBudget } from '../../context/Budget'
import { Card } from '../DashboardsHeader/styles'
import { FileText, Plus } from 'lucide-react'
import { Button } from '../Button'
// import CardBudget from '../Cards/CardBudget'

const tableHeader = [
    {
        value: 'budget',
        text: 'Orçamento'
    },
    {
        value: 'client',
        text: 'Cliente'
    },
    {
        value: 'value',
        text: 'Valor'
    },
    {
        value: 'status',
        text: 'Status'
    },
]

export function BudgetsList() {

    const { budgets, setBudgetOpen, filteredBudgets, } = useBudget()
    if (budgets.length < 1)
        return (
            <Card className='cardHomeNewBudget'>
                <FileText className='iconFile' />
                <h3>
                    Nenhum orçamento criado
                </h3>
                <p>
                    Clique no botão "Novo Orçamento" para começar
                </p>
                <Button.Root className='button-header' onClick={() => setBudgetOpen(true)}>
                    <Plus />
                    Novo Orçamento
                </Button.Root>
            </Card>
        )

    if (filteredBudgets.length < 1) return (
        <Card className='cardHomeNewBudget'>
            <FileText className='iconFile' />
            <h3>
                Nenhum orçamento encontrado
            </h3>
            <p>
                Tente ajustar os filtros de busca
            </p>
        </Card>
    )
    return (
        <div className='container-budgets-home'>
            <header className='header-tab-budgets'>
                {tableHeader.map(item => (
                    <div key={item.value}>
                        {item.text}
                    </div>
                ))}
            </header>
        </div>
    )

    // filteredBudgets.map(budget => (
    //     <CardBudget key={budget._id} budget={budget} />
    // ))

}