import { Form } from '..';
import { useBudget } from '../../../context/Budget'

const options = [
    {
        value: 'À vista',
        text: 'À vista',
    },
    {
        value: 'Boleto',
        text: 'Boleto',
    },
    {
        value: 'Pix',
        text: 'Pix',
    },
    {
        value: 'Cartão de Débito',
        text: 'Cartão de Débito',
    },
    {
        value: 'Cartão de Crédito',
        text: 'Cartão de Crédito',
    },
]

export function BudgetContentConditions() {
    const { budget, updateBudget } = useBudget()

    return (
        <>
            <Form.ContainerInput>
                <Form.Label text='Forma de Pagamento' />

                <select
                    value={budget.conditions.paymentMethod}
                    onChange={(e) => updateBudget('conditions', 'paymentMethod', e.target.value)}
                >
                    {options.map(value => (
                        <option
                            key={value.value}
                            value={value.value}>
                            {value.text}
                        </option>
                    ))}
                </select>
            </Form.ContainerInput>

            <Form.ContainerInput size='large'>
                <Form.Label text='Prazo de entrega' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 15 dias úteis'
                    name='shippingTime'
                    value={budget.conditions.shippingTime}
                    onChange={(e) => updateBudget('conditions', 'shippingTime', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Condições de Pagamento' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 30% de entrada, 70% na entrega'
                    name='paymentConditions'
                    value={budget.conditions.paymentConditions}
                    onChange={(e) => updateBudget('conditions', 'paymentConditions', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Garantia' />
                <Form.Input
                    typeInput='text'
                    placeholder='Ex.: 12 meses contra defeitos de fabricação'
                    name='warranty'
                    value={budget.conditions.warranty}
                    onChange={(e) => updateBudget('conditions', 'warranty', e.target.value)}

                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Observações' />
                <Form.TextArea
                    placeholder='Observações gerais sobre o orçamento...'
                    rows='3'
                    name='obsBudget'
                    value={budget.conditions.obsBudget}
                    onChange={(e) => updateBudget('conditions', 'obsBudget', e.target.value)}
                />
            </Form.ContainerInput>

            <Form.ContainerInput size='xx-large'>
                <Form.Label text='Termos e Condições' />
                <Form.TextArea
                    placeholder='Termos e condições gerais, política de cancelamento, etc...'
                    rows='7'
                    name='termsConditions'
                    value={budget.conditions.termsConditions}
                    onChange={(e) => updateBudget('conditions', 'termsConditions', e.target.value)}
                />
            </Form.ContainerInput>
        </>
    )
}
