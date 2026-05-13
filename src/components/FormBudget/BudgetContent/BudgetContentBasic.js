import React, { useState, useRef, useEffect } from 'react';
import '../style.css'

import { ChevronDown } from 'lucide-react';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';
import { useBudget } from '../../BudgetContext';

export function BudgetContentBasic() {
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
    const times = []

    for (let h = 0; h < 24; h++) {
        for (let m = 0; m < 60; m += 15) {
            times.push(
                `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
            )
        }

    }
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
                    <FormBudget.Input
                        typeInput='date'
                        name='date'
                        value={budget.basic.date}
                        onChange={(e) => updateBudget('basic', 'date', e.target.value)}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Valido até *' />
                    <FormBudget.Input
                        typeInput='date'
                        name='validUntil'
                        value={budget.basic.validUntil}
                        onChange={(e) => updateBudget('basic', 'validUntil', e.target.value)}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Horário *' />
                    <select
                        value={budget.basic.time}
                        onChange={(e) => updateBudget('basic', 'time', e.target.value)}
                    >
                        {times.map((option, index) =>
                            <option key={index}>
                                {option}
                            </option>)
                        }
                    </select>
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Duração do Serviço' />

                    <select
                        value={budget.basic.timeService}
                        onChange={(e) => updateBudget('basic', 'timeService', e.target.value)}
                    >
                        {times.map((option, index) =>
                            <option key={index}>
                                {option}m
                            </option>
                        )}
                    </select>
                </FormBudget.ContainerInput>
            </div>
        </>
    )
}
