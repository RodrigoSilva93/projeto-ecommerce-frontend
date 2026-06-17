import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect, useRef } from "react"

import { ChevronLeft, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"

import { CartItem } from "@/components/CartItem"
import { useCart } from "@/hooks/useCart"
import { PAYMENT_METHODS, INSTALLMENTS } from "@/constants/payment"


const formatPrice = (value) =>  (value ?? 0).toLocaleString('pt-BR', { 
    style: 'currency', 
    currency: 'BRL'
});

export function Cart() {
    const navigate = useNavigate();
    
    const [ paymentMethod, setPaymentMethod ] = useState('');
    const [ installments, setInstallments ] = useState('');
    const [ attempted, setAttempted ] = useState(false);
    const navigateTimerRef = useRef(null);

    const { cart, removeProduct, updateQuantity, subtotal, shipping, discount, total, clearCart } = useCart(paymentMethod);

    const isCreditCard = paymentMethod === 'credit';
    const finishPurchase = !!paymentMethod && (isCreditCard ? !!installments : true);
    const availableInstallments = isCreditCard ? INSTALLMENTS['credit'] : [];
    
    const handlePayment = (value) => {
        setPaymentMethod(value);
        setInstallments('');
    };

    const handleCheckout = () => {
        setAttempted(true);

        if (!finishPurchase || cart.length === 0) return;

        clearCart();
        toast.success("Compra finalizada!", {
            description: "Seu pedido foi realizado com sucesso.",
            duration: 3000,
        });

        navigateTimerRef.current = setTimeout(() => navigate("/"), 3000);
    };

    useEffect(() => {
        return () => {
            if (navigateTimerRef.current) clearTimeout(navigateTimerRef.current);
        };
    }, []);

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
                    Informações do carrinho de compras
                </h1>

                {cart.length === 0 ? ( //mensagem carrinho vazio
                    <div className="flex flex-col items-center justify-center py-24 text-gray-400 gap-3">
                        <ShoppingCart className="h-14 w-14 stroke-1" />

                        <p className="text-lg font-medium text-gray-500">
                            Seu carrinho está vazio
                        </p>

                        <p className="text-sm">
                            Adicione produtos para continuar comprando.
                        </p>

                        <Button
                            render={<Link to="/" />}
                            nativeButton={false}
                            className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                               Explorar produtos
                        </Button>
                    </div>
                ) : ( //cria a lista de CartItem e demais informações
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        
                        <div className="flex-1 flex flex-col gap-3">
                            {cart.map((product) => (
                                <CartItem 
                                    key={product.id}
                                    item={product}
                                    onUpdateQuantity={updateQuantity}
                                    onRemove={removeProduct}
                                />
                            ))}

                            <div className="flex justify-between items-center pt-3 border-t lg:hidden text-sm text-gray-500">
                                <span>
                                    Subtotal:
                                </span>

                                <span className="font-semibold text-gray-700">
                                    {formatPrice(subtotal)}
                                </span>
                            </div>
                        </div>

                        <Separator className="lg:hidden" />

                        {/* Seção direita */}
                        <aside className="w-full lg:w-80 xl:w-96 border rounded-lg bg-white shadow-sm p-5 flex flex-col gap-4 lg:sticky lg:top-6">

                            {/* Valores */}
                            <div className="flex flex-col gap-3">

                                <div className="flex justify-between items-baseline text-gray-600">
                                    <span className="text-sm">
                                        Subtotal:
                                    </span>

                                    <span className="text-base font-semibold text-gray-800">
                                        {formatPrice(subtotal)}
                                    </span>
                                </div>

                                <div className="flex justify-between items-baseline text-gray-600">
                                    <span className="text-sm">
                                        Frete:
                                    </span>

                                    <span className={`text-base font-semibold ${shipping === 0 ? "text-green-600" : "text-gray-800"}`}>
                                        {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                                    </span>
                                </div>

                                {discount > 0 && (
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-sm text-gray-600">
                                            Desconto:
                                        </span>

                                        <span className="text-base font-semibold text-green-600">
                                            {formatPrice(discount)}
                                        </span>
                                    </div>
                                )}

                                <Separator />

                                <div className="flex justify-between items-baseline">
                                    <span className="text-sm font-medium text-gray-700">
                                        Total:
                                    </span>

                                    <span className="text-xl font-bold text-gray-900">
                                        {formatPrice(total)}
                                    </span>
                                </div>
                            </div>

                            <Separator />

                            {/* Formas de pagamento */}
                            <div className="flex flex-col gap-3">
                                <h2 className="font-semibold text-gray-700">
                                    Forma de pagamento
                                </h2>

                                <div className="flex flex-col gap-1">
                                    <Label htmlFor="payment-method" className="text-xs text-gray-500">
                                        Método de pagamento
                                    </Label>

                                    <Select value={paymentMethod} onValueChange={handlePayment}>
                                        <SelectTrigger id="payment-method" className="w-full">
                                            <SelectValue placeholder="Selecione" className="placeholder:text-gray-400" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {PAYMENT_METHODS.map(payment => (
                                                <SelectItem key={payment.value} value={payment.value}>
                                                    {payment.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {isCreditCard && (
                                    <div className="flex flex-col gap-1">
                                        <Label htmlFor="installments" className="text-xs text-gray-500">
                                            Quantidade de parcelas
                                        </Label>

                                        <Select value={installments} onValueChange={setInstallments} disabled={!paymentMethod}>
                                            <SelectTrigger id="installments" className="w-full">
                                                <SelectValue placeholder="Selecione" className="placeholder:text-gray-400" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableInstallments.map(i => (
                                                    <SelectItem key={i} value={String(i)}>
                                                        {i}x {i > 1 
                                                            ? ` de ${formatPrice(total / i)}` 
                                                            : ` de ${formatPrice(total)} (à vista)`
                                                        }
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 pt-1">
                                <Button
                                    onClick={handleCheckout}
                                    disabled={!finishPurchase}
                                    className="w-full h-12 bg-green-600 hover:bg-green-700 text-white font-semibold">
                                        Finalizar compra
                                </Button>
                                
                                <Button
                                    render={<Link to="/" />}
                                    nativeButton={false}
                                    variant="outline"
                                    className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-medium">
                                        Continuar comprando
                                </Button>
                            </div>

                            {attempted && !finishPurchase && (
                                <p className="text-xs text-gray-400 text-center mt-1">
                                    {isCreditCard 
                                        ? "Selecione o número de parcelas para concluir a compra."
                                        : "Selecione o método de pagamento para concluir a compra."
                                    }
                                </p>   
                            )}
                        </aside>
                    </div>
                )}
            </div>
        </div>
    );
}