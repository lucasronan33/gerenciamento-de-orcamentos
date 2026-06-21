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

    .hero-section{
        width: 90%;
        margin: auto;
        display: flex;
        flex-wrap: wrap;
        gap: 0 10vh;
        padding-block: 10vh;

        .hero-text{
            display: flex;
            flex-direction: column;
            flex: 1;

            h1.hero-title{
                margin: auto;
                font-size: 3rem;
                text-align: center;
                font-weight: 800;
                line-height: 1;
                letter-spacing: -0.025rem;

                .hero-title-gradient{
                    background: linear-gradient(135deg, white , ${color.blueDocument});
                    background-clip: text;
                    color: transparent;
                }

                @media (width >=40rem){
                    font-size: 4rem;
                }
            }

            .hero-subtext{
                margin: auto;
                padding-block: 5vh;
                display: flex;
                color: rgb(170,170,190);
                font-size: 1.25rem;
                line-height: 1.7;
                text-align: center;
            }
        }

        .hero-window{
            max-width: 100%;
            min-height: 20rem;
            display: flex;
            flex-direction: column;
            flex: 1;
            align-self: stretch;
            border-radius: 1.5rem;
            border: 1px solid ${color.borderDarkColor};
            background: rgba(0, 0, 0, 0.3);
            overflow: hidden;

            .window-topbar{
                width: 100%;
                height: 2rem;
                border-bottom: 1px solid ${color.borderDarkColor};
                background: rgba(20, 20, 20, 0.3);

                .container-circle-window{
                    display: flex;
                    height: 100%;
                    padding: 1vh 2vh;
                    gap: 0.5rem;
                    margin: auto 0;

                    .circle-window-topbar{
                        height: 100%;
                        aspect-ratio: 1 / 1;
                        border-radius: 50%;

                        &.circle-1{
                            background-color: rgba(255, 0, 0, 0.6);
                        }
                        &.circle-2{
                            background-color: rgba(255, 200, 0, 0.6);
                        }
                        &.circle-3{
                            background-color: rgba(0, 200, 0, 0.6);
                        }
                    }
                }
            }
        }
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
