import './style.css'
import propTypes from 'prop-types'

export function FormLabel({ htmlFor, text }) {
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

FormLabel.propTypes = {
    htmlFor: propTypes.string,
    text: propTypes.string
}
