import Header from '../../components/Header'
import './style.css'

export default function About() {
    return (
        <div>
            <Header />
            <main className='about-page'>
                <section>
                    <h1>Sobre Nos</h1>
                    <p>
                        Este sistema foi pensado para comercios e profissionais que trabalham com orçamentos,
                        atendimentos por horario e historico de servicos prestados.
                    </p>
                </section>
            </main>
        </div>
    )
}
