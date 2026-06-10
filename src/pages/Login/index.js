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
import { Eye, EyeOff } from 'lucide-react'

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
            <Main></Main>
            <LoginContent>

                <form onSubmit={handleSubmit}>
                    <header>
                        <h1>Login</h1>
                        <svg className='logo' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 406.9 349.07"><path className="cls-1" d="M368.46,209.77c-12.53-27.15-28.09-50.27-41.79-63.66-20.38-21.46-47.66-37.52-78.79-45.41-8-34.84-31.16-100.7-44-100.7s-36,65.86-44,100.7A165.37,165.37,0,0,0,87,140.18C71.89,151.79,53.09,178,38.45,209.77c-20.76,45-49.34,136.1-34.2,139.21,7.94,1.63,31.31-19.78,54.75-47a147.86,147.86,0,0,0,41,47.07c-7.6-8.29-11.87-17.62-11.87-27.49,0-11.84,6.14-22.91,16.81-32.33,20.31,11.37,57,19,98.92,19s78.62-7.6,98.93-19c10.67,9.42,16.81,20.49,16.81,32.33,0,9.88-4.28,19.21-11.88,27.51a148.24,148.24,0,0,0,40.69-46.51c23.26,26.94,46.36,48,54.24,46.42C417.79,345.87,389.21,254.77,368.46,209.77ZM111.21,245.21c-2.58,4.48-23.46-2.73-33.48-8.52s-16.05-14.11-13.46-18.58,16.19-9.28,26.21-3.5S113.8,240.73,111.21,245.21ZM330,236.69c-10,5.79-30.9,13-33.48,8.52s10.71-24.81,20.73-30.6,23.63-1,26.21,3.5S340,230.91,330,236.69Z" /></svg>
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
