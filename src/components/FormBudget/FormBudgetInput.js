import './style.css'
import propTypes from 'prop-types'

export function FormBudgetInput({ typeInput, placeholder, endIcon, onEndIconClick, ...rest }) {
    if (endIcon) {
        return (
            <div className='form-budget-input-with-icon'>
                <input
                    id={rest.id || rest.name}
                    type={typeInput}
                    placeholder={placeholder}
                    {...rest}
                />
                <button
                    type='button'
                    className='form-budget-input-icon-button'
                    onClick={onEndIconClick}
                    aria-label={rest['aria-label']}
                    title={rest.title}
                >
                    {endIcon}
                </button>
            </div>
        )
    }

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
    endIcon: propTypes.node,
    onEndIconClick: propTypes.func,
}
