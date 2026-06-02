import React, { useEffect } from 'react';
import { CircleCheckBig, Clock, DollarSign, FileText, Users } from 'lucide-react';

import * as colors from '../../config/colors';
import { Card } from './styles';
import { Container } from '../../styles/GlobalStyles';
import { useBudget } from '../../context/Budget'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsRequest } from '../../store/modules/client/actions';
import { CardDashboard } from '../Cards/CardDashboard';


export default function DashboardsHeader() {
    const { isLoggedIn } = useSelector(state => state.auth)
    const { budgets, getBudgetsByStatus } = useBudget()
    const dispatch = useDispatch()

    const sumValueByStatus = (status = []) => {
        const total = getBudgetsByStatus(status)
        return total.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total)

            return prevValue + value
        }, 0).toFixed(2)
    }

    const approvedPercent = () => {
        const totalBudgets = budgets.length
        const totalApprovedBudgets = getBudgetsByStatus(['aprovado', 'finalizado']).length

        function calcTotal() {
            let total = totalApprovedBudgets / totalBudgets * 100
            return total.toFixed(1)
        }
        return calcTotal()
    }

    const cards = [
        {
            title: 'Receita',
            content: `R$ ${sumValueByStatus(['finalizado'])}`,
            icon: DollarSign,
            colorIcon: colors.successColor,
            colorText: colors.successColor,
        },
        {
            title: 'A receber',
            content: `R$ ${sumValueByStatus(['aprovado'])}`,
            icon: Clock,
            colorIcon: colors.warningColor,
            colorText: 'white',
        },
        {
            title: 'Propostas',
            content: `${budgets.length} emitidas`,
            icon: FileText,
            colorIcon: colors.blueDocument,
            colorText: 'unset',
        },
        {
            title: 'Propostas',
            content: `${getBudgetsByStatus(['aprovado']).length} aprovadas`,
            icon: CircleCheckBig,
            colorIcon: colors.successColor,
            colorText: 'unset',
        },
        {
            title: 'Taxa de aprovação',
            content: `${approvedPercent()}%`,
            icon: CircleCheckBig,
            colorIcon: colors.successColor,
            colorText: 'unset',
        },
    ]
    useEffect(() => {
        if (!isLoggedIn) return
        dispatch(fetchClientsRequest())
    }, [isLoggedIn, dispatch])

    return (
        <>
            <Container>
                {cards.map(item =>
                    <Card>
                        <CardDashboard
                            data={item}
                        />
                    </Card>
                )}
                {/* <Card>
                    <CardInfo
                        $color1={colors.successColor}
                    >
                        <DollarSign />
                        <p>R$ {totalApprovedValue()}</p>
                        <p className='subtitle-card'>Receita</p>
                    </CardInfo>
                </Card>

                <Card>
                    <CardInfo $color1={colors.purpleHover}>
                        <Users />
                        <p>{clients?.length || 0} </p>
                        <p className='subtitle-card'>Clientes</p>
                    </CardInfo>
                </Card>

                <Card className='weekly-recipe'>
                    <p className='title-card'>Receita semanal</p>
                </Card>
                <Card className='weekly-recipe'>
                    <p className='title-card'>Próximos atendimentos</p>
                </Card> */}

            </Container>
        </>
    )
}
