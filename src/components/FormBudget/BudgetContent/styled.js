import styled from 'styled-components';

export const BudgetCardItem = styled.div`
    width: 100%;
    padding: 2vh;
    gap: 3vh;
    border: #ddd 1px solid;
    border-radius: 2vh;
    flex-wrap: wrap;
    color: initial;

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
                color: darkred;
                
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
    
`