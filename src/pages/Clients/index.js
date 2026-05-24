import { Client } from '../../components/FormBudget/Client';
import Header from '../../components/Header';
import { Container } from '../../styles/GlobalStyles';

export function Clients() {

    return (
        <>
            <Header />
            <Container>
                <Client.Register />
                <Client.List clients={[
                    {
                        name: 'Teste abc',
                        whatsapp: '47991369625',
                        phone: '47992327910',
                    },
                    {
                        name: 'Lucas Ronan Torres Castao',
                        whatsapp: '47991369625',
                        phone: '47992327910',
                        email: 'teste@teste.com'
                    },
                ]} />
            </Container>
        </>
    )
}