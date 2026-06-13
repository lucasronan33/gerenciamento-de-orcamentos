import React, { useState } from 'react';
import { CardIcons, ConfirmDeleteModal, ContainerCardBudget, DivTitle, InfoCardBudget, StatusBudget } from './styled';
import { Copy, Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '../Button';
import { useBudget } from '../../context/Budget';
import { useDispatch } from 'react-redux';
import { createBudgetRequest, deleteBudgetRequest } from '../../store/modules/budget/actions';
import { ViewBudget } from '../ViewBudget';
import { generateBudgetCode, isEmptyObject } from '../../utils/masks';

const status = [
    {
        value: 'sketch',
        text: 'Rascunho',
    },
    {
        value: 'sent',
        text: 'Enviado',
    },
    {
        value: 'approved',
        text: 'Aprovado',
    },
    {
        value: 'finished',
        text: 'Finalizado',
    },
    {
        value: 'rejected',
        text: 'Rejeitado',
    },
]

export default function CardBudget({ budget }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const { setBudgetOpen, setBudget, setViewBudget, viewBudget } = useBudget()
    const dispatch = useDispatch()
    const statusClasses = {
        enviado: 'sentStatus',
        aprovado: 'approvedStatus',
        rejeitado: 'rejectedStatus',
        finalizado: 'finishedStatus',
    }

    const handleCopy = () => {
        const copy = { ...budget }
        copy.basic.code = generateBudgetCode()

        dispatch(createBudgetRequest(copy))
    }
    const handleDelete = async () => {
        try {
            setIsDeleting(true)
            dispatch(deleteBudgetRequest(budget))
            setIsDeleteModalOpen(false)
        } catch {
            setIsDeleteModalOpen(false)
        } finally {
            setIsDeleting(false)
        }
    }
    const budgetStatus = status.reduce((obj, item) => {
        if (item.value === budget.basic.status) obj = item.text
        return obj
    }, {})

    return (
        <>
            {viewBudget && (
                <ViewBudget />
            )}
            <ContainerCardBudget>
                <DivTitle>
                    <h2 className='line-clamp-2'>{budget.basic.title} </h2>
                    <h4 className='line-clamp-2'>{budget.client.name} </h4>
                    <div className='container-title-budget'>
                        <p className='titleBudget'>{budget.basic.code} </p>
                        <StatusBudget className={!isEmptyObject(budgetStatus)
                            ? statusClasses[budgetStatus.toLowerCase()]
                            : ''} >
                            {!isEmptyObject(budgetStatus) ? budgetStatus : ''}
                        </StatusBudget>
                    </div>
                </DivTitle>

                <InfoCardBudget>
                    <div>
                        <p>Data: </p>
                        <p>{budget.basic.date.replaceAll('-', ' / ')} </p>
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
                        <h3>R$ {String(budget.totals.total)} </h3>
                    </div>
                </InfoCardBudget>
                <CardIcons>
                    <div
                        className='card-icon viewOrc'
                        onClick={() => {
                            setViewBudget(true)
                            setBudget(budget)
                        }}
                    >
                        <Eye /> Ver
                    </div>

                    <div
                        className='card-icon links'
                        onClick={() => {
                            setBudgetOpen(true)
                            setBudget(budget)
                        }}
                    >
                        <Edit />
                    </div>

                    <div
                        className='card-icon links'
                        onClick={() => handleCopy()}
                    >
                        <Copy />
                    </div>
                    <div
                        className='trash-icon links'
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
                                Esta acao vai remover o orçamento
                                <strong> {budget.basic.title} </strong>
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
        </>
    )
}
