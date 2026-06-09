import React, { useEffect } from 'react';

import './style.css'

import DashboardsHeader from '../../components/DashboardsHeader';
import BudgetStatusFilter from '../../components/BudgetStatusFilter';
import Header from '../../components/Header';
import CardBudget from '../../components/Cards/CardBudget';
import { useBudget } from '../../context/Budget'
import { Card } from '../../components/DashboardsHeader/styles';
import { FileText, Plus, Users } from 'lucide-react';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchBudgetsRequest } from '../../store/modules/budget/actions';


const iconsMenu = [
    {
        title: 'Novo orçamento',
        icon: FileText,
        path: '/budget/new'
    },
    {
        title: 'Novo cliente',
        icon: Users,
        path: '/clients'
    },
]

export default function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { budgets, filteredBudgets } = useBudget()

    useEffect(() => {
        const data = dispatch(fetchBudgetsRequest())
        console.log(data)
    }, [
        dispatch
    ])

    return (
        <div>
            <Header />
            <DashboardsHeader />
            <BudgetStatusFilter />
            <div className='content'>
                {budgets.length < 1 ?
                    <Card className='cardHomeNewBudget'>
                        <FileText className='iconFile' />
                        <h3>
                            Nenhum orçamento criado
                        </h3>
                        <p>
                            Clique no botão "Novo Orçamento" para começar
                        </p>
                        <Button.Root className='button-header' onClick={() => navigate('budget/new')}>
                            <Plus />
                            Novo Orçamento
                        </Button.Root>
                    </Card>
                    :
                    filteredBudgets.length < 1 ?
                        <Card className='cardHomeNewBudget'>
                            <FileText className='iconFile' />
                            <h3>
                                Nenhum orçamento encontrado
                            </h3>
                            <p>
                                Tente ajustar os filtros de busca
                            </p>
                        </Card>
                        : filteredBudgets.map(budget => (
                            <CardBudget key={budget._id} budget={budget} />
                        ))}

            </div>

            <Button.FixedMenu children={iconsMenu} />
        </div>
    );
}
