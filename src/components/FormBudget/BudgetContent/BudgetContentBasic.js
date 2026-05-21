import React, { useState, useRef, useEffect } from 'react';
import '../style.css'

import { ChevronDown } from 'lucide-react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { useSettings } from '../../../context/Settings'
import { useBudget } from '../../../context/Budget'
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

export function BudgetContentBasic() {
    const { settings, fetchSettings } = useSettings()
    const { budget, updateBudget } = useBudget()

    const ref = useRef()
    const [open, setOpen] = useState(false)

    const [search, setSearch] = useState('Rascunho')
    const [selected, setSelected] = useState('Rascunho')
    const options = [
        'Rascunho',
        'Enviado',
        'Aprovado',
        'Rejeitado',
        'Finalizado',
    ]

    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])
    useEffect(() => {
        if (!settings.services.minTimeService) return

        updateBudget('basic', 'timeService', settings.services.minTimeService)
    }, [
        settings.services.minTimeService,
        updateBudget,
    ])

    useEffect(() => {
        if (!budget.basic.code) {
            const code = Math.floor(Math.random() * 999999)
            updateBudget('basic', 'code', code)
        }
        updateBudget('basic', 'status', selected)

        function handleClickOutside(e) {

            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)

                setSearch(selected)
                updateBudget('basic', 'status', selected)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [
        selected,
        budget.basic.code,
        updateBudget
    ])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label
                    text='Numero do Orçamento *'
                    htmlFor='budgetNumber' />
                <FormBudget.LockedLabel
                    placeholder='Numero do Orçamento'
                    id='budgetNumber'
                    name='budgetNumber'
                    text={budget.basic?.code || ''} />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label
                    text='Nome do Cliente *'
                    htmlFor={'clientName'} />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Nome do Cliente'
                    id='clientName'
                    name='clientName'
                    value={budget.basic.name || ''}
                    onChange={(e) => updateBudget('basic', 'name', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='meidum'>
                <FormBudget.Label
                    text='Status do Orçamento'
                    htmlFor='budgetStatus' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <ChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            id='budgetStatus'
                            name='budgetStatus'
                            placeholder='Filtrar por status do Orçamento'
                            value={budget.basic.status || search}
                            onMouseDown={(e) => {
                                setOpen(true)
                                setSearch('')
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InptSearch>

                    {open && (
                        <div className='dropDownMenu budget-menu'>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`option ${item === selected ? 'selected' : ''}`}
                                        onMouseDown={() => {
                                            setSelected(item)
                                            setSearch(item)
                                            updateBudget('basic', 'status', item)
                                            setOpen(false)
                                        }}
                                    >
                                        {item}
                                    </div>
                                ))
                            ) : (
                                <div> Nenhum resultado</div>
                            )}
                        </div>
                    )}
                </DivContainerFilter>
            </FormBudget.ContainerInput>

            <div className='budget-container-items'>
                <FormBudget.ContainerInput>
                    <FormBudget.Label
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
                        disablePast
                        shouldDisableDate={(date) => {
                            const day = date.day()

                            return !settings.services.workDays.includes(day)
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label
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
                        disablePast
                        minDate={budget.basic.date ? dayjs(budget.basic.date, 'DD-MM-YYYY') : null}
                        shouldDisableDate={(date) => {
                            const day = date.day()

                            return !settings.services.workDays.includes(day)
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label
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
                        minutesStep={settings.services.stepHour}
                        minTime={dayjs(settings.services.startHour, 'HH:mm')}
                        maxTime={dayjs(settings.services.endHour, 'HH:mm')}
                    />

                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label
                        htmlFor='timeService'
                        text='Duração do Serviço' />
                    <TimePicker
                        className='datePicker'
                        slotProps={{
                            textField: {
                                id: 'timeService'
                            }
                        }}
                        name='timeService'
                        value={dayjs(budget.basic.timeService, 'HH:mm')}
                        onChange={(date) => {
                            if (!date) return
                            const formatedTime = date.format('HH:mm')
                            updateBudget('basic', 'timeService', formatedTime)
                        }}
                        minTime={dayjs(budget.basic.timeService, 'HH:mm')}
                    />
                </FormBudget.ContainerInput>
            </div>
        </>
    )
}
