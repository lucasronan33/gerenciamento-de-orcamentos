import { Copy, Edit, Eye, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useBudget } from '../../context/Budget';
import { createBudgetRequest, deleteBudgetRequest } from '../../store/modules/budget/actions';
import { budgetStatus } from '../../utils/budget';
import { formatCurrency, generateBudgetCode, isEmptyObject } from '../../utils/masks';
import { Button } from '../Button';
import { ViewBudget } from '../ViewBudget';
import { CardIcons, ConfirmDeleteModal, ContainerCardBudget, DivTitle, InfoCardBudget, StatusBudget } from './styled';

export default function CardBudget({ budget }) {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)
    const { setBudgetOpen, setBudget, setViewBudget, viewBudget } = useBudget()
    const dispatch = useDispatch()
    const statusClasses = {
        rascunho: 'sketchStatus',
        enviado: 'sentStatus',
        aprovado: 'approvedStatus',
        produzindo: 'producingStatus',
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
    const currentBudgetStatus = budgetStatus.reduce((obj, item) => {
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
                    <h2 className='line-clamp-2' title={budget.basic.title} >{budget.basic.title} </h2>
                    <h4 className='line-clamp-2' title={budget.client.name} >{budget.client.name} </h4>
                    <div className='container-title-budget'>
                        <p className='titleBudget'>{budget.basic.code} </p>
                        <StatusBudget className={!isEmptyObject(currentBudgetStatus)
                            ? statusClasses[currentBudgetStatus.toLowerCase()]
                            : ''} >
                            {!isEmptyObject(currentBudgetStatus) ? currentBudgetStatus : ''}
                        </StatusBudget>
                    </div>
                </DivTitle>

                <InfoCardBudget>
                    <div>
                        <p>Data: </p>
                        <p>{budget.basic.date.replaceAll('-', ' / ')} </p>
                    </div>

                    {budget.basic.validUntil

                        ? (<div>
                            <p>Validade: </p>
                            <p>{budget.basic.validUntil.replaceAll('-', ' / ')} </p>
                        </div>)
                        : budget.basic.time
                        && (<div>
                            <p>Horário: </p>
                            <p>{budget.basic.time} </p>
                        </div>)
                    }

                    <div>
                        <p>Itens: </p>
                        <p>{budget.items?.length || 0} </p>
                    </div>
                </InfoCardBudget>
                <InfoCardBudget>
                    <div >
                        <h3>Total: </h3>
                        <h3>{formatCurrency(budget.totals.total)} </h3>
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
                            <h2>Excluir orçamento?</h2>
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
