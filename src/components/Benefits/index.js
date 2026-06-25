import { FileText, Shield, Smartphone, Sparkles, TrendingUp, Zap } from 'lucide-react';
import styled from 'styled-components';
import { borderDarkColor } from '../../config/colors';

const benefits = [
    { icon: <Zap />, title: "Economize horas toda semana", desc: "Modelos prontos, duplicação em 1 clique e geração de PDF instantânea." },
    { icon: <Shield />, title: "Tudo organizado em um só lugar", desc: "Clientes, itens, orçamentos e histórico — pesquisáveis a qualquer momento." },
    { icon: <TrendingUp />, title: "Controle financeiro de verdade", desc: "Veja receita, valores a receber e taxa de aprovação em tempo real." },
    { icon: <FileText />, title: "Histórico completo", desc: "Nunca mais perca um orçamento. Tudo registrado com data e status." },
    { icon: <Sparkles />, title: "Mais profissionalismo", desc: "PDFs com sua identidade que transmitem confiança e fecham mais." },
    { icon: <Smartphone />, title: "Acesse de qualquer lugar", desc: "Plataforma 100% responsiva: notebook, tablet ou celular." },
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
const Benefits = styled.section`
    width: 100%;
    min-height: 100dvh;
    padding-block: 10vh;
    background: rgba(0,0,0,0.05);
    border-bottom: 1px solid ${borderDarkColor};

    .container-benefits{
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

        .container-cards-benefits{
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

const BenefitsSection = () => {
    return (
        <Benefits>
            <div className="container-benefits">
                <SectionHeader
                    eyebrow="A transformação"
                    title="Da bagunça ao controle, em poucos dias"
                    subtitle="O ORCA foi feito para pequenos negócios e prestadores que precisam de organização sem burocracia."
                />
                <div className="container-cards-benefits">
                    {benefits.map((p) => (
                        <div key={p.title} className='card'>
                            <div>{p.icon}</div>
                            <h3>{p.title}</h3>
                            <p>{p.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </Benefits>
    )
}

export default BenefitsSection