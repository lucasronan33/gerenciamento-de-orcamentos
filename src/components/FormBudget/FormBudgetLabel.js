import './style.css'
import propTypes from 'prop-types'

export function FormBudgetLabel({ name, text }) {
    if (!name) {
        return (
            <span className='form-budget-label'>
                {text}
            </span>
        )
    }

    return (
        <label htmlFor={name}>
            {text}
        </label>
    )
}

FormBudgetLabel.propTypes = {
    name: propTypes.string,
    text: propTypes.string
}
