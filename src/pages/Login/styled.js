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
        display: grid ;
        grid-template-columns: repeat(auto-fit, minmax(200px,1fr));
        gap: 5vh 10vh;
        padding-block: 10vh;

        @media (width <= 900px){
            .hero-text{
                width: 100%;
            }
        }

        .hero-text{
            display: flex;
            flex-direction: column;
            place-content: center;
            flex: 1;
            gap: 2vh;

            h1.hero-title{
                padding: 0;
                margin: 0 auto;
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
                margin: 0 auto;
                padding-block: 5vh;
                display: flex;
                color: rgb(170,170,190);
                font-size: 1.25rem;
                line-height: 1.7;
                text-align: center;
            }

            .container-buttons-hero{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                gap: 2rem 1rem;

                button{
                    min-width: 200px;
                    scale: .9;
                    flex: 1;
                    border-radius: 5vh;
                    font-size: 1rem;
                    transition: 0.3s;

                    &:hover{
                        scale: 1;
                        color: white;
                        box-shadow: -0.5vh .5vh 3vh rgba(80, 50, 180, 1);

                    }

                    &.button-first-budget{
                        box-shadow: -0.5vh 1vh 1.5vh rgba(100,180,255,0.5);

                        &:hover{
                            background: ${color.purpleHover};
                            box-shadow: -0.5vh .5vh 3vh rgba(80, 50, 180, 1);
                        }
                    }

                    &.button-view-demo{
                        outline: 2px solid ${color.borderDarkColor};
                        background: none;
                        color: white;
                    }
                }
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
