import { Calendar, NotebookPen, Users } from 'lucide-react';
import { Button } from '../../components/Button';
import { Client } from '../../components/FormBudget/Client';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';

const iconsMenu = [
    {
        title: 'Novo agendamento',
        icon: Calendar,
        path: '/clients'
    },
    {
        title: 'Novo orçamento',
        icon: NotebookPen,
        path: '/budget/new'
    },
]
export function Clients() {

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