import React from 'react';

import './style.css'

import DashboardsHeader from '../../components/DashboardsHeader';
import BudgetStatusFilter from '../../components/BudgetStatusFilter';
import Header from '../../components/Header';
import CardBudget from '../../components/Cards/CardBudget';
import { useBudget } from '../../context/Budget'
import { Card } from '../../components/DashboardsHeader/styles';
import { FileText, Plus, Users } from 'lucide-react';
import { Button } from '../../components/Button';
// import TableContent from '../../components/TableContent';
import { useNavigate } from 'react-router-dom';



export default function Home() {
    const { budgets, setBudgetOpen, filteredBudgets, } = useBudget()
    const navigate = useNavigate()

    const iconsMenu = [
        {
            title: 'Novo orçamento',
            icon: FileText,
            action: () => setBudgetOpen(true)
        },
        {
            title: 'Novo cliente',
            icon: Users,
            action: () => navigate('/clients')
        },
    ]

    return (
        <div>
            <Header />
            <DashboardsHeader />
            <BudgetStatusFilter />
            {/* <TableContent /> */}
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
                        <Button.Root className='button-header' onClick={() => setBudgetOpen(true)}>
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
