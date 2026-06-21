import React from 'react'
import { useCallback, useMemo } from 'react'
import { CardHeaderMockup, ContainerMockup } from './styled'
import { CircleCheckBig, Clock, DollarSign, FileText, Plus, Search, TrendingUp } from 'lucide-react'
import * as colors from '../../config/colors'
import { formatCurrency, isEmptyObject } from '../../utils/masks'
import { DivTitle, InfoCardBudget, StatusBudget } from '../Cards/styled'
import { budgetStatus } from '../../utils/budget'

const BudgetMockup = ({ budgets }) => {

    const getBudgetsByStatus = useCallback((status) => {
        const total = budgets.filter(
            item => status.includes(item.basic.status.toLowerCase().trim())
        )
        return total
    }, [
        budgets
    ])

    const sumValueByStatus = (status = []) => {
        const total = getBudgetsByStatus(status)
        return total.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total)

            return prevValue + value
        }, 0).toFixed(2)
    }

    const approvedPercent = useMemo(() => {
        const totalBudgets = budgets.length
        const totalApprovedBudgets = getBudgetsByStatus(['approved', 'producing', 'finished']).length

        function calcTotal() {
            let total = totalApprovedBudgets / totalBudgets * 100
            return total.toFixed(1)
        }
        return calcTotal()
    }, [
        budgets,
        getBudgetsByStatus
    ])

    const cards = [
        {
            title: 'Receita',
            content: formatCurrency(sumValueByStatus(['finished'])),
            icon: DollarSign,
            colorIcon: colors.successColor,
            colorText: colors.successColor,
        },
        {
            title: 'A receber',
            content: formatCurrency(sumValueByStatus(['approved', 'producing'])),
            icon: Clock,
            colorIcon: colors.warningColor,
            colorText: colors.warningColor,
        },
        {
            title: 'Orçamentos',
            content: `${budgets.length} emitidos`,
            icon: FileText,
            colorIcon: colors.blueDocument,
            colorText: colors.blueDocument,
        },
        {
            title: 'Orçamentos',
            content: `${getBudgetsByStatus(['approved', 'producing']).length} aprovados`,
            icon: CircleCheckBig,
            colorIcon: colors.successColor,
            colorText: colors.successColor,
        },
        {
            title: 'Taxa de aprovação',
            content: `${approvedPercent}%`,
            icon: TrendingUp,
            colorIcon: colors.blueDocument,
            colorText: colors.blueDocument,
        },
    ]

    const statusClasses = {
        rascunho: 'sketchStatus',
        enviado: 'sentStatus',
        aprovado: 'approvedStatus',
        produzindo: 'producingStatus',
        rejeitado: 'rejectedStatus',
        finalizado: 'finishedStatus',
    }

    return (
        <ContainerMockup>
            <main>
                <header>
                    <div className='header-mockup'>
                        <div className='container-logo-mockup'>
                            <div className='logo-mockup' />
                            <span>
                                Bem-vindo ao ORCA
                                <span>
                                    Conta Teste
                                </span>
                            </span>
                        </div>

                        <button>
                            <Plus />
                            Novo Orçamento
                        </button>
                    </div>

                    <div className='container-cards-header'>
                        {cards.map((item, index) => {
                            const Icon = item.icon
                            return (
                                <CardHeaderMockup
                                    className='card-header-mockup'
                                    $color1={item.colorIcon}
                                    $color2={item.colorText}
                                    key={index}
                                >
                                    <div className='background-icon'>
                                        <Icon />
                                        <div />
                                    </div>
                                    <p className='subtitle-card'>{item.title}</p>
                                    <p>{item.content}</p>
                                </CardHeaderMockup>
                            )
                        }
                        )}
                    </div>
                </header>

                <div className='container-filter-mockup'>
                    <label className='search-mockup'>
                        <Search />
                        Buscar por número
                    </label>
                    <label className='filter-mockup'> Todos os status</label>
                </div>

                <content>
                    {budgets.map((budget, index) => {

                        const currentBudgetStatus = budgetStatus.reduce((obj, item) => {
                            if (item.value === budget.basic.status) obj = item.text
                            return obj
                        }, {})
                        return (
                            <div
                                className='container-budget-mockup'
                                key={index}
                            >

                                <DivTitle>
                                    <h2 className='line-clamp-2' title={budget.basic.title} >{budget.basic.title} </h2>
                                    <h4 className='line-clamp-2' title={budget.client.name} >{budget.client.name} </h4>
                                    <div className='container-title-budget'>
                                        <p className='titleBudget'>#{budget.basic.code} </p>
                                        <StatusBudget className={!isEmptyObject(currentBudgetStatus)
                                            ? statusClasses[currentBudgetStatus.toLowerCase()]
                                            : ''} >
                                            {!isEmptyObject(currentBudgetStatus) ? currentBudgetStatus : ''}
                                        </StatusBudget>
                                    </div>
                                </DivTitle>


                                <InfoCardBudget>
                                    <div>
                                        <p>Data: </p>
                                        <p>{budget.basic.date.replaceAll('-', ' / ')} </p>
                                    </div>

                                    {budget.basic.validUntil

                                        ? (<div>
                                            <p>Validade: </p>
                                            <p>{budget.basic.validUntil.replaceAll('-', ' / ')} </p>
                                        </div>)
                                        : budget.basic.time
                                        && (<div>
                                            <p>Horário: </p>
                                            <p>{budget.basic.time} </p>
                                        </div>)
                                    }

                                    <div>
                                        <p>Itens: </p>
                                        <p>{budget.items?.length || 0} </p>
                                    </div>
                                </InfoCardBudget>
                                <InfoCardBudget>
                                    <div >
                                        <h3>Total: </h3>
                                        <h3>{formatCurrency(budget.totals.total)} </h3>
                                    </div>
                                </InfoCardBudget>
                            </div>
                        )
                    }
                    )}
                </content>

            </main>
        </ContainerMockup>
    )
}

export default BudgetMockup