import { Context } from '../context'


export const Providers = ({ children }) => {
    return (
        <Context.User>
            <Context.Settings>
                <Context.Client>
                    <Context.Item>
                        <Context.Budget>
                            {children}
                        </Context.Budget>
                    </Context.Item>
                </Context.Client>
            </Context.Settings>
        </Context.User>
    )
}