import React, { useEffect } from 'react';

import './style.css'

import HeaderMain from '../../components/HeaderMain';
import HeaderFilter from '../../components/HeaderFilter';
import Header from '../../components/Header';
import CardBudget from '../../components/CardBudget/CardBudget';
import { useBudget } from '../../components/BudgetContext';
import { Card } from '../../components/HeaderMain/styles';
import { FileText } from 'lucide-react';
import { Button } from '../../components/Button';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const navigate = useNavigate()
    const { budgets, fetchBudgets } = useBudget()

    useEffect(() => {
        fetchBudgets()
    })

    return (
        <div>
            <Header />
            <HeaderMain />
            <HeaderFilter />
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
                            <FaPlus />
                            Novo Orçamento
                        </Button.Root>
                    </Card>
                    : budgets.map(budget => (
                        <CardBudget key={budget._id} budget={budget} />
                    ))}
            </div>
        </div>
    );
}
