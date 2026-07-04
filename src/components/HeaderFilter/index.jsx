import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../HeaderMain/styles';
import { DivContainerFilter, InptSearch } from './styles'
import { Search } from 'lucide-react';
import { useBudget } from '../../context/Budget'
import { budgetStatus } from '../../utils/budget';

export default function HeaderFilter() {
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
