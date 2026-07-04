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
import { makeSettings } from '../factories/settings'
import { renderWithProviders } from '../helpers/helpers'
import { makeBudget } from '../factories/budget'

jest.mock('../../services/axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}))
describe('NewBudget - integração da aba Básico', () => {
  beforeEach(() => {
    axios.get.mockImplementation((route) => {
      if (route === '/user/settings') {
        return Promise.resolve(makeSettings())
      }

      if (route === '/budgets') {
        return Promise.resolve({ data: [] })
      }

      return Promise.resolve({ data: {} })
    })

    axios.post.mockResolvedValue({
      data: {
        success: true,
      }
    })
  })

  it('deve criar um orçamento com sucesso', async () => {
    const user = userEvent.setup()
    const budget = makeBudget()
    renderWithProviders(<NewBudget
      handleIsVisible={jest.fn()}
      id="new"
      isNew
      isVisible
    />)


    // FAZER VALIDAÇÃO DE CRIAÇÃO DE ORÇAMENTO

    const button = screen.getByText(/criar orçamento/i)
  })
})
