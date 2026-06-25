import React from 'react'
import styled from 'styled-components';
import { SectionHeader } from '../../pages/Login';
import { Check, CheckCircle2, X, XCircle } from 'lucide-react';
import * as color from '../../config/colors'

const before = [
    "Conversas de orçamento perdidas no WhatsApp",
    "Planilhas Excel quebradas e duplicadas",
    "Anotações em papel e agenda",
    "Sem histórico de quem aprovou ou recusou",
    "Horas refazendo o mesmo orçamento",
    "PDFs improvisados, sem identidade"
];
const after = [
    "Todos os orçamentos num único lugar, pesquisáveis",
    "Cadastro de clientes e itens reutilizáveis",
    "Geração de PDF profissional em 1 clique",
    "Status claro: rascunho, enviado, aprovado, recusado",
    "Duplique orçamentos antigos em segundos",
    "Dashboard financeiro sempre atualizado"
];

const Comparison = styled.section`
    width: 100%;
    border-bottom: 1px solid ${color.borderDarkColor};

    .container-comparison{
        margin: auto;
        display: flex;
        padding-block: 7vh 12vh;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .header{
            text-align: center;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            gap: 0.75rem;
            
            span{
                font-size: .9em;
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: .075em;
                color: rgba(0,210,255,1);
            }
            h2{
                font-size: 2.9rem;
                font-weight: 800;
            }
            p{
                max-width: 47rem;
                line-height: 1.5;
                color: rgba(230,230,255,0.6);
            }
        }

        .container-table-comparison{
            width: 90%;
            display: flex;
            justify-content: center;
            flex-direction: row;
            gap: 5vh;

            .table-comparison{
                min-width: 350px;
                padding: 5vh 5vh;
                border: 1px solid;
                border-radius: 3vh;
                
                div{
                    display: flex;
                    padding-block: 1vh 3vh;
                    align-items: center;
                    gap: 1vh;
                    font-weight: 750;
                }

                ul{
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    gap: 2vh;

                    li{
                        width: 100%;
                        display: flex;
                        align-items: start;
                        gap: 1vh;

                        svg{
                            scale: 0.75;
                        }
                    }
                }
                
                &.table-before{
                    border-color: rgba(255,70,70,0.5);
                    background-color: rgba(255,70,70,0.05);
                    color: rgba(255,70,70,1);

                    p{
                        color: rgba(230,230,255,0.6);
                    }
                }
                
                &.table-after{
                    border-color: rgba(0,210,255,0.5);
                    background-color: rgba(0,210,255,0.1);
                    color: rgba(0,210,255,1);
                    box-shadow: 0 0 2vw rgba(0,210,255,0.5);

                    p{
                        color: white;
                    }
                }
            }
        }
    }

`

export const ComparisonSection = () => {
    return (
        <Comparison>
            <div className="container-comparison">
                <SectionHeader
                    eyebrow="Antes vs. depois"
                    title="Método tradicional vs. ORCA"
                    subtitle="A diferença que faz para sua semana, seu caixa e sua tranquilidade."
                />
                <div className="container-table-comparison table-comparison">
                    <div className="table-before table-comparison">
                        <div>
                            <XCircle /> Sem ORCA
                        </div>
                        <ul>
                            {before.map((b) => (
                                <li key={b}>
                                    <X />
                                    <p>
                                        {b}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="table-after table-comparison">
                        <div>
                            <CheckCircle2 className="h-5 w-5" /> Com ORCA
                        </div>
                        <ul >
                            {after.map((a) => (
                                <li key={a} >
                                    <Check />
                                    <p>
                                        {a}
                                    </p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Comparison>
    )
}
