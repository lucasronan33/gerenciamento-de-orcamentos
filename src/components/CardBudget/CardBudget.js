import React from 'react';
import { Link } from 'react-router-dom'
import { CardIcons, ContainerCardBudget, DivTitle, InfoCardBudget, StatusBudget } from './CardBudgetStyles';
import { IoCopyOutline, IoEyeOutline, IoTrashOutline } from 'react-icons/io5';
import { FiEdit } from 'react-icons/fi';

export default function CardBudget({ budget }) {

    return (
        <ContainerCardBudget>
            <DivTitle>
                <h2>{budget.code} </h2>
                <StatusBudget>Rascunho</StatusBudget>
            </DivTitle>
            <p className='clientName'>{budget.client?.name} </p>

            <InfoCardBudget>
                <div>
                    <p>Data: </p>
                    <p>{budget.date} </p>
                </div>

                <div>
                    <p>Horario: </p>
                    <p>{budget.time} </p>
                </div>

                <div>
                    <p>Itens: </p>
                    <p>{budget.items?.length || 0} </p>
                </div>
            </InfoCardBudget>
            <InfoCardBudget>
                <div >
                    <h3>Total: </h3>
                    <h3>R$ {budget.total} </h3>
                </div>
            </InfoCardBudget>
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

        </ContainerCardBudget>
    )
}