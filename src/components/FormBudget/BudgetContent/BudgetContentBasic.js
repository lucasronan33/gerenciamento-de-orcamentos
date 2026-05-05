import React, { useState, useRef, useEffect } from 'react';
import '../style.css'

import { HiOutlineChevronDown } from 'react-icons/hi';
import { FormBudget } from '..';
import { DivContainerFilter, InptSearch } from '../../HeaderFilter/styles';

export function BudgetContentBasic() {
    const ref = useRef()
    const [open, setOpen] = useState(false)

    const [date, setDate] = useState()
    const [time, setTime] = useState()
    const [validity, setValidity] = useState()

    const [search, setSearch] = useState('Rascunho')
    const [selected, setSelected] = useState('Rascunho')
    const options = [
        'Rascunho',
        'Enviado',
        'Aprovado',
        'Rejeitado',
        'Finalizado',
    ]

    function numberBudget() {
        return new Date().toLocaleString('pt-BR').replace(/[/,:]/g, '-').replace(' ', '')
    }

    useEffect(() => {
        function handleClickOutside(e) {

            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)

                setSearch(selected)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [selected])

    const filteredOptions = options.filter(option => option.toLowerCase().includes(search.toLowerCase()))

    return (
        <>
            <FormBudget.ContainerInput>
                <FormBudget.Label text='Numero do Orçamento *' />
                <FormBudget.LockedInput placeholder='Numero do Orçamento' name='budgetNumber' defaultValue={numberBudget()} />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput>
                <FormBudget.Label text='Nome do Cliente *' />
                <FormBudget.Input typeInput='text' placeholder='Nome do Cliente' name='clientName' />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput size='meidum'>
                <FormBudget.Label text='Status do Orçamento' />
                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <HiOutlineChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            name='budgetStatus'
                            placeholder='Filtrar por status do Orçamento'
                            value={search}
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
                        value={date}
                        onChange={(e) => {
                            const value = e.target.value

                            setDate(value)
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Horário *' />
                    <FormBudget.Input
                        typeInput='time' step="1800"
                        name='time'
                        value={time}
                        onChange={(e) => {
                            const value = e.target.value

                            setTime(value)
                        }}
                    />
                </FormBudget.ContainerInput>

                <FormBudget.ContainerInput>
                    <FormBudget.Label text='Valido até *' />
                    <FormBudget.Input
                        typeInput='date'
                        name='validity'
                        value={validity}
                        onChange={(e) => {
                            const value = e.target.value

                            setValidity(value)
                        }}
                    />
                </FormBudget.ContainerInput>
            </div>
        </>
    )
}