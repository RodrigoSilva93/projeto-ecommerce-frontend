import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

import { findUser } from '@/services/UserService'
import { createSession } from '@/utils/auth'
import { validateLogin } from '@/utils/validations'

export function Login() {
    const navigate  = useNavigate();
    const location  = useLocation();
    const [login, setLogin] = useState('');
    const [senha, setSenha] = useState('');
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});

    const from = location.state?.from ?? '/';

    const handleBlur = (field) => {
        setTouched(prev => ({...prev, [field]: true}));
        setErrors(validateLogin({ login, senha }));
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        setTouched({ login: true, senha: true });
        const validationErrors = validateLogin({ login, senha });
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) return;

        const user = findUser(login, senha);

        if (!user) {
            setErrors({ auth: "Login ou senha incorretos." });
            return;
        }
        
        createSession(user);

        navigate(from, { replace: true });
    }

    return (
        <main className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col gap-6">

                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        Acessar OnlineShop
                    </h1>
                </div>

                <Separator />

                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="login" className="text-sm font-medium text-gray-700">
                            Login
                        </Label>
                        <Input
                            id="login"
                            type="email"
                            value={login}
                            onChange={(e) => {
                                setLogin(e.target.value);
                                if (touched.login) {
                                    setErrors(prev => ({ 
                                        ...prev, 
                                        login: validateLogin({ login: e.target.value, senha}).login, 
                                        auth: undefined 
                                    }));
                                }
                            }}
                            onBlur={() => handleBlur('login')}
                            autoComplete="username"
                            aria-invalid={!!(touched.login && errors.login)}
                            className={touched.login && errors.login ? 'border-red-400 focus-visible:ring-red-300' : ''}
                        />
                        {touched.login && errors.login && (
                            <p className="text-xs text-red-500">
                                {errors.login}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                            Senha
                        </Label>
                        <Input
                            id="senha"
                            type="password"
                            value={senha}
                            onChange={(e) => {
                                setSenha(e.target.value);
                                if (touched.senha) {
                                    setErrors(prev => ({
                                        ...prev, 
                                        senha: validateLogin({ login, senha: e.target.value}).senha,
                                        auth: undefined
                                    }));
                                }
                            }}
                            onBlur={() => handleBlur('senha')}
                            autoComplete="current-password"
                            aria-invalid={!!(touched.senha && errors.senha)}
                            className={touched.senha && errors.senha ? 'border-red-400 focus-visible:ring-red-300' : ''}
                        />
                        {touched.senha && errors.senha && (
                            <p className="text-xs text-red-500">{errors.senha}</p>
                        )}
                    </div>

                    {errors.auth && (
                        <p className="text-xs text-red-500 text-center -mt-1">
                            {errors.auth}
                        </p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-[#1a8fd1] hover:bg-[#1579b5] text-white font-semibold h-11 rounded-lg mt-1">
                        Entrar
                    </Button>
                </form>

                <p className="text-center text-sm text-gray-500">
                    Não é cadastrado?{' '}
                    <Link
                        to="/register"
                        className="text-[#1a8fd1] font-medium hover:underline">
                        Faça o registro aqui.
                    </Link>
                </p>
            </div>
        </main>
    )
}