import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBudget from '../../components/NewBudget'

describe('Criação de orçamento', () => {
    it('deve criar um orçamento com sucesso', async () => {
        const handleIsVisible = vi.fn()

        render(<NewBudget
            budgetData={{
                basic: {
                    code: 395147,
                    date: "19/05/2026",
                    name: "teste",
                    status: "Rascunho",
                    time: "09:00",
                    timeService: "01:00",
                    validUntil: "19/05/2026",
                },
                client: {},
                conditions: { paymentMethod: 'À vista' },
                items: [],
                totals: {
                    discount: 0,
                    shipping: 0,
                    shippingType: "Sem Frete",
                    subtotal: 0,
                    taxes: 0,
                    total: 0
                },
            }}
            handleIsVisible={handleIsVisible}
            id={'new'}
            isNew={true}
            isVisible={true}
            key={'new'}
        />)

        const inputName =
            screen.getByLabelText(/nome/i)

        const inputDate =
            screen.getByLabelText(/data/i)

        const inputTime =
            screen.getByLabelText(/horário/i)

        const inputValid =
            screen.getByLabelText(/valido/i)

        const inputDuration =
            screen.getByLabelText(/duração/i)

        const button =
            screen.getByRole('button', {
                name: /salvar/i,
            })

        await userEvent.type(
            inputName,
            'Douglas'
        )

        await userEvent.type(
            inputDate,
            '15/05/2026'
        )

        await userEvent.type(
            inputValid,
            '15/05/2026'
        )

        await userEvent.type(
            inputTime,
            '14:00'
        )

        await userEvent.type(
            inputDuration,
            '04:00'
        )

        await userEvent.click(button)

        expect(
            await screen.findByText(
                /configurações salvas/i
            )
        ).toBeInTheDocument()
    })
})