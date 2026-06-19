import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { DivContainerFilter, InptSearch } from './styles'
import { Search } from 'lucide-react';
import { useBudget } from '../../context/Budget'
import { Card } from '../DashboardsHeader/styles';
import { budgetStatus } from '../../utils/budget';

budgetStatus.push(
    {
        value: 'all states',
        text: 'Todos os status',
    })

export default function BudgetStatusFilter() {
    const { inputFilterBudgets, filterBudgets, filterSelected } = useBudget()

    return (
        <Container>
            <Card className='card-filter'>

                <DivContainerFilter>
                    <InptSearch>
                        <Search className='search-icon' />
                        <input
                            type='text'
                            className='input-search'
                            placeholder='Buscar por número, cliente ou e-mail'
                            onChange={(e) => {
                                inputFilterBudgets(e.target.value)
                            }}
                        />
                    </InptSearch>
                </DivContainerFilter>

                <DivContainerFilter>
                    <InptSearch>
                        <select
                            value={filterSelected}
                            onChange={(e) => {
                                filterBudgets(e.target.value)
                            }}
                        >
                            {budgetStatus.map(value => (
                                <option
                                    key={value.value}
                                    value={value.value}>
                                    {value.text}
                                </option>
                            ))}
                        </select>
                    </InptSearch>
                </DivContainerFilter>

            </Card>
        </Container >
    )
}
