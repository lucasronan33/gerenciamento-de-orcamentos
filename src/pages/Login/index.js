import { GoogleLogin } from '@react-oauth/google'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import { Button } from '../../components/Button'
import { Form } from '../../components/Form'
import { googleLoginRequest, loginRequest } from '../../store/modules/auth/actions'
import { ContainerLogin, LoginContent, Main } from './styled'
import HeroSection from '../../components/HeroSection'
import PainsSection from '../../components/Pains'
import BenefitsSection from '../../components/Benefits'
import { ComparisonSection } from '../../components/Comparison'

export function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <div className="header">
            <span>{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
        </div>
    );
}

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
            <HeroSection />
            <div className='banner-footer-hero'>
                Usado por autônomos, MEIs, marcenarias, serralherias, comunicação visual e assistências técnicas
            </div>
            <PainsSection />
            <BenefitsSection />

            <ComparisonSection />

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
