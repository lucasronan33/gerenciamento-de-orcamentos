import React from 'react';
import { CircleCheck, FileText, TrendingUp } from 'lucide-react';

import * as colors from '../../config/colors';
import { Card, CardInfo } from './styles';
import { Container } from '../../styles/GlobalStyles';
import { useBudget } from '../BudgetContext';


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
        }, 0)
    }

    return (
        <Container>
            <Card>
                <CardInfo>
                    <p>Total de Orçamentos</p>
                    <p>{budgets.length}</p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <FileText />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.succesColor}>
                    <p>Aprovados</p>
                    <p>{totalApproved()}</p>
                </CardInfo>

                <CardInfo $color={colors.succesColor}>
                    <CircleCheck />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo >
                    <p>Valor Total</p>
                    <p>R$ {calcTotalBudgets()} </p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <TrendingUp />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.succesColor}>
                    <p>Valor Aprovado</p>
                    <p>R$ {totalApprovedValue()}</p>
                </CardInfo>

                <CardInfo $color={colors.succesColor}>
                    <TrendingUp />
                </CardInfo>
            </Card>
        </Container>
    )
}
