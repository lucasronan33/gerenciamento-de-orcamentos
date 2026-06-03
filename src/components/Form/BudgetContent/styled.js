import styled from 'styled-components';
import { errorColor, successColor } from '../../../config/colors';

export const BudgetCardItem = styled.div`
    width: 100%;
    padding: 2vh;
    gap: 3vh;
    background: var(--secondaryDarkColor);
    border: 1px solid var(--borderDarkColor);
    border-radius: 2vh;
    flex-wrap: wrap;
    color: white;

    header{
        width: 100%;
        flex-direction: row;
        align-items: center;
        font-weight: bold;
        font-size: x-large;

        .container-trash-icon{
            padding: 0.5vh;
            border-radius: 1vh;
            place-items: center;

            svg{
                color: var(--errorColor);
                
            }
            &:hover{
                background: #900000a9;
                cursor: pointer;

                svg{
                    color: white;
                }
            }
        }
    }

    .discount-card-item{
        color: ${successColor};
    }

    .taxes-card-item{
        color: ${errorColor};
    }
    
`