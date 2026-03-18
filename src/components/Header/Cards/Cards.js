import React from 'react';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoDocumentTextOutline, IoTrendingUp } from 'react-icons/io5';

import * as colors from '../../../config/colors';
import { Card, CardInfo } from './CardStyles';
import { Container } from '../../../styles/GlobalStyles';


export default function Cards() {
    return (
        <Container>
            <Card>
                <CardInfo>
                    <p>Total de Orçamentos</p>
                    <p>{0}</p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <IoDocumentTextOutline />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.succesColor}>
                    <p>Aprovados</p>
                    <p>{0}</p>
                </CardInfo>

                <CardInfo $color={colors.succesColor}>
                    <IoMdCheckmarkCircleOutline />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo >
                    <p>Valor Total</p>
                    <p>R$ { } </p>
                </CardInfo>

                <CardInfo $color={colors.blueDocument}>
                    <IoTrendingUp />
                </CardInfo>
            </Card>

            <Card>
                <CardInfo $color={colors.succesColor}>
                    <p>Valor Aprovado</p>
                    <p>R$ { }</p>
                </CardInfo>

                <CardInfo $color={colors.succesColor}>
                    <IoTrendingUp />
                </CardInfo>
            </Card>
        </Container>
    )
}