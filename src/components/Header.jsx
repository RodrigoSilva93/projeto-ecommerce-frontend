import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import { Search, ShoppingCart, User, LogOut, Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { useCart } from '@/hooks/useCart'
import { SearchBar } from '@/components/SearchBar'
import { isAuthenticated, logout } from "@/utils/auth";

export function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { totalItems } = useCart();

    return (
        <nav className="border-b px-4 sm:px-6 py-3 bg-sky-400">
            <div className="flex items-center justify-between gap-4">

                {/* Mobile */}
                <div className="flex items-center gap-2 lg:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white" />}>
                            <Menu className="h-5 w-5" />
                        </SheetTrigger>

                        <SheetContent side="left" className="w-[280px] sm:w-[350px]">
                            <div className="flex flex-col gap-4 mt-8">
                                <Link to="/"
                                    onClick={() => setIsOpen(false)}
                                    className={buttonVariants({ variant: "ghost" }) + " justify-start"}>
                                    Home
                                </Link>

                                <DropdownMenu>
                                    <DropdownMenuTrigger render={<Button variant="ghost" className="justify-start w-full" />}>
                                        Categorias
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="ml-4">
                                        <DropdownMenuItem>
                                            <Link to="/categories/acessorios" onClick={() => setIsOpen(false)}>
                                                Acessórios
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/armazenamentos" onClick={() => setIsOpen(false)}>
                                                Armazenamentos
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/notebooks" onClick={() => setIsOpen(false)}>
                                                Notebooks
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/perifericos" onClick={() => setIsOpen(false)}>
                                                Periféricos
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/celulares" onClick={() => setIsOpen(false)}>
                                                Smartphones
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/televisores" onClick={() => setIsOpen(false)}>
                                                Televisores
                                            </Link>
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>

                <div className="flex items-center gap-4">
                    <Link to="/" className="text-xl sm:text-2xl font-bold hover:text-primary transition-colors text-white whitespace-nowrap">
                        OnlineShop
                    </Link>

                    {/* Desktop */}
                    <div className="hidden lg:flex items-center gap-2">
                        <Link to="/" className={buttonVariants({ variant: "ghost" }) + " text-white"}>Home</Link>

                        <DropdownMenu>
                            <DropdownMenuTrigger render={<Button variant="ghost" className="text-white" />}>
                                Categorias
                            </DropdownMenuTrigger>

                            <DropdownMenuContent>
                                <DropdownMenuItem>
                                    <Link to="/categories/acessorios">Acessórios</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/categories/armazenamentos">Armazenamentos</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/categories/notebooks">Notebooks</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/categories/perifericos">Periféricos</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/categories/celulares">Smartphones</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link to="/categories/televisores">Televisores</Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Busca Desktop */}
                <div className="hidden md:flex flex-1 max-w-3xl">
                    <SearchBar className="w-full" />
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                    {/* Busca Mobile */}
                    <div className="md:hidden">
                        <Sheet>
                            <SheetTrigger render={<Button variant="ghost" size="icon" className="text-white" />}>
                                <Search className="h-5 w-5" />
                            </SheetTrigger>

                            <SheetContent side="top" className="h-auto pt-8">
                                <SearchBar />
                            </SheetContent>
                        </Sheet>
                    </div>

                    {isAuthenticated() ? (
                        <Button
                            variant="ghost"
                            onClick={logout}
                            className="text-white">
                            <LogOut />
                        </Button>
                    ) : (
                        <Link
                            to="/login"
                            className={buttonVariants({ variant: "ghost" }) + " text-white"}>
                            <User />
                        </Link>
                    )}

                    <Link
                        to="/cart"
                        className={buttonVariants({ variant: "ghost" }) + " text-white relative"}>
                        <ShoppingCart />
                        {totalItems > 0 && (
                            <span className="absolute top-1/5 left-7 text-white text-[14px] font-bold leading-none min-w-[18px] h-[18px] flex items-center justify-center px-1">
                                {totalItems > 99 ? '(99+)' : `(${totalItems})`}
                            </span>
                        )}
                    </Link>
                </div>

            </div>
        </nav>
    )
}
