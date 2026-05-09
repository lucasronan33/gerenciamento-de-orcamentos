import './style.css'
import propTypes from 'prop-types'

export function FormBudgetTextArea({ placeholder, ...rest }) {
    return (
        <textarea
            id={rest.id || rest.name}
            placeholder={placeholder}
            {...rest}
        />
    )
}

FormBudgetTextArea.propTypes = {
    placeholder: propTypes.string,
}
