import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import '@testing-library/jest-dom'

import NewBudget from '../../components/NewBudget'
import { SettingsProvider } from '../../components/SettingsContext'
import { BudgetProvider } from '../../components/BudgetContext'
import axios from '../../services/axios'

jest.mock('../../services/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))

function renderNewBudget() {
  const handleIsVisible = jest.fn()

  render(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SettingsProvider>
          <BudgetProvider>
            <NewBudget
              handleIsVisible={handleIsVisible}
              id="new"
              isNew
              isVisible
            />
          </BudgetProvider>
        </SettingsProvider>
      </MemoryRouter>
    </LocalizationProvider>
  )
}

describe('NewBudget - integração da aba Básico', () => {
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
            },
          },
        })
      }

      if (route === '/budgets') {
        return Promise.resolve({ data: [] })
      }

      return Promise.resolve({ data: {} })
    })
  })

  it('renderiza os campos do básico e mantém o comportamento esperado de edição', async () => {
    const user = userEvent.setup()
    renderNewBudget()

    expect(await screen.findByText(/novo orçamento/i)).toBeInTheDocument()
    expect(screen.getByText(/numero do orçamento \*/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/nome do cliente/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/status do orçamento/i)).toBeInTheDocument()
    expect(screen.getByText(/data \*/i)).toBeInTheDocument()
    expect(screen.getByText(/valido até \*/i)).toBeInTheDocument()
    expect(screen.getByText(/horário \*/i)).toBeInTheDocument()
    expect(screen.getByText(/duração do serviço/i)).toBeInTheDocument()

    const nameInput = screen.getByLabelText(/nome do cliente/i)
    await user.type(nameInput, 'Cliente Integração')
    expect(nameInput).toHaveValue('Cliente Integração')

    const statusInput = screen.getByLabelText(/status do orçamento/i)
    expect(statusInput).toHaveValue('Rascunho')

    await user.click(statusInput)
    await user.click(screen.getByText('Aprovado'))
    expect(statusInput).toHaveValue('Aprovado')

    expect(axios.get).toHaveBeenCalledWith('/user/settings')
  })
})
