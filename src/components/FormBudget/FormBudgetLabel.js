import './style.css'
import propTypes from 'prop-types'

export function FormBudgetLabel({ text }) {
    return (
        <label>
            {text}
        </label>
    )
}

FormBudgetLabel.propTypes = {
    text: propTypes.string
}