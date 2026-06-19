import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import {
    BriefcaseBusiness,
    Building2,
    CalendarDays,
    FileText,
    Heart,
    Info,
    Mail,
    MapPin,
    PackageOpen,
    Phone,
    Printer,
    ShieldCheck,
    Truck,
    UserRound,
    WalletCards,
    X,
} from 'lucide-react';
import { useBudget } from '../../context/Budget';
import { isEmptyObject, maskCpfCnpj, maskPhone, maskZipCode } from '../../utils/masks';
import './style.css'
import generatePDF from 'react-to-pdf';
import { calcValueDiscount, calcValueTaxes } from '../../utils/documents';
import { budgetStatus } from '../../utils/budget';
import { StatusBudget } from '../Cards/styled';

const shippingLabels = {
    SF: 'Sem frete',
    CIF: 'CIF',
    FOB: 'FOB',
    custom: 'Personalizado',
}

const paymentMethod = [
    {
        value: 'at sight',
        text: 'À vista',
    },
    {
        value: 'ticket',
        text: 'Boleto',
    },
    {
        value: 'pix',
        text: 'Pix',
    },
    {
        value: 'debit card',
        text: 'Cartão de Débito',
    },
    {
        value: 'credit card',
        text: 'Cartão de Crédito',
    },
]

const statusClasses = {
    rascunho: 'sketchStatus',
    enviado: 'sentStatus',
    aprovado: 'approvedStatus',
    produzindo: 'producingStatus',
    rejeitado: 'rejectedStatus',
    finalizado: 'finishedStatus',
}

function formatDate(value) {
    if (!value) return '-'
    return String(value).replaceAll('-', '/')
}

function formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(Number(value) || 0)
}

function formatQuantity(value) {
    return new Intl.NumberFormat('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(Number(value) || 0)
}

function getAddressLine(address = {}) {
    const street = [address.street, address.number].filter(Boolean).join(', ')
    const cityState = [address.city, address.state].filter(Boolean).join(' / ')
    return [street, cityState, maskZipCode(address.zipCode || '')].filter(Boolean).join(' - ')
}

function getItemTotal(item) {
    if (Number(item.total) > 0) return Number(item.total)

    const quantity = Number(item.quantity) || 0
    const unityPrice = Number(item.unityPrice) || 0
    const taxes = Number(item.taxes) || 0

    return quantity * unityPrice * ((taxes / 100) + 1)
}

function InfoLine({ label, value }) {
    return (
        <div className='budget-info-line'>
            <strong>{label}</strong>
            <span>{value || '-'}</span>
        </div>
    )
}

function SectionTitle({ icon: Icon, children }) {
    return (
        <h2 className='budget-section-title'>
            <Icon size={22} />
            {children}
        </h2>
    )
}

export function ViewBudget() {
    const { budget, setBudget, initialState, setViewBudget } = useBudget()
    const { user = {} } = useSelector(state => state.auth || {})
    const targetRef = useRef()

    const handleCancel = () => {
        setViewBudget(false)
        setBudget(initialState)
    }

    const basic = budget.basic || {}
    const client = budget.client || {}
    const userAddress = getAddressLine(user.address)
    const clientAddress = client.address || {}
    const items = budget.items || []
    const conditions = budget.conditions || {}
    const totals = budget.totals || {}
    const itemsSubtotal = items.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0
        const unityPrice = Number(item.unityPrice) || Number(item.total) || 0
        return sum + (quantity * unityPrice)
    }, 0)
    const subtotal = Number(totals.subtotal) || itemsSubtotal
    const taxes = Number(totals.taxes) || 0
    const discount = Number(totals.discount) || 0
    const shipping = Number(totals.shipping) || 0
    const calculatedTotal = items.reduce((sum, item) => sum + getItemTotal(item), 0)
    const total = Number(totals.total) || calculatedTotal + shipping - discount + taxes

    const status = budgetStatus.reduce((obj, item) => {
        if (item.value === budget.basic.status) obj = item.text
        return obj
    }, {})

    const paymentMethodBudget = paymentMethod.reduce((obj, item) => {
        if (item.value === budget.conditions.paymentMethod) obj = item.text
        return obj
    }, {})

    return (
        <div className="span-viewBudget" onMouseDown={handleCancel}>
            <button className='budget-close-button' type='button' onClick={handleCancel} aria-label='Fechar orçamento'
                onMouseDown={(e) => e.stopPropagation()}>
                <X size={20} />
            </button>
            <button
                className='budget-print-button'
                type='button'
                onClick={() => generatePDF(targetRef, {
                    filename: `${basic.code}_${basic.title}_${client.name}.pdf`
                })}
                aria-label='Imprimir orçamento'
                onMouseDown={(e) => e.stopPropagation()}>
                <Printer size={20} />
            </button>
            <article
                ref={targetRef}
                className="container-viewBudget"
                onMouseDown={(e) => e.stopPropagation()}>

                <header className='budget-header'>
                    <div className='budget-company'>
                        <div className='budget-logo'>
                            <Building2 size={42} />
                        </div>
                        <div>
                            <h1>{user.enterpriseName || user.name || 'Sua empresa'}</h1>
                            {user.slogan &&
                                (<p>{user.slogan}</p>)
                            }
                        </div>
                    </div>

                    <div className='budget-title-block'>
                        <strong>{budget.basic?.title}</strong>
                        <span>{budget.basic?.code || '00000-000'}</span>
                    </div>
                </header>

                <section className='budget-top-grid'>
                    <div className='budget-contact-list'>
                        <p><Phone size={16} />{maskPhone(user.phone || '') || '-'}</p>
                        <p><Phone size={16} />WhatsApp: {maskPhone(user.whatsapp || '') || '-'}</p>
                        <p><Mail size={16} />{user.email || '-'}</p>
                        <p><FileText size={16} />{maskCpfCnpj(user.cpf_cnpj || '') || '-'}</p>
                        <p><MapPin size={16} />{userAddress || '-'}</p>
                    </div>

                    <div className='budget-meta'>
                        <InfoLine label='Data:' value={formatDate(budget.basic?.date)} />
                        <InfoLine label='Hora:' value={budget.basic?.time} />
                        <InfoLine label='Validade da proposta:' value={formatDate(budget.basic?.validUntil)} />
                        <InfoLine label='Status:' value={
                            <StatusBudget className={`${!isEmptyObject(status)
                                ? statusClasses[status.toLowerCase()]
                                : ''} viewBudget-status`} >
                                {!isEmptyObject(status) ? status : ''}
                            </StatusBudget>
                        } />
                        <InfoLine label='Responsável:' value={user.name} />
                        <InfoLine label='E-mail:' value={user.email} />
                    </div>
                </section>

                <section className='budget-box'>
                    <SectionTitle icon={UserRound}>Dados do Cliente</SectionTitle>
                    <div className='budget-client-grid'>
                        <div>
                            <InfoLine label='Nome / Razão Social:' value={client.name} />
                            <InfoLine label='CPF / CNPJ:' value={maskCpfCnpj(client.cpf_cnpj || '')} />
                            <InfoLine label='Telefone:' value={maskPhone(client.phone || '')} />
                            <InfoLine label='WhatsApp:' value={maskPhone(client.whatsapp || '')} />
                            <InfoLine label='E-mail:' value={client.email} />
                        </div>
                        <div>
                            <InfoLine label='Endereço:' value={clientAddress.street} />
                            <InfoLine label='Número:' value={clientAddress.number} />
                            <InfoLine label='Cidade / Estado:' value={[clientAddress.city, clientAddress.state].filter(Boolean).join(' / ')} />
                            <InfoLine label='CEP:' value={maskZipCode(clientAddress.zipCode || '')} />
                        </div>
                    </div>
                </section>

                <section>
                    <SectionTitle icon={PackageOpen}>Itens do Orçamento</SectionTitle>
                    <div className='budget-table-wrap'>
                        <table className='budget-items-table'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Código</th>
                                    <th>Descrição do item</th>
                                    <th>Categoria</th>
                                    <th>Unid.</th>
                                    <th>Qtd.</th>
                                    <th>Valor unit.</th>
                                    <th>Impostos</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length > 0 ? items.map((item, index) => (
                                    <tr key={item._id + index || item.code + index || index}>
                                        <td>{index + 1}</td>
                                        <td>{item.code || '-'}</td>
                                        <td>
                                            <strong>{item.name}</strong>
                                            {item.obsItem && <small>{item.obsItem}</small>}
                                        </td>
                                        <td>{item.category || '-'}</td>
                                        <td>{item.unity || '-'}</td>
                                        <td>{formatQuantity(item.quantity)}</td>
                                        <td>{formatCurrency(item.unityPrice || item.total)}</td>
                                        <td>{Number(item.taxes) > 0 ? `${formatQuantity(item.taxes)}%` : '-'}</td>
                                        <td>{formatCurrency(getItemTotal(item))}</td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan='9' className='budget-empty-row'>Nenhum item informado.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </section>

                <section className='budget-summary-grid'>
                    <div className='budget-box budget-notes'>
                        <SectionTitle icon={FileText}>Observações dos Itens</SectionTitle>
                        <p>{conditions.obsBudget || 'Observações gerais sobre os itens deste orçamento.'}</p>
                    </div>

                    <div className='budget-totals'>
                        <InfoLine label='Subtotal:' value={formatCurrency(subtotal)} />
                        <InfoLine label='Impostos:' value={
                            Number(taxes) > 0
                                ? `(${taxes}%) ${formatCurrency(calcValueTaxes(budget, subtotal))}`
                                : formatCurrency(calcValueTaxes(budget, subtotal))
                        } />
                        <InfoLine label='Desconto:' value={
                            Number(discount) > 0
                                ? `(${discount}%) ${formatCurrency(calcValueDiscount(budget, subtotal))}`
                                : formatCurrency(calcValueDiscount(budget, subtotal))
                        } />
                        <InfoLine label={`Frete (Tipo: ${shippingLabels[totals.shippingType] || totals.shippingType || 'SF'}):`} value={formatCurrency(shipping)} />
                        <div className='budget-total-line'>
                            <strong>Total:</strong>
                            <strong>{formatCurrency(total)}</strong>
                        </div>
                    </div>
                </section>

                <section className='budget-box budget-conditions'>
                    <div>
                        <SectionTitle icon={BriefcaseBusiness}>Condições Comerciais</SectionTitle>
                        <InfoLine label={<><WalletCards size={16} /> Forma de Pagamento:</>} value={paymentMethodBudget} />
                        <InfoLine label={<><CalendarDays size={16} /> Condições de Pagamento:</>} value={conditions.paymentConditions} />
                        <InfoLine label={<><Truck size={16} /> Prazo de Entrega:</>} value={conditions.shippingTime} />
                        <InfoLine label={<><MapPin size={16} /> Tipo do Frete:</>} value={shippingLabels[totals.shippingType] || totals.shippingType} />
                        <InfoLine label={<><ShieldCheck size={16} /> Garantia:</>} value={conditions.warranty} />
                    </div>

                    <div className='budget-text-conditions'>
                        <div>
                            <h3><Info size={20} /> Observações do Orçamento:</h3>
                            <p>{conditions.obsBudget || 'Prazo de validade da proposta conforme informado acima. Valores sujeitos a alteração sem aviso prévio.'}</p>
                        </div>
                        <div>
                            <h3><FileText size={20} /> Termos e Condições:</h3>
                            <p>{conditions.termsConditions || 'Ao aceitar este orçamento, o cliente concorda com os termos e condições aqui descritos.'}</p>
                        </div>
                    </div>
                </section>

                <section className='budget-signatures'>
                    <div>
                        <div className='budget-signature-line' />
                        <strong>{user.name || 'Responsável'}</strong>
                        <span>Responsável</span>
                        <span>{user.email || ''}</span>
                    </div>
                    <div>
                        <p>De acordo:</p>
                        <div className='budget-signature-line' />
                        <strong>Assinatura do Cliente</strong>
                        <span>Data: ____/____/________</span>
                    </div>
                </section>

                <footer className='budget-footer'>
                    <strong><Heart size={18} fill='currentColor' /> Obrigado pela confiança!</strong>
                    <span>Estamos à disposição para esclarecer qualquer dúvida.</span>
                </footer>
            </article>
        </div>
    )
}
