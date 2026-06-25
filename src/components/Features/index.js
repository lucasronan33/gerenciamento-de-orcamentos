import React from 'react'
import { SectionHeader } from '../../pages/Login'
import { BarChart3, CopyIcon, Download, FileText, Search, Shield, Tag, Users } from 'lucide-react';
import styled from 'styled-components';
import * as color from '../../config/colors'

const features = [
    { icon: <Users />, title: "Cadastro de clientes", desc: "Centralize contato, CPF/CNPJ, endereço e histórico de cada cliente." },
    { icon: <Tag />, title: "Itens e serviços", desc: "Crie sua biblioteca de produtos e serviços com preços padronizados." },
    { icon: <FileText />, title: "Orçamentos rápidos", desc: "Crie em poucos minutos com modelos, descontos, impostos e frete." },
    { icon: <Download />, title: "PDF profissional", desc: "Cliente, itens, valores, observações e totais, pronto para enviar." },
    { icon: <Search />, title: "Pesquisa rápida", desc: "Busque por nome, e-mail ou código do orçamento em segundos." },
    { icon: <CopyIcon />, title: "Duplicação", desc: "Reaproveite orçamentos antigos com 1 clique e ganhe tempo." },
    { icon: <BarChart3 />, title: "Status e dashboard", desc: "Rascunho, enviado, aprovado, recusado, finalizado; tudo visível." },
    { icon: <Shield />, title: "Login com Google", desc: "Acesso seguro em segundos, sem precisar lembrar mais uma senha." },
];


const Features = styled.section`
    width: 100%;
    padding-block: 10vh;
    background: rgba(0,0,0,0.05);
    border-bottom: 1px solid ${color.borderDarkColor};

    .container-features{
        width: 90%;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 3vh;
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

        .container-cards-features{
            width: 80%;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
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
                border: 1px solid ${color.borderDarkColor};
                border-radius: 1rem;
                transition: 0.3s;
                
                &:hover{
                    border-color: rgba(0,210,255,0.5);
                }

                div{
                    width: fit-content;
                    padding: 0.5rem;
                    display: flex;
                    border-radius: 0.75rem;
                    background: rgba(0,210,255,0.2);
                    color: rgba(0,210,255,1);
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

export default function FeaturesSection() {
    return (
        <Features>
            <div className="container-features">
                <SectionHeader
                    eyebrow="Funcionalidades"
                    title="Tudo que você precisa, em um único lugar"
                    subtitle="Ferramentas essenciais para quem quer organização sem complexidade."
                />
                <div className="container-cards-features">
                    {features.map((f) => (
                        <div key={f.title} className='card'>
                            <div>{f.icon}</div>
                            <h3>{f.title}</h3>
                            <p>{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Features>
    )
}
