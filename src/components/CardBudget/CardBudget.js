import React from 'react';
import { useNavigate } from 'react-router-dom'
import { CardIcons, ContainerCardBudget, DivTitle, InfoCardBudget, StatusBudget } from './CardBudgetStyles';
import { IoCopyOutline, IoEyeOutline, IoTrashOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';
import { destroy, store } from '../../services/axiosRoutes';
import { useBudget } from '../BudgetContext';

export default function CardBudget({ budget }) {
    const navigate = useNavigate()
    const { fetchBudgets } = useBudget()

    const id = budget._id

    return (
        <ContainerCardBudget>
            <DivTitle>
                <h2>{budget.basic.name} </h2>
                <StatusBudget>{budget.basic.status} </StatusBudget>
            </DivTitle>
            <p className='clientName'>{budget.basic.code} </p>

            <InfoCardBudget>
                <div>
                    <p>Data: </p>
                    <p>{budget.basic.date} </p>
                </div>

                <div>
                    <p>Horario: </p>
                    <p>{budget.basic.time} </p>
                </div>

                <div>
                    <p>Itens: </p>
                    <p>{budget.items?.length || 0} </p>
                </div>
            </InfoCardBudget>
            <InfoCardBudget>
                <div >
                    <h3>Total: </h3>
                    <h3>R$ {budget.totals.total} </h3>
                </div>
            </InfoCardBudget>
            <CardIcons>
                <div
                    className='viewOrc'
                    onClick={() => { navigate(`/budget/${id}`) }}
                >
                    <IoEyeOutline /> Ver
                </div>

                <div
                    className='links'
                    onClick={() => { navigate(`/budget/${id}`) }}
                >
                    <FiEdit />
                </div>

                <div
                    className='links'
                    onClick={async () => {
                        try {

                            const newCode = Math.floor(Math.random() * 999999)
                            const newBudget = {
                                ...budget,
                                _id: undefined,
                                basic: {
                                    ...budget.basic,
                                    code: newCode,
                                }
                            }

                            await store('/budgets', newBudget)
                            fetchBudgets()
                        } catch (error) {
                            console.log({ error })
                        }
                    }}
                >
                    <IoCopyOutline />
                </div>
                <div
                    className='links'
                    onClick={async () => {
                        try {
                            await destroy(`/budgets/${id}`)
                            fetchBudgets()
                        } catch (error) {

                        }
                    }}
                >
                    <IoTrashOutline className='trashIco' />
                </div>
            </CardIcons>

        </ContainerCardBudget>
    )
}