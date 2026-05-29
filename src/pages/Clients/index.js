import { Client } from '../../components/FormBudget/Client';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';

export function Clients() {

    return (
        <>
            <Header />
            <Container>
                <Client.Register />
                <Client.List />
            </Container>
        </>
    )
}