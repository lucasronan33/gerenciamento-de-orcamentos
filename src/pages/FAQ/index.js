import Header from '../../components/Header'
import './style.css'

const questions = [
    {
        question: 'Posso usar o sistema para servicos com hora marcada?',
        answer: 'Sim. A ideia e controlar orcamentos, historico de servicos e preparar a evolucao para agenda, confirmacoes e recorrencia de clientes.',
    },
    {
        question: 'O que acontece quando um orcamento e aprovado?',
        answer: 'Hoje ele fica registrado no status escolhido. Uma evolucao natural e transformar o orcamento aprovado em atendimento agendado.',
    },
    {
        question: 'Posso cadastrar servicos frequentes?',
        answer: 'A pagina de itens predefinidos foi preparada visualmente para cadastrar modelos como corte, manicure, consulta, tatuagem pequena ou manutencao.',
    },
    {
        question: 'O sistema guarda historico por cliente?',
        answer: 'O historico pode ser acompanhado pelos orcamentos existentes. Uma proxima etapa recomendada e criar cadastro completo de clientes.',
    },
]

export default function FAQ() {
    return (
        <div>
            <Header />
            <main className='faq-page'>
                <section className='faq-heading'>
                    <h1>FAQ</h1>
                    <p>Duvidas comuns sobre o uso do sistema para orcamentos e servicos agendados.</p>
                </section>

                <section className='faq-list'>
                    {questions.map((item) => (
                        <details className='faq-item' key={item.question}>
                            <summary>{item.question}</summary>
                            <p>{item.answer}</p>
                        </details>
                    ))}
                </section>
            </main>
        </div>
    )
}
