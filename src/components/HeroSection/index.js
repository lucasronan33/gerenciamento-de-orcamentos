import { ArrowRight, Check, Play, Sparkles } from 'lucide-react'
import imageMockup from '../../assets/images/mockup.png'
import styled from 'styled-components'
import * as color from '../../config/colors'

const benefits = [
    'Sem cartão',
    'Cancele quando quiser',
    'Login com Google',
]

const Hero = styled.div`
    width: 90%;
    min-height: 100dvh;
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    place-items: center;
    place-content: center;
    gap: 3vh 3vh;
    padding-block: 10vh;

    @media (width <= 900px){
        .hero-text{
            width: 100%;
        }
    }

    .hero-text{
        min-width: 350px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        flex: 1;
        font-size: 1rem;

        .container-free-days{
            display: flex;
            place-items: center;
            place-content: center;
            margin-bottom: 1rem;
            gap: .5rem;
            padding: 0.25rem 1rem;
            outline: 1px solid ${color.borderDarkColor};
            border-radius: 2rem;
            font-size: 0.75em;
            color: rgba(255,255,255,0.5);
            background: rgba(0, 0, 0, 0.1);

            svg{
                height: 1rem;
                color: ${color.blueDocument};
            }
        }

        h1.hero-title{
            padding: 0;
            margin: 0 auto;
            font-size: 3.5em;
            text-align: center;
            font-weight: 800;
            line-height: 1;
            letter-spacing: -0.025rem;

            .hero-title-gradient{
                background: linear-gradient(135deg, white , ${color.blueDocument});
                background-clip: text;
                color: transparent;
            }
        }

        .hero-subtext{
            margin: 0 auto;
            padding-block: 5vh;
            display: flex;
            color: rgb(170,170,190);
            font-size: .9em;
            line-height: 1.7;
            text-align: center;
        }

        .container-buttons-hero{
            width: 100%;
            display: flex;
            place-content: center;
            flex-wrap: wrap;
            gap: 2rem 1rem;

            button{
                min-width: 250px;
                width: fit-content;
                scale: .9;
                flex: 1;
                border-radius: 5vh;
                font-size: 1.1em;
                transition: 0.3s;

                &:hover{
                    scale: 1;
                    color: white;

                }

                &.button-first-budget{
                    background: cyan;
                    box-shadow: -0.5vh 1vh 2rem rgba(100,180,255,0.2);

                    &:hover{
                        background: ${color.purpleHover};
                        box-shadow: -0.5vh .5vh 3vh rgba(80, 50, 180, 1);
                    }
                }

                &.button-view-demo{
                    /* outline: 2px solid ${color.borderDarkColor}; */
                    background: none;
                    color: white;
                    flex: 0;
                    &:hover{
                        box-shadow: none;
                        filter:drop-shadow( -0.5vh .5vh 3vh rgba(80, 50, 180, 1));
                    }
                }
            }
        }

        .container-benefits-hero{
            padding-block: 2em;
            display: flex;
            gap: 1em;

            .hero-benefit{
                display: flex;
                align-items: center;
                justify-content: center;
                gap: .75em;
                font-size:0.75em;
                color: rgba(255,255,255,0.6);
                
                svg{
                    color: ${color.blueDocument};
                    height: 1.5em;
                }
            }
        }
    }

    .hero-window{
        min-width: 300px;
        height: fit-content;
        display: flex;
        flex: 1;
        border-radius: 1.5rem;
        background: rgba(0, 0, 0, 0.3);
        overflow: hidden;
        scale: 0.9;
        box-shadow: -0.5vh .5vh 3vh ${color.blueHover};
        animation-name: mockup, mockup-light;
        animation-duration: 15s, 5s;
        animation-iteration-count: infinite, infinite;
        animation-timing-function: linear,linear;

        @keyframes mockup-light {
            0%{
                box-shadow: -0.5vh .5vh 8em ${color.blueHover};
            }
            50%{
                box-shadow: -0.5vh .5vh 3em ${color.blueHover};
            }
            100%{
                box-shadow: -0.5vh .5vh 8em ${color.blueHover};
            }
        }
        @keyframes mockup {
            0%{
                translate: 1% 1%;
                
            }
            25%{
                translate: 1% -1%;
                
            }
            50%{
                translate: -1% -1%;
                
            }
            75%{
                translate: -1% 1%;
                
            }
            100%{
                translate: 1% 1%;
                
            }
        }

        img{
            width: 100%;
        }

    }
`

const HeroSection = () => {
    return (
        <Hero>
            <div className='hero-text'>
                <span className='container-free-days'>
                    <Sparkles />
                    14 dias grátis — sem cartão de crédito
                </span>
                <h1 className='hero-title'>
                    Organize seus orçamentos
                    <span className='hero-title-gradient'>
                        , controle seus resultados.
                    </span>
                </h1>
                <span className='hero-subtext'>
                    Crie orçamentos profissionais em minutos, acompanhe aprovações e tenha mais controle sobre o seu faturamento. Tudo em um só lugar, sem planilhas, sem WhatsApp bagunçado.
                </span>

                <span className='container-buttons-hero'>
                    <button
                        className='button-first-budget'
                    >
                        Criar meu primiero orçamento grátis
                        <ArrowRight />
                    </button>
                    <button
                        className='button-view-demo'
                    >
                        <Play />
                        Ver demonstração
                    </button>
                </span>
                <div className='container-benefits-hero'>
                    {benefits.map((benefit, index) =>
                        <span className='hero-benefit' key={index}>
                            <Check />
                            {benefit}
                        </span>
                    )}
                </div>
            </div>

            <div className='hero-window'>
                <img src={imageMockup} alt='' />
            </div>
        </Hero>
    )
}

export default HeroSection