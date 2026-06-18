import { useNavigate, useParams } from 'react-router-dom'

import { ChevronLeft, ShoppingCart, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { toast } from 'sonner'

import { useProducts } from '@/hooks/useProducts'
import { useCart } from '@/hooks/useCart'

const formatPrice = (value) =>  (value ?? 0).toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
});

export function ProductDetail() {
    const navigate = useNavigate();
    const { id } = useParams();
    const products = useProducts();
    const product = products.find(p => p.id === Number(id));
    const { addProduct } = useCart();

    const handleBuyNow = () => {
        addProduct(product);
        navigate('/cart');
    }

    const handleAddToCart = () => {
        addProduct(product);
        toast.success("Produto adicionado!", {
            description: `${product.name} foi adicionado ao carrinho.`,
            duration: 3000,
        })
    }

    // Carregando: lista ainda vazia (fetch em andamento)
    if (products.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-gray-400 text-sm">Carregando produto...</p>
            </div>
        )
    }

    
    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center gap-4">
                <p className="text-gray-600 font-medium">Produto não encontrado.</p>
                <Button variant="ghost" onClick={() => navigate('/')}>
                    <ChevronLeft className="h-4 w-4 mr-1" /> Voltar à loja
                </Button>
            </div>
        )
    }

    const hasDiscount = product.discount > 0;
    const featuredPrice = hasDiscount ? product.price * (1 - product.discount / 100) : product.price;

    const images = product.images?.length > 0 ? product.images : [null];


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-6xl mx-auto px-4 py-6">
                <Button
                    variant="ghost"
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm mb-4 transition-colors">
                        <ChevronLeft className="h-4 w-4" />
                        Voltar
                </Button>

                <h1 className="text-base font-medium text-gray-700 mb-4">
                    Detalhes do produto
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr_280px] gap-6 mb-6">

                    {/* Imagem */}
                    <div className="bg-white rounded-xl border border-gray-200 flex items-center justify-center p-6 min-h-[220px] shadow-sm">
                        {images.length > 1 ? ( // várias imagens
                            <Carousel className="w-full" opts={{ loop: true }}>
                                <CarouselContent>
                                    {images.map((src, i) => (
                                        <CarouselItem key={i} className="flex items-center justify-center min-h-[180px]">
                                            {src ? (
                                                <img 
                                                    src={src}
                                                    alt={`${product.name} - imagem ${i + 1}`}
                                                    className="max-h-48 object-contain"
                                                />
                                            ) : (
                                                <span className="text-gray-300 text-sm">
                                                    [imagem {i + 1}]
                                                </span>
                                            )}
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="left-1" />
                                <CarouselNext className="right-1" />
                            </Carousel>
                        ) : ( // uma imagem
                            <div className="flex items-center justify-center min-h-[180px]">
                                {images[0] ? (
                                    <img 
                                        src={images[0]}
                                        alt={product.name}
                                        className="max-h-48 object-contain"
                                    />
                                ) : (
                                    <span className="text-gray-300 text-sm">
                                        Sem imagem
                                    </span>
                                )}
                            </div>
                        )}
                    </div>

                    {/* Nome e Descrição */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm">
                        <p className="font-bold text-gray-900 text-sm leading-snug">
                            {product.name}
                        </p>
                        <div>
                            <h2 className="font-semibold text-gray-800 text-sm mb-2">
                                Descrição do Produto
                            </h2>

                            <div className="flex flex-col gap-3">
                                {product.description.map((p, i) => (
                                    <p key={i} className="text-sm text-gray-600 leading-relaxed">
                                        {p}
                                    </p>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Preço e Botões */}
                    <div className="self-start sticky top-6 ">
                        <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 shadow-sm">
                            {hasDiscount && (
                                <p className="text-sm text-gray-400 line-through">
                                    {formatPrice(product.price)}
                                </p>
                            )}

                            <p className="text-4xl font-bold text-[#1a8fd1] leading-none">
                                {formatPrice(featuredPrice)}
                            </p>

                            {hasDiscount && (
                                <p className="text-sm text-gray-500">
                                    À vista no PIX com{' '}
                                    <span className="font-semibold text-gray-800">
                                        {product.discount}% de desconto
                                    </span>
                                </p>
                            )}

                            <Separator />

                            <Badge
                                variant="outline"
                                className={product.inStock
                                    ? 'w-fit text-green-600 border-green-300 bg-green-50 text-xs font-medium'
                                    : 'w-fit text-red-500 border-red-300 bg-red-50 text-xs font-medium'
                                }>
                                    {product.inStock ? 'Produto disponível em estoque' : 'Produto indisponível'}
                            </Badge>

                            <Button
                                disabled={!product.inStock}
                                onClick={handleBuyNow}
                                className="w-full bg-[#1a8fd1] hover:bg-[#1579b5] text-white font-semibold h-12">
                                    Comprar agora
                            </Button>

                            <Button
                                variant="outline"
                                disabled={!product.inStock}
                                onClick={handleAddToCart}
                                className="w-full border-[#1a8fd1] text-[#1a8fd1] hover:bg-[#e8f4fb] font-semibold h-12">
                                    <ShoppingCart size={18} className="mr-2"/>
                                    Adicionar ao carrinho
                            </Button>

                            <Separator />

                            {/* Frete */}
                            <div className="flex flex-col gap-2">
                                <Label className="text-xs font-semibold text-gray-600">
                                    Calcular Frete
                                </Label>
                            </div>

                            <div className="flex gap-2">
                                <Input
                                    placeholder="Digite seu CEP"
                                    maxLength={9}
                                    className="text-sm placeholder:text-gray-400"
                                />

                                <Button
                                    variant="outline"
                                    className="shrink-0 text-sm text-gray-600 border-gray-300 hover:bg-gray-50">
                                        Calcular
                                </Button>
                            </div>

                            <a 
                                href="https://buscacepinter.correios.com.br"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#1a8fd1] hover:underline w-fit">
                                    Não sei meu CEP
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informações Técnicas */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden mb-12 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-100">
                    <h2 className="font-bold text-gray-800 text-sm">
                        Informações Técnicas
                    </h2>
                </div>

                <Table>
                    <TableBody>
                        {product.technicalInfo.map(row => (
                            <TableRow key={row.label} className="align-top">
                                <TableCell className="text-xs font-medium text-gray-500 py-3 align-top w-40">
                                    {row.label}
                                </TableCell>

                                <TableCell className="text-xs text-gray-800 py-3 break-words whitespace-normal max-w-0">
                                    {Array.isArray(row.value) ? row.value.join(',  ') : row.value}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}