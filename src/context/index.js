import { BudgetProvider } from './Budget';
import { SettingsProvider } from './Settings';
import { UserProvider } from './User';

export const Context = {
    Budget: BudgetProvider,
    Settings: SettingsProvider,
    User: UserProvider,
}