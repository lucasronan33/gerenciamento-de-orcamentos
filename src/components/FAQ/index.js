import React, { useState } from 'react'
import { SectionHeader } from '../../pages/Login';
import { ChevronDown } from 'lucide-react';

const faqs = [
    { q: "Preciso de cartão de crédito para testar?", a: "Não. O teste de 14 dias é totalmente livre. Você só decide pagar se quiser continuar após o período." },
    { q: "Como funciona o teste grátis de 14 dias?", a: "Você cria sua conta com Google e tem acesso a todas as funcionalidades por 14 dias. Sem limites, sem pegadinhas." },
    { q: "Posso cancelar quando quiser?", a: "Sim. Não há fidelidade. Você cancela com um clique e mantém o acesso até o fim do período pago." },
    { q: "Funciona no celular?", a: "Sim, o ORCA é 100% responsivo. Você acessa pelo navegador do celular, tablet ou computador." },
    { q: "Meus dados ficam seguros?", a: "Sim. Os dados são armazenados em servidores com criptografia e backups automáticos. Apenas você acessa sua conta." },
    { q: "Consigo gerar PDF dos orçamentos?", a: "Sim. Cada orçamento gera um PDF profissional com seus dados, do cliente, itens, valores, observações e totais." },
    { q: "Dá para enviar pelo WhatsApp?", a: "Sim. Depois de gerar o PDF, você compartilha por WhatsApp, e-mail ou qualquer canal que preferir." },
    { q: "O ORCA serve para MEI e autônomo?", a: "Sim — esse é exatamente o público para o qual o ORCA foi desenhado. Simples, sem complexidade de ERP." },
    { q: "Tem limite de orçamentos ou clientes?", a: "Não. Tanto orçamentos quanto clientes são ilimitados em qualquer plano." },
    { q: "Vocês emitem nota fiscal do pagamento?", a: "Sim. Você recebe nota fiscal eletrônica de todas as cobranças do plano." },
    { q: "Qual a diferença para Excel ou WhatsApp?", a: "Você ganha histórico, busca, status, PDF padronizado, dashboard financeiro e tempo. É a diferença entre improvisar e profissionalizar." },
    { q: "Posso migrar meus orçamentos antigos?", a: "Sim. Você pode cadastrar clientes e criar seus modelos rapidamente. Em breve teremos importação por planilha." },
];
export function FAQSection() {
    return (
        <section id="faq" className="py-20 sm:py-28">
            <div className="mx-auto max-w-4xl px-4 sm:px-6">
                <SectionHeader
                    eyebrow="FAQ"
                    title="Perguntas frequentes"
                    subtitle="As dúvidas mais comuns de quem está começando com o ORCA."
                />
                <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface/40">
                    {faqs.map((f, i) => <FaqItem key={i} q={f.q} a={f.a} />)}
                </div>
            </div>
        </section>
    );
}

function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="px-5 sm:px-6">
            <button onClick={() => setOpen(!open)} className="w-full py-5 flex items-center justify-between text-left gap-4">
                <span className="font-semibold text-sm sm:text-base">{q}</span>
                <ChevronDown className={`h-5 w-5 text-muted-foreground shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>
            {open && <p className="pb-5 text-sm text-muted-foreground -mt-1">{a}</p>}
        </div>
    );
}