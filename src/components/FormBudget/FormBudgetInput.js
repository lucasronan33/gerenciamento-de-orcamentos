import './style.css'
import propTypes from 'prop-types'

export function FormBudgetInput({ typeInput, placeholder, ...rest }) {
    return (
        <input
            type={typeInput}
            placeholder={placeholder}
            {...rest}
        />
    )
}

FormBudgetInput.propTypes = {
    typeInput: propTypes.string,
    placeholder: propTypes.string,
}