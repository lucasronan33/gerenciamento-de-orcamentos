import { FileText, Home } from 'lucide-react';
import { Button } from '../../components/Button';
import { Client } from '../../components/Form/Client';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBudget } from '../../context/Budget';

export function Clients() {
    const { setBudgetOpen } = useBudget()
    const navigate = useNavigate()

    const iconsMenu = [
        {
            title: 'Home',
            icon: Home,
            action: () => navigate('/')
        },
        {
            title: 'Novo orçamento',
            icon: FileText,
            action: () => setBudgetOpen(true)
        },
    ]
    return (
        <>
            <Header />
            <Container>
                <Client.Register />
                <Client.List />
                <Button.FixedMenu children={iconsMenu} />
            </Container>
        </>
    )
}