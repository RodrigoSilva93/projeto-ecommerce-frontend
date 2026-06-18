import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button, buttonVariants } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight, ShoppingCart, User, Menu } from 'lucide-react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, } from '@/components/ui/dropdown-menu'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'

import { useCart } from '@/hooks/useCart'
import { SearchBar } from '@/components/SearchBar'

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
                                            <Link to="/categories/celulares" onClick={() => setIsOpen(false)}>
                                                Celulares
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Link to="/categories/acessorios" onClick={() => setIsOpen(false)}>
                                                Acessórios
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
                                    <Link to="/categories/celulares">Celulares</Link>
                                </DropdownMenuItem>

                                <DropdownMenuItem>
                                    <Link to="/categories/acessorios">Acessórios</Link>
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

                    <Link 
                        to="/login" 
                        className={buttonVariants({ variant: "ghost"}) + " text-white"}>
                            <User />
                    </Link>

                    <Link 
                        to="/cart" 
                        className={buttonVariants({ variant: "ghost" }) + " text-white relative"}>
                            <ShoppingCart />
                            {totalItems > 0 && (
                                <Badge className="absolute -top-1 -right-1 !h-[18px] !min-w-[18px] !w-auto !px-1 !text-[10px] !font-bold !leading-none !bg-red-500 !text-white !border-0 !rounded-full">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </Badge>
                            )}
                    </Link>
                </div>

            </div>
        </nav>
    )
}
