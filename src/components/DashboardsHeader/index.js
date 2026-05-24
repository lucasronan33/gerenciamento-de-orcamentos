import React from 'react';
import { Calendar, DollarSign, Users } from 'lucide-react';

import * as colors from '../../config/colors';
import { Card, CardInfo } from './styles';
import { Container } from '../../styles/GlobalStyles';
import { useBudget } from '../../context/Budget'


export default function DashboardsHeader() {
    const { budgets, calcTotalBudgets, approvedBudgets } = useBudget()

    const totalApprovedValue = () => {
        const total = approvedBudgets()
        return total.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total)

            return prevValue + value
        }, 0).toFixed(2)
    }

    return (
        <Container>
            <Card>
                <CardInfo>
                    <p>Agendamentos</p>
                    <p>{budgets.length}</p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <Calendar />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo >
                    <p>Clientes</p>
                    <p>R$ {calcTotalBudgets()} </p>
                </CardInfo>

                <CardInfo $color={colors.purpleHover}>
                    <Users />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.successColor}>
                    <p>Receita</p>
                    <p>R$ {totalApprovedValue()}</p>
                </CardInfo>

                <CardInfo $color={colors.successColor}>
                    <DollarSign />
                </CardInfo>
            </Card>
        </Container>
    )
}
