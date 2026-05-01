import './style.css'
import propTypes from 'prop-types'

export function FormBudgetTextArea({ placeholder, ...rest }) {
    return (
        <textarea
            placeholder={placeholder}
            {...rest}
        />
    )
}

FormBudgetTextArea.propTypes = {
    placeholder: propTypes.string,
}