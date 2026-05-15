import React, { useState, useRef, useEffect } from 'react';
import '../style.css'

import { ChevronDown } from 'lucide-react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { useBudget } from '../../BudgetContext';
import { sanitizeTime } from '../../../utils/times';
import { useSettings } from '../../SettingsContext';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';

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
    const [startHour, setStartHour] = useState()
    const [endHour, setEndHour] = useState()


    useEffect(() => {
        fetchSettings()
    }, [fetchSettings])
    useEffect(() => {
        if (!settings.services.startHour) return
        if (!settings.services.endHour) return

        const [startH, startM] = sanitizeTime(settings.services.startHour)
        const [endH, endM] = sanitizeTime(settings.services.endHour)

        setStartHour({ startH, startM })
        setEndHour({ endH, endM })
    }, [
        settings.services.startHour,
        settings.services.endHour,
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
                <FormBudget.Label text='Numero do Orçamento *' />
                <FormBudget.LockedLabel placeholder='Numero do Orçamento' name='budgetNumber' text={budget.basic?.code || ''} />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Nome do Cliente *' />
                <FormBudget.Input
                    typeInput='text'
                    placeholder='Nome do Cliente'
                    name='clientName'
                    value={budget.basic.name}
                    onChange={(e) => updateBudget('basic', 'name', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='meidum'>
                <FormBudget.Label text='Status do Orçamento' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <ChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
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
                    <FormBudget.Label text='Data *' />
                    <DatePicker
                        className='datePicker'
                        format='DD/MM/YYYY'
                        value={budget.basic.date}
                        onChange={(date) => {
                            const formatedDate = date.format('DD/MM/YYYY')
                            console.log(formatedDate)
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
                    <FormBudget.Label text='Valido até *' />
                    <DatePicker
                        className='datePicker'
                        format='DD/MM/YYYY'
                        value={budget.basic.validUntil}
                        onChange={(date) => {
                            const formatedDate = date.format('DD/MM/YYYY')
                            console.log(formatedDate)
                            updateBudget('basic', 'validUntil', formatedDate)
                        }}
                        disablePast
                        shouldDisableDate={(date) => {
                            const day = date.day()

                            return !settings.services.workDays.includes(day)
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Horário *' />
                    <TimePicker
                        className='datePicker'
                        value={budget.basic.time}
                        onChange={(date) => {
                            const formatedTime = date.format('HH:mm')
                            updateBudget('basic', 'time', formatedTime)
                        }}
                        minutesStep={settings.services.stepHour}
                        shouldDisableTime={(value, view) => {
                            const hour = value.hour()
                            const minute = value.minute()
                            if (view === 'hours') return hour < startHour.startH || hour > endHour.endH

                            if (view === 'minutes') {
                                if (hour <= startHour.startH) return minute < startHour.startM
                                if (hour >= endHour.endH) return minute > endHour.endM
                            }

                            return false
                        }}
                    />

                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Duração do Serviço' />
                    <TimePicker
                        className='datePicker'
                        value={budget.basic.timeService}
                        onChange={(date) => {
                            const formatedTime = date.format('HH:mm')
                            updateBudget('basic', 'timeService', formatedTime)
                        }}
                    />
                </FormBudget.ContainerInput>
            </div>
        </>
    )
}
