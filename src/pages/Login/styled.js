import styled from 'styled-components'
import * as color from '../../config/colors'

export const ContainerLogin = styled.div`
    width: 100%;
    min-height: 100dvh;
    background-image: radial-gradient(circle, rgba(38, 178, 242, 0.3) 0%, transparent 60%);
    background-color: rgba(0, 0, 0, 0.3);
    background-position: 0 200%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: 100% 150%; 
    position: absolute;

    .banner-footer-hero{
        width: 100%;
        margin: auto;
        display: flex;
        justify-content: center;
        padding-block: 3rem;
        font-size: 0.8em;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-align: center;
        line-height: 1.5em;
        color: rgba(255,255,255, 0.6);
        border-block: 1px solid ${color.borderDarkColor};
        background: rgba(0, 0, 0, 0.1);
    }
`

export const Main = styled.div`
    flex-grow: 1;
    background-color: red;
`

export const LoginContent = styled.div`
    padding: 5vh;
    margin: auto;
    display: flex;
    place-items: center;
    flex-direction: column;
    *{
        display: flex;
    }

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
