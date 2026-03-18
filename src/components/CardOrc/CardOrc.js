import React from 'react';
import { Link } from 'react-router-dom'
import { Container } from '../../styles/GlobalStyles';
import { Card } from '../Header/Cards/CardStyles';
import { CardIcons, ContainerCardOrc, DivTitle, InfoCardOrc, StatusOrc } from './CardOrcStyles';
import { IoCopyOutline, IoEyeOutline, IoTrashOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';

export default function CardOrc() {

    return (
        <Container>
            <ContainerCardOrc>
                <DivTitle>
                    <h2>{'ORC-123'} </h2>
                    <StatusOrc>Rascunho</StatusOrc>
                </DivTitle>
                <p className='clientName'>{'Nome cliente'} </p>

                <InfoCardOrc>
                    <div>
                        <p>Data: </p>
                        <p>00/00/00</p>
                    </div>

                    <div>
                        <p>Horario: </p>
                        <p>00:00</p>
                    </div>

                    <div>
                        <p>Itens: </p>
                        <p>0</p>
                    </div>
                </InfoCardOrc>
                <InfoCardOrc>
                    <div >
                        <h3>Total: </h3>
                        <h3>R$ </h3>
                    </div>
                </InfoCardOrc>
                <CardIcons>
                    <Link to={`/edit`} className='viewOrc' >
                        <div>
                            <IoEyeOutline /> Ver
                        </div>
                    </Link>
                    <Link to={`/edit`} >
                        <div >
                            <FiEdit />
                        </div>
                    </Link>
                    <Link to={`/edit`} >
                        <div >
                            <IoCopyOutline />
                        </div>
                    </Link>
                    <Link to={`/edit`} >
                        <div >
                            <IoTrashOutline className='trashIco' />
                        </div>
                    </Link>
                </CardIcons>

            </ContainerCardOrc>
        </Container>
    )
}