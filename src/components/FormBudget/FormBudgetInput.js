import './style.css'
import propTypes from 'prop-types'

export function FormBudgetInput({ typeInput, placeholder, ...rest }) {
    return (
        <input
            id={rest.id || rest.name}
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
