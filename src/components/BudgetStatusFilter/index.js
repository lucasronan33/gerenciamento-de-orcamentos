import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { DivContainerFilter, InptSearch } from './styles'
import { Search } from 'lucide-react';
import { useBudget } from '../../context/Budget'
import { Card } from '../DashboardsHeader/styles';

export default function BudgetStatusFilter() {
    const { inputFilterBudgets, filterBudgets, filterSelected } = useBudget()
    const options = [
        {
            value: 'all states',
            text: 'Todos os status',
        },
        {
            value: 'sketch',
            text: 'Rascunho',
        },
        {
            value: 'sent',
            text: 'Enviado',
        },
        {
            value: 'approved',
            text: 'Aprovado',
        },
        {
            value: 'finished',
            text: 'Finalizado',
        },
        {
            value: 'rejected',
            text: 'Rejeitado',
        },
    ]

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
                            {options.map(value => (
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
