import { FormBudget } from '../../components/FormBudget';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import axios from '../../services/axios';
import { fillCustomSelectMenu, fillDatePicker, fillFormBudgetInput, renderWithProviders } from '../helpers/helpers';
import { makeSettings } from '../factories/settings';

jest.mock('../../services/axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}))

describe('BudgetBasic - testa inputs', () => {
    beforeEach(() => {
        axios.get.mockImplementation((route) => {
            if (route === '/user/settings') {
                return Promise.resolve(makeSettings())
            }
            if (route === '/budgets') return Promise.resolve({ data: [] })
            return Promise.resolve({ data: {} })
        })
    })

    it('testa o comportamento esperado na edição dos inputs', async () => {
        const user = userEvent.setup()
        renderWithProviders(<FormBudget.Content.Basic />)

        await fillFormBudgetInput(user, /nome do cliente/i, 'cliente teste')

        await fillCustomSelectMenu(user, /status do orçamento/i, 'Finalizado')

        await fillDatePicker(
            user,
            {
                labelText: /data \*/i,
                parentClass: '.form-budget-container-input'
            },
            {
                roleButton: 'button',
                ariaText: /choose date/i
            },
            {
                options: [
                    () => screen.getByRole('gridcell', { name: '20' })
                ]
            },
            {
                haveAttribute: 'aria-label',
                textExpect: /selected date is/i
            }
        )

        await fillDatePicker(
            user,
            {
                labelText: /valido até \*/i,
                parentClass: '.form-budget-container-input'
            },
            {
                roleButton: 'button',
                ariaText: /choose date/i
            },
            {
                options: [
                    () => screen.getByRole('gridcell', { name: '20' })
                ]
            },
            {
                haveAttribute: 'aria-label',
                textExpect: /selected date is/i
            }
        )

        await fillDatePicker(
            user,
            {
                labelText: /horário \*/i,
                parentClass: '.form-budget-container-input'
            },
            {
                roleButton: 'button',
                ariaText: /choose time/i
            },
            {
                options: [
                    () => screen.getByRole('option', { name: '8 hours' }),
                    () => screen.getByRole('option', { name: '30 minutes' })
                ]
            },
            {
                haveAttribute: 'aria-label',
                textExpect: /selected time is/i
            }
        )

        await fillDatePicker(
            user,
            {
                labelText: /duração do serviço/i,
                parentClass: '.form-budget-container-input'
            },
            {
                roleButton: 'button',
                ariaText: /choose time/i
            },
            {
                options: [
                    () => screen.getByRole('option', { name: '8 hours' }),
                    () => screen.getByRole('option', { name: '30 minutes' })
                ]
            },
            {
                haveAttribute: 'aria-label',
                textExpect: /selected time is/i
            }
        )
    })
})