import Header from '../../components/Header'
import './style.css'
import { Container } from '../../styles/GlobalStyles'
import { Items } from '../../components/Form/Items'

export default function PresetItems() {
    return (
        <>
            <Header />
            <Container>
                <main className='settings-page'>
                    <Items.Register />
                </main>
                <Items.List />
            </Container>
        </>
    )
}
