import { useEffect, useState } from 'react';
import { FormBudget } from '../FormBudget';
import { useUser } from '../../context/User';

export const UserPrivacy = () => {
    const { user, fetchUser, setUser, updateUser } = useUser()
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        async function getData() {
            const data = await fetchUser()
            console.log(data)
            setUser(data)
        }
        getData()
    }, [fetchUser, setUser])
    return (
        <>
            <FormBudget.ContainerInput size='xx-large' >
                <FormBudget.Label
                    text={'Email *'}
                    htmlFor={'email'}
                >
                </FormBudget.Label >
                <FormBudget.Input
                    placeholder={'Insira seu nome completo'}
                    typeInput={'text'}
                    id={'email'}
                    value={user?.email || ''}
                    onChange={(e) => updateUser('email', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <FormBudget.ContainerInput >
                <FormBudget.Label name='password' text='Senha' />
                <FormBudget.Input
                    id='password'
                    typeInput={showPassword ? 'text' : 'password'}
                    placeholder='Digite sua senha'
                    value={user?.password}
                    onChange={(e) => updateUser('password', e.target.value)}
                />
            </FormBudget.ContainerInput>

            <div className='container-LinksLogin'>
                <div className='containerCheckbox'>
                    <input type='checkbox' id='handlePassword' onChange={(e) => setShowPassword(e.target.checked)} />
                    <label htmlFor='handlePassword'>Mostrar senha</label>
                </div>
            </div>

        </>
    )
}