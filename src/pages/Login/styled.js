import styled from 'styled-components'

export const ContainerLogin = styled.div`
    width: 100%;
    height: 100dvh;
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

export const LoginContent = styled.div`
    width: 600px;
    padding: 5vh;
    place-items: center;
    flex-direction: column;

    form{
        width: 100%;
        height: 100%;
        padding: 4vh;
        flex-direction: column;
        align-items: center;
        border-radius: 2vh;
        box-shadow: -1vh 2vh 3vh rgba(0,0,0,0.2);

        header{
            flex-direction: row;
            justify-content: center;
            align-items: center;
            padding-bottom: 7vh;

            .logo{
                height: 4vh;
                align-self: flex-start;
                justify-self: start;
            }
            h1{
                padding-inline: 2vh;
                font-weight: bolder;
                align-items: center;
                justify-content: center;
            }
        }

        div{
            width: 100%;
            flex-direction: column;

            .container-LinksLogin{
                height: fit-content;
                padding-bottom: 7vh;
                flex-direction: row;
                flex-wrap: wrap;
                row-gap: 2vh;
                align-items: center;
                justify-content: space-between;
                
                .forgotPassword{
                    text-decoration: underline;
                    color: #aaa;
                    font-size: medium;
                }
                .containerCheckbox{
                    width: fit-content;
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
            }
            .container-ButtonsLogin{
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
