import { Clock, DollarSign, PackagePlus, Scissors } from 'lucide-react'
import Header from '../../components/Header'
import { Button } from '../../components/Button'
import { FormBudget } from '../../components/FormBudget'
import './style.css'

const examples = [
    {
        name: 'Corte masculino',
        category: 'Servico',
        duration: '45 min',
        price: 'R$ 45,00',
    },
    {
        name: 'Manicure completa',
        category: 'Beleza',
        duration: '60 min',
        price: 'R$ 55,00',
    },
    {
        name: 'Consulta inicial',
        category: 'Saude',
        duration: '30 min',
        price: 'R$ 120,00',
    },
]

export default function PresetItems() {
    return (
        <div>
            <Header />
            <main className='preset-page'>
                <section className='preset-heading'>
                    <div>
                        <h1>Cadastro de itens predefinidos</h1>
                        <p>Monte uma biblioteca visual de servicos, produtos ou pacotes usados nos orcamentos.</p>
                    </div>
                    <Button.Root>
                        <PackagePlus />
                        Novo item
                    </Button.Root>
                </section>

                <section className='preset-form'>
                    <FormBudget.Root>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Nome do item' />
                            <FormBudget.Input typeInput='text' placeholder='Ex: Corte feminino' />
                        </FormBudget.ContainerInput>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Categoria' />
                            <FormBudget.Input typeInput='text' placeholder='Ex: Servico' />
                        </FormBudget.ContainerInput>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Duracao estimada' />
                            <FormBudget.Input typeInput='text' placeholder='Ex: 60 min' />
                        </FormBudget.ContainerInput>
                        <FormBudget.ContainerInput>
                            <FormBudget.Label text='Preco base' />
                            <FormBudget.Input typeInput='text' placeholder='Ex: R$ 80,00' />
                        </FormBudget.ContainerInput>
                    </FormBudget.Root>
                </section>

                <section className='preset-grid'>
                    {examples.map((item) => (
                        <article className='preset-card' key={item.name}>
                            <div className='preset-card-icon'>
                                <Scissors />
                            </div>
                            <div className='preset-card-info'>
                                <h2>{item.name}</h2>
                                <span>{item.category}</span>
                            </div>
                            <div className='preset-card-meta'>
                                <p>
                                    <Clock />
                                    {item.duration}
                                </p>
                                <p>
                                    <DollarSign />
                                    {item.price}
                                </p>
                            </div>
                        </article>
                    ))}
                </section>
            </main>
        </div>
    )
}
