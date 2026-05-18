import { LocalizationProvider } from '@mui/x-date-pickers';
import { MemoryRouter } from 'react-router-dom';
import { SettingsProvider } from '../../components/SettingsContext';
import { BudgetProvider } from '../../components/BudgetContext';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { render, screen, within } from '@testing-library/react';

export function renderWithProviders(component) {
    render(
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <SettingsProvider>
                    <BudgetProvider>
                        {component}
                    </BudgetProvider>
                </SettingsProvider>
            </MemoryRouter>
        </LocalizationProvider>

    )
}

export async function fillFormBudgetInput(user, labelText, data) {
    const input = screen.getByLabelText(labelText)
    await user.type(input, data)
    expect(input).toHaveValue(data)
}

export async function fillCustomSelectMenu(user, labelText, data) {
    const status = screen.getByLabelText(labelText)
    await user.click(status)
    await user.click(screen.getByText(data))
    expect(status).toHaveValue(data)
}

export async function fillDatePicker(user, config, options, actions, expectConfig) {
    const dataLabel = screen.getByText(config.labelText)
    const dataContainer = dataLabel.closest(config.parentClass)
    const button = within(dataContainer).getByRole(options.roleButton, {
        name: options.ariaText
    })
    await actions.beforeClick?.(button)
    await user.click(button)

    for (const getOption of actions.options) {
        const option = getOption()
        await user.click(option)
    }

    expect(button).toHaveAttribute(
        expectConfig.haveAttribute,
        expect.stringMatching(expectConfig.textExpect))
}
