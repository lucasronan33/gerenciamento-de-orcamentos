import React, { useEffect } from 'react';
import { Calendar, DollarSign, Users } from 'lucide-react';

import * as colors from '../../config/colors';
import { Card, CardInfo } from './styles';
import { Container } from '../../styles/GlobalStyles';
import { useBudget } from '../../context/Budget'
import { useDispatch, useSelector } from 'react-redux';
import { fetchClientsRequest } from '../../store/modules/client/actions';


export default function DashboardsHeader() {
    const { budgets, approvedBudgets } = useBudget()
    const { clients } = useSelector(state => state.client || [])
    const dispatch = useDispatch()

    const totalApprovedValue = () => {
        const total = approvedBudgets()
        return total.reduce((prevValue, currentValue) => {
            const value = Number(currentValue.totals.total)

            return prevValue + value
        }, 0).toFixed(2)
    }

    useEffect(() => {
        dispatch(fetchClientsRequest())
    }, [dispatch])

    return (
        <>
            <Container>
                <Card>
                    <CardInfo $color1={colors.blueDocument}>
                        <Calendar />
                        <p>{budgets.length}</p>
                        <p className='subtitle-card'>Agendamentos</p>
                    </CardInfo>
                </Card>
                <Card>
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
                </Card>

            </Container>
        </>
    )
}
