import './style.css'
import propTypes from 'prop-types'

export function FormContainerInput({ size = 'fill', children, placeholder }) {
    return (
        <div
            className={`form-budget-container-input input-${size}`}>
            {children}
        </div>
    )
}

FormContainerInput.propTypes = {
    children: propTypes.node,
    size: propTypes.string,
}