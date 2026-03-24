import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../HeaderMain/styles';
import { DivContainerFilter, InptSearch } from './styles'
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function HeaderFilter() {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    const [search, setSearch] = useState('Todos os status')
    const [selected, setSelected] = useState('Todos os status')
    const options = [
        'Todos os status',
        'Rascunho',
        'Enviado',
        'Aprovado',
        'Rejeitado',
        'Finalizado',
    ]

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
        <Container>
            <Card className='card-filter'>

                <DivContainerFilter>
                    <InptSearch>
                        <IoSearchOutline className='search-icon' />
                        <input
                            type='text'
                            className='input-search'
                            placeholder='Buscar por número, cliente ou e-mail'
                        />
                    </InptSearch>
                </DivContainerFilter>

                <DivContainerFilter ref={ref}>
                    <InptSearch>
                        <HiOutlineChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            placeholder='Filtrar por status do Orçamento'
                            value={search}
                            onClick={(e) => {
                                setOpen(true)
                                setSearch('')
                            }}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InptSearch>

                    {open && (
                        <div className='dropDownMenu'>
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((item, index) => (
                                    <div
                                        key={index}
                                        className={`option ${item === selected ? 'selected' : ''}`}
                                        onClick={() => {
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

            </Card>
        </Container >
    )
}