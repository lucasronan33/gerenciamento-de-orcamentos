import './style.css'
import propTypes from 'prop-types'

export function FormBudgetContainerInput({ size = 'fill', children, placeholder }) {
    return (
        <div
            className={`form-budget-container-input input-${size}`}>
            {children}
        </div>
    )
}

FormBudgetContainerInput.propTypes = {
    children: propTypes.node,
    size: propTypes.string,
}