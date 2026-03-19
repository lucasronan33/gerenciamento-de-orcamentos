import React from 'react';
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../Header/styles';
import { DivContainerFilter, InptSearch } from './styles'
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlineChevronDown } from 'react-icons/hi';


export default function HeaderFilter() {
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

                <DivContainerFilter>
                    <InptSearch>
                        <HiOutlineChevronDown className='chevronDown-icon' />
                        <input
                            type='text'
                            placeholder='Filtrar por status do Orçamento'
                        />
                    </InptSearch>

                    {/* <div className='dropDownMenu'>
                        li
                    </div> */}
                </DivContainerFilter>

            </Card>
        </Container>
    )
}