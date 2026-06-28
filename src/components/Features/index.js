import { motion } from 'framer-motion'
import { BarChart3, CopyIcon, Download, FileText, Search, Shield, Tag, Users } from 'lucide-react'
import { SectionHeader } from '../../pages/Landing'

const features = [
    { icon: <Users />, title: 'Cadastro de clientes', desc: 'Centralize contato, CPF/CNPJ, endereco e historico de cada cliente.' },
    { icon: <Tag />, title: 'Itens e servicos', desc: 'Crie sua biblioteca de produtos e servicos com precos padronizados.' },
    { icon: <FileText />, title: 'Orcamentos rapidos', desc: 'Crie em poucos minutos com modelos, descontos, impostos e frete.' },
    { icon: <Download />, title: 'PDF profissional', desc: 'Cliente, itens, valores, observacoes e totais, pronto para enviar.' },
    { icon: <Search />, title: 'Pesquisa rapida', desc: 'Busque por nome, e-mail ou codigo do orçamento em segundos.' },
    { icon: <CopyIcon />, title: 'Duplicacao', desc: 'Reaproveite orçamentos antigos com 1 clique e ganhe tempo.' },
    { icon: <BarChart3 />, title: 'Status e dashboard', desc: 'Rascunho, enviado, aprovado, recusado, finalizado; tudo visivel.' },
    { icon: <Shield />, title: 'Login com Google', desc: 'Acesso seguro em segundos, sem precisar lembrar mais uma senha.' },
]

export default function FeaturesSection() {
    return (
        <section className='w-full border-b border-[rgba(35,47,53,1)] bg-black/5 py-20'>
            <div className='mx-auto flex w-[90%] flex-col items-center justify-center gap-8'>
                <SectionHeader
                    eyebrow='Funcionalidades'
                    title='Tudo que voce precisa, em um unico lugar'
                    subtitle='Ferramentas essenciais para quem quer organizacao sem complexidade.'
                />
                <div className='grid w-full max-w-6xl grid-cols-1 justify-center gap-4 sm:grid-cols-2 xl:grid-cols-4'>
                    {features.map((f, index) => (
                        <motion.article
                            key={f.title}
                            initial={{ opacity: 0, y: 22 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.25 }}
                            transition={{ delay: index * 0.05, duration: 0.42, ease: 'easeOut' }}
                            whileHover={{ y: -5 }}
                            className='flex min-h-16 flex-col gap-2 self-stretch rounded-2xl border border-[rgba(35,47,53,1)] bg-linear-to-b from-[rgba(15,25,35,0.8)] to-[rgba(5,15,25,0.5)] p-8 transition duration-300 hover:border-[rgba(0,210,255,0.5)]'
                        >
                            <div className='flex w-fit rounded-xl bg-[rgba(0,210,255,0.2)] p-2 text-[rgba(0,210,255,1)]'>
                                {f.icon}
                            </div>
                            <h3 className='pt-3 text-lg font-bold'>{f.title}</h3>
                            <p className='text-sm text-[rgba(230,230,255,0.6)]'>{f.desc}</p>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    )
}
