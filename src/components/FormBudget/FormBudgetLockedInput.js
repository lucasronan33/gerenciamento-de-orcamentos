import styled from 'styled-components'
import './style.css'
import propTypes from 'prop-types'

export const LockedInput = styled.input`
    width: 100%;
    height: 5vh;
    font-size: large;
    background: #ddd;
    place-items: center;
    padding: 1vh 2.5vh;
    border-radius: 1vh;
    border: none;
    font-weight: normal;
`

export function FormBudgetLockedInput({ text, ...rest }) {
    return (
        <LockedInput readOnly {...rest}>
            {text}
        </LockedInput>
    )
}

FormBudgetLockedInput.propTypes = {
    text: propTypes.string
}
