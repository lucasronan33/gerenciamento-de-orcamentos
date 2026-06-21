import styled from 'styled-components';
import * as color from '../../config/colors'
import logo from '../../images/logo.svg'

export const ContainerMockup = styled.div`
    width: 100%;
    height: 100%;

    main{
        width: 90%;
        height: 100%;
        padding-block: 0 2rem;
        margin: 0 auto;

        header{
            width: 100%;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;

            .header-mockup{
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                row-gap: 1rem;
                justify-content: space-between;
                padding-block: 2rem;

                .container-logo-mockup{
                    min-width: 75%;
                    display: flex;
                    justify-content: start;
                    gap: 1vh;
                    flex-grow: 1;

                    .logo-mockup{
                        width: 3rem;
                        height: 100%;
                        background-image: url(${logo});
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                    .logo-mockup+span{
                        display: flex;
                        flex-direction: column;
                        text-align: start;
                        font-size: small;
                        color: ${color.secondaryTextDarkColor};

                        span{
                            font-size: 1.25rem;
                            font-weight: bold;
                            color: white;
                        }
                    }
                }

                button{
                    border-radius: 2rem;
                    font-size: small;
                    flex-grow: 1;
                    padding: 0.5rem 1rem;
                }
            }

            .container-cards-header{
                width: 100%;
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
                flex-direction: row;

            }
        }

        .container-filter-mockup{
            width: 100%;
            display: flex;
            gap: 2rem;
            padding-block: 1.5rem;

            label{
                display: flex;
                align-items: center;
                gap: 1rem;
                font-size: small;
                padding: 0.5rem 1rem;
                border-radius: 1rem;
                border: 1px solid ${color.borderDarkColor};

                &.search-mockup{
                    color: ${color.secondaryTextDarkColor};
                }
            }
        }

        content{
            width: 100%;
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;

            .container-budget-mockup{
                min-width: 200px;
                display: flex;
                flex: 1;
                flex-wrap: wrap;
                padding: 1rem;
                border-radius: 1rem;
                border: 1px solid ${color.borderDarkColor};
            }
        }
    }
`

export const CardHeaderMockup = styled.div`
    min-width: 100px;
    display: flex;
    align-items: start;
    flex-direction: column;
    flex-grow: 1;
    padding: 2vh;
    border: 1px solid ${color.borderDarkColor};
    border-radius: 1rem;

    .background-icon{
        position: relative;
        padding-block: 1vh;
        display: flex;
        place-items: center;
        place-content: start;
    }
    .background-icon svg{
        margin-left: 0.75vh;
    }
    .background-icon svg+div {
        padding: 2vh;
        offset-anchor: auto;
        position: absolute;
        border-radius: 1vh;
        background: ${(props) => props.$color2};
        opacity: 0.15;
    }

    p{
        font-size: large;
        font-weight: bolder;
        color: ${(props) => props.$color2};
    }
    .subtitle-card{
        color: slategray;
        font-weight: normal;
        font-size: 1.5vh;
    }
    
    svg{
        color: ${(props) => props.$color1}
    }
`