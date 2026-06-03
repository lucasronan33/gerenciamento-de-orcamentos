import { BudgetProvider } from './Budget';
import { ClientProvider } from './Client';
import { ItemProvider } from './Item';
import { SettingsProvider } from './Settings';
import { UserProvider } from './User';

export const Context = {
    Budget: BudgetProvider,
    Settings: SettingsProvider,
    User: UserProvider,
    Client: ClientProvider,
    Item: ItemProvider,
}