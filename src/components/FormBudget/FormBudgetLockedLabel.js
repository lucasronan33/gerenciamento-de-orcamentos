import styled from 'styled-components'
import './style.css'
import propTypes from 'prop-types'
import { blueHover } from '../../config/colors'

export const LockedLabel = styled.div`
    width: 100%;
    height: 5vh;
    font-size: large;
    background: ${blueHover};
    place-items: center;
    padding: 1vh 2.5vh;
    border-radius: 1vh;
    border: none;
    font-weight: normal;
`

export function FormBudgetLockedLabel({ text }) {
    return (
        <LockedLabel className='form-budget-label'>
            {text}
        </LockedLabel>
    )
}

FormBudgetLockedLabel.propTypes = {
    text: propTypes.string
}
