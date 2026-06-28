import { GoogleLogin } from '@react-oauth/google'
import { motion } from 'framer-motion'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import { Button } from '../../components/Button'
import { Form } from '../../components/Form'
import { googleLoginRequest, loginRequest } from '../../store/modules/auth/actions'

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
        <div className='m-auto flex flex-col place-items-center p-[5vh]'>
            <motion.form
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                onSubmit={handleSubmit}
                className='flex h-full w-full max-w-xl flex-col items-center rounded-[2vh] p-[4vh] shadow-[-1vh_2vh_3vh_rgba(0,0,0,0.2)]'
            >
                <header className='flex flex-row items-center justify-center pb-[7vh]'>
                    <h1 className='px-[2vh] text-3xl font-extrabold'>Login</h1>
                    <div className='h-[4vh] self-start justify-self-start'></div>
                </header>
                <Form.Root>
                    <Form.ContainerInput>
                        <Form.Label name='email' text='E-mail' />
                        <Form.Input
                            name='email'
                            typeInput='email'
                            placeholder='Digite seu e-mail para fazer login'
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {formErrors.email && <span className='text-sm font-semibold text-[#e74d3c]'>{formErrors.email}</span>}
                    </Form.ContainerInput>
                    <Form.ContainerInput>
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
                        {formErrors.password && <span className='text-sm font-semibold text-[#e74d3c]'>{formErrors.password}</span>}
                    </Form.ContainerInput>
                    <div className='flex h-fit w-full flex-row flex-wrap items-center justify-between gap-y-4 pb-[7vh]'>
                        <Link className='text-base text-[#aaa] underline' to='forgot-password'>
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
                        <span className='text-sm font-semibold text-[#e74d3c]'>
                            Login com Google indisponivel no momento.
                        </span>
                    )}

                </Form.Root>
                <div className='flex w-full flex-col justify-center gap-6 sm:flex-row'>
                    <Button.Secondary
                        onClick={() => navigate('/register')}>
                        Cadastre-se
                    </Button.Secondary>
                    <Button.Primary
                        type='submit'
                        disabled={isLoading}
                    >
                        {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button.Primary>
                </div>
            </motion.form>
        </div>
    )
}

