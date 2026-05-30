import styled from 'styled-components';
import * as color from '../../config/colors';

export const ContainerCardBudget = styled.div`
    background: ${color.secondaryDarkColor};
    padding: 3vh;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-radius: 1.5vh;
    border: 1px solid ${color.borderDarkColor};

    &:hover{
        box-shadow: -0.2vh 0.2vh 2vh ${color.blueHover};
    }

    *{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap
    }

    .clientName{
        padding-bottom: 3vh;
    }
`

export const DivTitle = styled.div`
    width: 100%;
    justify-content: space-between;
`
export const StatusBudget = styled.div`
    padding: 5px 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    font-size: small;

    &.sentStatus{
        background: ${color.sentColor};
        border-color: ${color.sentDarkColor};
        color: ${color.sentDarkColor};
    }

    &.approvedStatus{
        background: ${color.approvedColor};
        border-color: ${color.approvedDarkColor};
        color: ${color.approvedDarkColor};
    }

    &.rejectedStatus{
        background: ${color.rejectedColor};
        border-color: ${color.rejectedDarkColor};
        color: ${color.rejectedDarkColor};
    }

    &.finishedStatus{
        background: ${color.finishedColor};
        border-color: ${color.finishedDarkColor};
        color: ${color.finishedDarkColor};
    }
`

export const InfoCardBudget = styled.div`
    width: 100%;
    padding-block: 1vh;
    row-gap: 1vh;

    div{
        width: 100%;
        justify-content: space-between;
    
        h3{
            padding-bottom: 2vh;
        }
    }

    a{
        div{
            padding: 1.5vh;
            border: 1px solid #ccc;
            border-radius: 10px;
            gap: 1vh;

            svg{
                max-height: 100%;
            }
        }
    }
`

export const CardIcons = styled.div`

    width: 100%;
    justify-content: space-between;
    gap: 1vh;

    &.icons-clients-list{
        height: 0;
        scale: 0;
        width: 20vh;
        flex-grow: 0;
        transition: 300ms;  
    }

    .card-icon{
        align-items: center;
        justify-content: center;
        transition: 300ms;  
    }
    .card-icon:hover{
        background: ${color.blueHover};
        box-shadow: inset 0.1vh 0.3vh 0.5vh ${color.primaryDarkColor};
        border-color: ${color.blueHover};
    }

    .trash-icon{
        background: rgba(70, 20, 20, 0.3) !important;
        border-color: rgba(255, 0, 0, 0.2) !important;
    }

    .trash-icon:hover{
        background: #ff8a7d !important;
        box-shadow: inset 0.1vh 0.3vh 0.5vh #c23e2f;

        svg{
            color: #c23e2f;
        }
    }

    .viewOrc{
        width: 45%;
    }

    .links,.viewOrc{
        background: ${color.primaryDarkColor};
        flex-grow: 1;
        padding: 1vh;
        border: 1px solid ${color.borderDarkColor};
        border-radius: 10px;
        gap: 1vh;

        .trashIco{
            color: darkred;
        }

        svg{
            max-width: 100%;
            max-height: 100%;
        }
            
    }
`

export const ConfirmDeleteModal = styled.div`
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3vh;

    .confirm-delete-overlay{
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        padding: 0;
        border-radius: 0;
        background: rgba(0, 0, 0, 0.35);
    }

    .confirm-delete-content{
        position: relative;
        width: min(100%, 420px);
        padding: 3vh;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 2vh;
        border-radius: 1.5vh;
        background: #fff;
        box-shadow: 0 2vh 4vh rgba(0, 0, 0, 0.2);
    }

    .confirm-delete-content h2,
    .confirm-delete-content p{
        justify-content: flex-start;
        text-align: left;
    }

    .confirm-delete-content p{
        color: #555;
        line-height: 1.5;
    }

    .confirm-delete-content strong{
        display: inline;
        color: #222;
    }

    .confirm-delete-actions{
        display: flex;
        justify-content: flex-end;
        gap: 1.5vh;
    }

    .btn-delete{
        background: #e74d3c;
    }

    @media (width < 500px){
        .confirm-delete-actions{
            flex-direction: column;
        }

        .confirm-delete-actions button{
            width: 100%;
        }
    }
`
