import styled from 'styled-components'

export const ContainerRegister = styled.div`
    width: 100%;
    min-height: 100dvh;
    display: flex;
    place-items: center;
    *{
        display: flex;
    }
`

export const Main = styled.div`
    flex-grow: 1;
    background-color: red;
`

export const RegisterContent = styled.div`
    width: 500px;
    padding: 5vh;
    margin-right: 5vh;
    flex-direction: column;
    align-items: center;
    border-radius: 2vh;
    box-shadow: -1vh 2vh 3vh rgba(0,0,0,0.2);

    form{
        width: 100%;
        height: 100%;
        flex-direction: column;

        div{
            width: 100%;
            flex-direction: column;

            .containerCheckbox{
                width: fit-content;
                align-self: flex-end;
                flex-direction: row;
                gap: 1vh;
                justify-content: flex-end;

                label {
                    place-items: center;
                    gap: 3vh;
                    font-size: medium;
                    font-weight: bold;
                }
            }

            .container-ButtonsRegister{
                flex-direction: row;
                justify-content: space-between;
            }

            .field-helper{
                font-size: small;
                font-weight: 600;
            }

            .field-helper.error{
                color: #e74d3c;
            }
        }
    }
`
