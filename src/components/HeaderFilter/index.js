import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../Header/styles';
import { DivContainerFilter, InptSearch } from './styles'
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi';
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';

export default function HeaderFilter() {

    const [open, setOpen] = useState(false)
    const ref = useRef()

    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)

        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [])

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
                            onClick={() => setOpen(true)}
                        />
                    </InptSearch>

                    {open && (
                        <div className='dropDownMenu'>
                            <div>teste 1</div>
                            <div>teste 2</div>
                            <div>teste 3</div>
                            <div>teste 4</div>
                        </div>
                    )}
                </DivContainerFilter>

            </Card>
        </Container>
    )
}