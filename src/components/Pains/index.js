import { BarChart3, Clock, FileSpreadsheet, MessageSquareText, NotebookPen, XCircle } from 'lucide-react';
import React from 'react';
import styled from 'styled-components';
import { blueDocument, borderDarkColor } from '../../config/colors';

const pains = [
    { icon: <MessageSquareText />, title: "Orçamentos perdidos", desc: "Conversas de WhatsApp engolem propostas e clientes somem sem retorno." },
    { icon: <FileSpreadsheet />, title: "Planilhas desorganizadas", desc: "Excel fora de controle, fórmulas quebradas e arquivos duplicados." },
    { icon: <NotebookPen />, title: "Papel e agenda", desc: "Anotações soltas, rasuras e zero histórico do que foi enviado." },
    { icon: <Clock />, title: "Tempo desperdiçado", desc: "Você gasta horas refazendo o mesmo orçamento toda semana." },
    { icon: <XCircle />, title: "Falta de acompanhamento", desc: "Sem saber quem aprovou, recusou ou está esperando resposta." },
    { icon: <BarChart3 />, title: "Sem visão financeira", desc: "Quanto você tem a receber? Quanto fechou esse mês? Difícil saber." },
]

function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <div className="header">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
}
const Pain = styled.section`
    width: 100%;
    min-height: 100dvh;
    padding-block: 10vh;
    background: rgba(0,0,0,0.05);
    border-bottom: 1px solid ${borderDarkColor};

    .container-pains{
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 10vh;
        align-items: center;
        justify-content: center;

        .header{
            text-align: center;
            margin: auto;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            gap: 1rem;
            
            span{
                font-size: .9em;
                text-transform: uppercase;
                font-weight: 700;
                letter-spacing: .075em;
                color: ${blueDocument};
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

        .container-cards-pains{
            width: 80%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px,1fr));
            gap: 1rem;
            justify-content: center;
            align-items: center;

            .card{
                min-height: 4rem;
                align-self: stretch;
                padding: 2rem 2rem;
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
                background: linear-gradient(rgba(15,25,35,0.8), rgba(5,15,25, 0.5));
                border: 1px solid ${borderDarkColor};
                border-radius: 1rem;
                transition: 0.3s;
                
                &:hover{
                    border-color: rgba(255,70,70,0.5);
                }

                div{
                    width: fit-content;
                    padding: 0.5rem;
                    display: flex;
                    border-radius: 0.75rem;
                    background: rgba(255,70,70,0.2);
                    color: rgba(255,70,70,1);
                }

                h3{
                    padding-top: 0.75rem;
                }

                p{
                    font-size: 0.9em;
                    color: rgba(230,230,255,0.6);
                }
            }
        }
    }
`

const PainsSection = () => {
    return (
        <Pain>
            <div className="container-pains">
                <SectionHeader
                    eyebrow="O problema"
                    title="Você reconhece essa rotina?"
                    subtitle="A maioria dos prestadores de serviço gerencia orçamentos com ferramentas que não foram feitas para isso. O resultado é previsível."
                />
                <div className="container-cards-pains">
                    {pains.map((p) => (
                        <div key={p.title} className="card rounded-xl p-6 transition hover:border-destructive/30">
                            <div className="h-10 w-10 grid place-items-center rounded-lg bg-destructive/10 text-destructive">{p.icon}</div>
                            <h3 className="mt-4 font-semibold">{p.title}</h3>
                            <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Pain>
    )
}

export default PainsSection