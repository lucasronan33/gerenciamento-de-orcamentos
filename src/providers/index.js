import { Context } from '../context'


export const Providers = ({ children }) => {
    return (
        <Context.User>
            <Context.Settings>
                <Context.Budget>
                    {children}
                </Context.Budget>
            </Context.Settings>
        </Context.User>
    )
}