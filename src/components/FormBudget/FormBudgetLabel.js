import './style.css'
import propTypes from 'prop-types'

export function FormBudgetLabel({ htmlFor, text }) {
    if (!htmlFor) {
        return (
            <span className='form-budget-label'>
                {text}
            </span>
        )
    }

    return (
        <label htmlFor={htmlFor}>
            {text}
        </label>
    )
}

FormBudgetLabel.propTypes = {
    htmlFor: propTypes.string,
    text: propTypes.string
}
