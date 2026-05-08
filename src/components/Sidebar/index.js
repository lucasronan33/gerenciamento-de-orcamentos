import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { CircleHelp, Info, LogOut, Menu, PackagePlus, Settings, X } from 'lucide-react'
import { logoutRequest } from '../../store/modules/auth/actions'
import './style.css'

const menuSections = [
    {
        title: 'Cadastros',
        items: [
            {
                label: 'Cadastro de itens predefinidos',
                icon: PackagePlus,
                path: '/itens-predefinidos',
            },
        ],
    },
    {
        title: 'Configuracoes',
        items: [
            {
                label: 'Configuracoes',
                icon: Settings,
                path: '/configuracoes',
            },
            {
                label: 'Sobre Nos',
                icon: Info,
                path: '/sobre-nos',
            },
            {
                label: 'FAQ',
                icon: CircleHelp,
                path: '/faq',
            },
        ],
    },
]

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleNavigate = (path) => {
        navigate(path)
        setIsOpen(false)
    }

    const handleLogout = () => {
        dispatch(logoutRequest())
        setIsOpen(false)
        navigate('/login')
    }

    return (
        <>
            <button
                className='sidebar-menu-button'
                type='button'
                aria-label='Abrir menu'
                onClick={() => setIsOpen(true)}
            >
                <Menu />
            </button>

            {isOpen && (
                <button
                    className='sidebar-overlay'
                    type='button'
                    aria-label='Fechar menu'
                    onClick={() => setIsOpen(false)}
                />
            )}

            <aside className={`sidebar ${isOpen ? 'is-open' : ''}`} aria-hidden={!isOpen}>
                <div className='sidebar-header'>
                    <div>
                        <strong>Menu</strong>
                        <span>Gerenciamento</span>
                    </div>
                    <button
                        className='sidebar-close-button'
                        type='button'
                        aria-label='Fechar menu'
                        onClick={() => setIsOpen(false)}
                    >
                        <X />
                    </button>
                </div>

                <nav className='sidebar-nav'>
                    {menuSections.map((section) => (
                        <section className='sidebar-section' key={section.title}>
                            <h2>{section.title}</h2>
                            {section.items.map((item) => {
                                const Icon = item.icon

                                return (
                                    <button
                                        className='sidebar-item'
                                        type='button'
                                        key={item.label}
                                        onClick={() => handleNavigate(item.path)}
                                    >
                                        <Icon />
                                        <span>{item.label}</span>
                                    </button>
                                )
                            })}
                        </section>
                    ))}

                    <section className='sidebar-section'>
                        <button className='sidebar-item sidebar-item-danger' type='button' onClick={handleLogout}>
                            <LogOut />
                            <span>Logout</span>
                        </button>
                    </section>
                </nav>
            </aside>
        </>
    )
}
