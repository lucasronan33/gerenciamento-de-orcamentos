import { FileText, Home } from 'lucide-react';
import { Button } from '../../components/Button';
import { Client } from '../../components/Form/Client';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';

const iconsMenu = [
    {
        title: 'Home',
        icon: Home,
        path: '/'
    },
    {
        title: 'Novo orçamento',
        icon: FileText,
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