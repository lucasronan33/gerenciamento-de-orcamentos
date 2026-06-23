import { useEffect, useState } from 'react'
import { Form } from '../../components/Form'
import { ContainerLogin, LoginContent, Main } from './styled'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../../components/Button'
import { useDispatch, useSelector } from 'react-redux'
import validator from 'validator'
import { googleLoginRequest, loginRequest } from '../../store/modules/auth/actions'
import { GoogleLogin } from '@react-oauth/google'
import { toast } from 'react-toastify'
import { ArrowRight, Eye, EyeOff, Play } from 'lucide-react'
import BudgetMockup from '../../components/BudgetMockup'

const budgets = [
    {
        basic: {
            code: 123456,
            title: 'teste 1',
            status: 'approved',
            date: '01/01/2026',
            validUntil: '01/01/2026',
        },
        client: {
            name: 'Cliente Teste'
        },
        items: [
            {},
        ],
        totals: {
            total: 32.78,
        }
    },
    {
        basic: {
            code: 123456,
            title: 'teste 3',
            status: 'producing',
            date: '01/01/2026',
            validUntil: '01/01/2026',
        },
        client: {
            name: 'Cliente Teste'
        },
        items: [
            {},
            {},
        ],
        totals: {
            total: 108.79,

        }
    },
]

export default function Login() {
    const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID
    const hasGoogleClientId = Boolean(googleClientId?.trim())

    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const dispatch = useDispatch()
    const { isLoading, isLoggedIn } = useSelector((state) => state.auth || {})
    const navigate = useNavigate()
    const location = useLocation()
    const redirectTo = location.state?.prevPath

    const handleChange = (e) => {
        const { name, value } = e.target

        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const email = validator.normalizeEmail(validator.trim(formData.email)) || ''
        const password = formData.password
        const errors = {}

        if (!validator.isEmail(email)) errors.email = 'Informe um e-mail valido.'
        if (!password) errors.password = 'Informe sua senha.'

        if (Object.keys(errors).length > 0) {
            setFormErrors(errors)
            return
        }

        setFormErrors({})
        dispatch(loginRequest({ email, password }))
    }

    useEffect(() => {
        if (isLoggedIn) {
            const nextPath = typeof redirectTo === 'string' && redirectTo.startsWith('/') ? redirectTo : '/'
            navigate(nextPath, { replace: true })
        }
    }, [isLoggedIn, navigate, redirectTo])

    return (
        <ContainerLogin>
            <div className='hero-section'>
                <div className='hero-text'>
                    <h1 className='hero-title'>
                        Organize seus orçamentos
                        <span className='hero-title-gradient'>
                            , controle seus resultados.
                        </span>
                    </h1>
                    <span className='hero-subtext'>
                        Crie orçamentos profissionais em minutos, acompanhe aprovações e tenha mais controle sobre o seu faturamento. Tudo em um só lugar, sem planilhas, sem WhatsApp bagunçado.
                    </span>

                    <span className='container-buttons-hero'>
                        <button
                            className='button-first-budget'
                        >
                            Criar meu primiero orçamento grátis
                            <ArrowRight />
                        </button>
                        <button
                            className='button-view-demo'
                        >
                            <Play />
                            Ver demonstração
                        </button>
                    </span>
                    <div className='container-benefits-hero'>

                    </div>
                </div>

                <div className='hero-window'>
                    <div className='window-topbar'>
                        <div className='container-circle-window'>
                            <div className='circle-window-topbar circle-1' />
                            <div className='circle-window-topbar circle-2' />
                            <div className='circle-window-topbar circle-3' />
                        </div>
                    </div>

                    <BudgetMockup budgets={budgets} />
                </div>
            </div>


            <Main></Main>
            <LoginContent>

                <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Login</h1>
                        <div className='logo'></div>
                    </header>
                    <Form.Root>
                        <Form.ContainerInput >
                            <Form.Label name='email' text='E-mail' />
                            <Form.Input
                                name='email'
                                typeInput='email'
                                placeholder='Digite seu e-mail para fazer login'
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <span className='field-helper error'>{formErrors.email}</span>}
                        </Form.ContainerInput>
                        <Form.ContainerInput >
                            <Form.Label name='password' text='Senha' />
                            <Form.Input
                                name='password'
                                typeInput={showPassword ? 'text' : 'password'}
                                placeholder='Digite sua senha para fazer login'
                                value={formData.password}
                                onChange={handleChange}
                                endIcon={showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                                onEndIconClick={() => setShowPassword((prevState) => !prevState)}
                                aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                title={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                            />
                            {formErrors.password && <span className='field-helper error'>{formErrors.password}</span>}
                        </Form.ContainerInput>
                        <div className='container-LinksLogin'>
                            <Link className='forgotPassword' to='forgot-password' >
                                Esqueci minha senha
                            </Link>
                        </div>

                        {hasGoogleClientId ? (
                            <GoogleLogin
                                theme='filled_blue'
                                onSuccess={(credentialResponse) => {
                                    dispatch(googleLoginRequest({
                                        credential: credentialResponse.credential
                                    }))
                                }}
                                onError={() => toast.error('Nao foi possivel iniciar o login com Google.')}
                            />
                        ) : (
                            <span className='field-helper error'>
                                Login com Google indisponivel no momento.
                            </span>
                        )}

                        <div className='container-ButtonsLogin'>
                            <Button.Root className='btn-cancel' onClick={() => navigate('/register')} >
                                Cadastre-se
                            </Button.Root>
                            <Button.Root type='submit' disabled={isLoading}>
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button.Root>
                        </div>
                    </Form.Root>

                </form>
            </LoginContent>
        </ContainerLogin>
    )
}
