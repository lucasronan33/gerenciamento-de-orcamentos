import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MemoryRouter } from 'react-router-dom';
import { SettingsProvider } from '../../components/SettingsContext';
import { BudgetProvider } from '../../components/BudgetContext';
import { FormBudget } from '../../components/FormBudget';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import axios from '../../services/axios';

jest.mock('../../services/axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        post: jest.fn(),
        put: jest.fn(),
        delete: jest.fn(),
    },
}))
function renderBudgetBasic() {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SettingsProvider>
                    <BudgetProvider>
                        <FormBudget.Content.Basic />
                    </BudgetProvider>
                </SettingsProvider>
            </MemoryRouter>
        </LocalizationProvider>

    )
}

describe('BudgetBasic - testa inputs', () => {
    beforeEach(() => {
        axios.get.mockImplementation((route) => {
            if (route === '/user/settings') {
                return Promise.resolve({
                    data: {
                        services: {
                            workDays: [0, 1, 2, 3, 4, 5, 6],
                            priceHour: 0,
                            endHour: '18:00',
                            startHour: '08:00',
                            stepHour: 30,
                            minTimeService: '01:00',
                        }
                    }
                })
            }

            if (route === '/budgets') return Promise.resolve({ data: [] })

            return Promise.resolve({ data: {} })

        })
    })

    it('testa o comportamento esperado na edição dos inputs', async () => {
        const user = userEvent.setup()
        renderBudgetBasic()

        const inputName = screen.getByLabelText(/nome do cliente/i)
        await user.type(inputName, 'cliente teste')
        expect(inputName).toHaveValue('cliente teste')

        const status = screen.getByLabelText(/status do orçamento/i)
        await user.click(status)
        await user.click(screen.getByText('Finalizado'))
        expect(status).toHaveValue('Finalizado')

        const dataLabel = screen.getByText(/data \*/i)
        const dataContainer = dataLabel.closest('.form-budget-container-input')
        const openDateButton = within(dataContainer).getByRole('button', {
            name: /choose date/i
        })
        await user.click(openDateButton)
        const day20 = () => screen.getByRole('gridcell', {
            name: '20'
        })
        await user.click(day20())
        expect(openDateButton).toHaveAttribute('aria-label', expect.stringMatching(/selected date is/i))

        const validUntilLabel = screen.getByText(/valido até \*/i)
        const validUntilContainer = validUntilLabel.closest('.form-budget-container-input')
        const openValidDateButton = within(validUntilContainer).getByRole('button', {
            name: /choose date/i
        })
        await user.click(openValidDateButton)
        await user.click(day20())
        expect(openValidDateButton).toHaveAttribute('aria-label', expect.stringMatching(/selected date is/i))

        const timeLabel = screen.getByText(/horário \*/i)
        const timeContainer = timeLabel.closest('.form-budget-container-input')
        const openTimeButton = within(timeContainer).getByRole('button', {
            name: /choose time/i
        })
        await user.click(openTimeButton)
        const time8 = () => screen.getByRole('option', {
            name: '8 hours'
        })
        const minutes30 = () => screen.getByRole('option', {
            name: '30 minutes'
        })
        await user.click(time8())
        await user.click(minutes30())
        expect(openTimeButton).toHaveAttribute('aria-label', expect.stringMatching(/selected time is/i))

        const timeServiceLabel = screen.getByText(/duração do serviço/i)
        const timeServiceContainer = timeServiceLabel.closest('.form-budget-container-input')
        const openTimeServiceButton = within(timeServiceContainer).getByRole('button', {
            name: /choose time/i
        })
        await user.click(time8())
        await user.click(minutes30())
        expect(openTimeServiceButton).toHaveAttribute('aria-label', expect.stringMatching(/selected time is/i))
    })
})