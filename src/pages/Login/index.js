import { GoogleLogin } from '@react-oauth/google'
import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import validator from 'validator'
import BenefitsSection from '../../components/Benefits'
import { Button } from '../../components/Button'
import { ComparisonSection } from '../../components/Comparison'
import FeaturesSection from '../../components/Features'
import { Form } from '../../components/Form'
import HeroSection from '../../components/HeroSection'
import PainsSection from '../../components/Pains'
import RoadmapSection from '../../components/Roadmap'
import { googleLoginRequest, loginRequest } from '../../store/modules/auth/actions'
import HowItWorks from '../../components/HowItWorks'
import { DashboardSection } from '../../components/DashboardSection'
import { PricingSection } from '../../components/Pricing'

export function SectionHeader({ eyebrow, title, subtitle }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className='mx-auto flex max-w-3xl flex-col flex-wrap gap-4 text-center'
        >
            <span className='text-sm font-bold uppercase tracking-[0.075em] text-brand'>{eyebrow}</span>
            <h2 className='text-3xl font-extrabold leading-tight sm:text-4xl lg:text-[2.9rem]'>{title}</h2>
            <p className='mx-auto max-w-[47rem] leading-6 text-muted-foreground'>{subtitle}</p>
        </motion.div>
    )
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
        <div className='absolute min-h-dvh w-full bg-[radial-gradient(circle,rgba(38,178,242,0.3)_0%,transparent_60%)] bg-[length:100%_150%] bg-[position:0_200%] bg-no-repeat text-white [background-attachment:fixed] before:fixed before:inset-0 before:-z-10 before:bg-black/30'>
            <HeroSection />
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className='mx-auto flex w-full justify-center border-y border-border bg-surface/30 px-4 py-12 text-center text-xs uppercase leading-6 tracking-[0.08em] text-muted-foreground'
            >
                Usado por autonomos, MEIs, marcenarias, serralherias, comunicacao visual e assistencias tecnicas
            </motion.div>

            <PainsSection />
            <BenefitsSection />
            <HowItWorks />
            <DashboardSection />
            <ComparisonSection />
            <FeaturesSection />
            <RoadmapSection />
            <PricingSection />

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

                        <div className='flex w-full flex-col justify-between gap-4 sm:flex-row'>
                            <Button.Root className='btn-cancel' onClick={() => navigate('/register')}>
                                Cadastre-se
                            </Button.Root>
                            <Button.Root type='submit' disabled={isLoading}>
                                {isLoading ? 'Entrando...' : 'Entrar'}
                            </Button.Root>
                        </div>
                    </Form.Root>
                </motion.form>
            </div>
        </div>
    )
}
