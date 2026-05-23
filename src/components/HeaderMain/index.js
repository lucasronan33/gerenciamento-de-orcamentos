import React from 'react';
import { Calendar, CircleCheck, DollarSign, TrendingUp } from 'lucide-react';

import * as colors from '../../config/colors';
import { Card, CardInfo } from './styles';
import { Container } from '../../styles/GlobalStyles';
import { useBudget } from '../../context/Budget'


export default function HeaderMain() {
    const { budgets, calcTotalBudgets, approvedBudgets } = useBudget()

    const totalApproved = () => {
        const total = approvedBudgets()
        return total.length
    }

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
                    <p>Orçamentos</p>
                    <p>{budgets.length}</p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <Calendar />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.successColor}>
                    <p>Aprovados</p>
                    <p>{totalApproved()}</p>
                </CardInfo>

                <CardInfo $color={colors.successColor}>
                    <CircleCheck />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo >
                    <p>Total Orçado</p>
                    <p>R$ {calcTotalBudgets()} </p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <TrendingUp />
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
