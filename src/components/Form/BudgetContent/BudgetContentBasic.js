import React from 'react';
import '../style.css'

import { Form } from '..';
import { useBudget } from '../../../context/Budget'
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const options = [
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

export function BudgetContentBasic() {
    const { budget, updateBudget } = useBudget()

    if (!budget.basic.code) {
        const code = Math.floor(Math.random() * 999999)
        updateBudget('basic', 'code', code)
    }

    return (
        <>
            <Form.ContainerInput>
                <Form.Label
                    text='Numero do Orçamento *'
                    htmlFor='budgetNumber' />
                <Form.LockedLabel
                    placeholder='Numero do Orçamento'
                    id='budgetNumber'
                    name='budgetNumber'
                    text={budget.basic?.code || ''} />
            </Form.ContainerInput>

            <Form.ContainerInput>
                <Form.Label
                    text='Título do orçamento *'
                    htmlFor={'titleBudget'} />
                <Form.Input
                    typeInput='text'
                    placeholder='ex.: Nome do serviço'
                    id='titleBudget'
                    name='titleBudget'
                    value={budget.basic.title || ''}
                    onChange={(e) => updateBudget('basic', 'title', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='meidum'>
                <Form.Label
                    text='Status do Orçamento'
                    htmlFor='budgetStatus' />

                <select
                    value={budget.basic.status}
                    onChange={(e) => {
                        updateBudget('basic', 'status', e.target.value)
                    }}
                >
                    {options.map(value => (
                        <option value={value.value}>{value.text} </option>
                    ))}
                </select>
            </Form.ContainerInput>

            <div className='budget-container-items'>
                <Form.ContainerInput>
                    <Form.Label
                        text='Data *'
                        htmlFor='date' />
                    <DatePicker
                        className='datePicker'
                        format='DD/MM/YYYY'
                        slotProps={{
                            textField: {
                                id: 'date'
                            }
                        }}
                        name='date'
                        defaultValue={null}
                        value={dayjs(budget.basic.date, 'DD-MM-YYYY')}
                        onChange={(date) => {
                            if (!date) return
                            const formatedDate = date.format('DD-MM-YYYY')
                            updateBudget('basic', 'date', formatedDate)
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput>
                    <Form.Label
                        text='Valido até'
                        htmlFor='validUntil' />
                    <DatePicker
                        className='datePicker'
                        format='DD/MM/YYYY'
                        slotProps={{
                            textField: {
                                id: 'validUntil'
                            }
                        }}
                        name='validUntil'
                        defaultValue={null}
                        value={dayjs(budget.basic.validUntil, 'DD-MM-YYYY')}
                        onChange={(date) => {
                            if (!date) return
                            const formatedDate = date.format('DD-MM-YYYY')
                            updateBudget('basic', 'validUntil', formatedDate)
                        }}
                    />
                </Form.ContainerInput>

                <Form.ContainerInput>
                    <Form.Label
                        htmlFor='time'
                        text='Horário' />
                    <TimePicker
                        className='datePicker'
                        defaultValue={null}
                        slotProps={{
                            textField: {
                                id: 'time'
                            }
                        }}
                        name='time'
                        value={dayjs(budget.basic.time, 'HH:mm')}
                        onChange={(date) => {
                            if (!date) return
                            const formatedTime = date.format('HH:mm')
                            updateBudget('basic', 'time', formatedTime)
                        }}
                    />

                </Form.ContainerInput>

            </div>
        </>
    )
}
