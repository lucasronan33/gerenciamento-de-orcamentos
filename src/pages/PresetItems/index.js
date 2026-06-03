import Header from '../../components/Header'
import './style.css'
import { Container } from '../../styles/GlobalStyles'
import { Items } from '../../components/FormBudget/Items'

export default function PresetItems() {
    return (
        <>
            <Header />
            <Container>
                <Items.Register />
                <Items.List />
            </Container>
        </>
    )
}
