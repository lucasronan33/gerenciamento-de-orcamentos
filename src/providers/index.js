import { Context } from '../context'


export const Providers = ({ children }) => {
    return (
        <Context.User>
            <Context.Settings>
                <Context.Client>
                    <Context.Budget>
                        {children}
                    </Context.Budget>
                </Context.Client>
            </Context.Settings>
        </Context.User>
    )
}