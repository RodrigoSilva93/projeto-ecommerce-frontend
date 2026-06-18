import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function Login() {
    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        // autenticação será implementada futuramente
        console.log('Login:', login, 'Senha:', senha)
    }

    return (
        <main className="min-h-full bg-gray-50 flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-sm bg-white rounded-2xl border border-gray-200 shadow-md p-8 flex flex-col gap-6">

                {/* Cabeçalho */}
                <div className="flex flex-col gap-1 text-center">
                    <h1 className="text-xl font-bold text-gray-900">
                        Acessar OnlineShop
                    </h1>
                </div>

                <Separator />

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="login" className="text-sm font-medium text-gray-700">
                            Login
                        </Label>
                        <Input
                            id="login"
                            type="text"
                            placeholder="Digite seu login"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="senha" className="text-sm font-medium text-gray-700">
                            Senha
                        </Label>
                        <Input
                            id="senha"
                            type="password"
                            placeholder="Digite sua senha"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-[#1a8fd1] hover:bg-[#1579b5] text-white font-semibold h-11 rounded-lg mt-1"
                    >
                        Entrar
                    </Button>
                </form>

                {/* Rodapé do card */}
                <p className="text-center text-sm text-gray-500">
                    Não é cadastrado?{' '}
                    <Link
                        to="/register"
                        className="text-[#1a8fd1] font-medium hover:underline"
                    >
                        Faça o registro aqui.
                    </Link>
                </p>
            </div>
        </main>
    )
}
