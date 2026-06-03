import './style.css'
import propTypes from 'prop-types'

export function FormTextArea({ placeholder, ...rest }) {
    return (
        <textarea
            id={rest.id || rest.name}
            placeholder={placeholder}
            {...rest}
        />
    )
}

FormTextArea.propTypes = {
    placeholder: propTypes.string,
}
