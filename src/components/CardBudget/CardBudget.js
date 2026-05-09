import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { CardIcons, ConfirmDeleteModal, ContainerCardBudget, DivTitle, InfoCardBudget, StatusBudget } from './CardBudgetStyles';
import { Copy, Edit, Eye, Trash2 } from 'lucide-react';
import { destroy, store } from '../../services/axiosRoutes';
import { useBudget } from '../BudgetContext';
import { Button } from '../Button';

export default function CardBudget({ budget }) {
    const navigate = useNavigate()
    const { fetchBudgets } = useBudget()
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    const id = budget._id

    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            await destroy(`/budgets/${id}`)
            fetchBudgets()
            setIsDeleteModalOpen(false)
        } catch {
            setIsDeleteModalOpen(false)
        } finally {
            setIsDeleting(false)
        }
    }

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
                    <Eye /> Ver
                </div>

                <div
                    className='links'
                    onClick={() => { navigate(`/budget/${id}`) }}
                >
                    <Edit />
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
                        } catch {
                        }
                    }}
                >
                    <Copy />
                </div>
                <div
                    className='links'
                    onClick={() => setIsDeleteModalOpen(true)}
                >
                    <Trash2 className='trashIco' />
                </div>
            </CardIcons>

            {isDeleteModalOpen && (
                <ConfirmDeleteModal>
                    <button
                        type='button'
                        className='confirm-delete-overlay'
                        aria-label='Fechar confirmacao'
                        onClick={() => setIsDeleteModalOpen(false)}
                    />
                    <div className='confirm-delete-content'>
                        <h2>Excluir orcamento?</h2>
                        <p>
                            Esta acao vai remover o orçamento {' '}
                            <strong>{budget.basic.name}</strong>
                            {' '}
                            do historico.
                        </p>
                        <div className='confirm-delete-actions'>
                            <Button.Root
                                className='btn-cancel'
                                onClick={() => setIsDeleteModalOpen(false)}
                                disabled={isDeleting}
                            >
                                Cancelar
                            </Button.Root>
                            <Button.Root
                                className='btn-delete'
                                onClick={handleDelete}
                                disabled={isDeleting}
                            >
                                {isDeleting ? 'Excluindo...' : 'Excluir'}
                            </Button.Root>
                        </div>
                    </div>
                </ConfirmDeleteModal>
            )}
        </ContainerCardBudget>
    )
}
