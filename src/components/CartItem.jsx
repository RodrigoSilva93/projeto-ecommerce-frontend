import { Trash2, Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { useNavigate } from 'react-router-dom'

export function CartItem({item, onUpdateQuantity, onRemove}) {
    const navigate = useNavigate();

    const handleSubtract = () => {
        if (item.quantidade > 1) onUpdateQuantity(item.id, item.quantidade - 1);
    };

    const handleAdd = () => {
        onUpdateQuantity(item.id, item.quantidade + 1);
    }

    const handleInput = (e) => {
        const val = parseInt(e.target.value, 10);
        if (!isNaN(val) && val >= 1) onUpdateQuantity(item.id, val);
    }

    const formatPrice = (value) => (value ?? 0).toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 p-4 border rounded-lg bg-white shadow-sm">

            <div className="flex items-center gap-3 sm:contents">
                <div className="flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md overflow-hidden border bg-gray-50">
                    <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-contain" 
                    />
                </div>
                
                <p 
                    onClick={() => navigate(`/product/${item.id}`)} 
                    className="flex-1 text-sm text-gray-700 leading-snug hover:underline hover:underline-offset-2 cursor-pointer">
                        {item.name}
                </p>

                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemove?.(item.id)}
                    aria-label="Remover produto"
                    className="flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 sm:hidden">
                        <Trash2 className="h-4 w-4" />
                </Button>
            </div>

            <div className="flex items-center justify-between sm:contents gap-3">
                <div className="flex items-center gap-1 flex-shrink-0">
                    <span className="text-xs text-gray-500 mr-1 hidden sm:inline">
                        Quantidade:
                    </span>

                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleSubtract} 
                        disabled={item.quantidade <= 1}
                        aria-label="Diminuir quantidade"
                        className="h-7 w-7 text-blue-500 border-blue-300 hover:bg-blue-50">
                            <Minus className="h-3 w-3" />
                    </Button>

                    <Input 
                        type="number"
                        min={1}
                        value={item.quantidade}
                        onChange={handleInput}
                        onBlur={e => {
                            const val = parseInt(e.target.value, 10);
                            if (isNaN(val) || val < 1) onUpdateQuantity(item.id, 1);
                        }}
                        aria-label="Quantidade"
                        className="w-12 h-7 text-center text-sm p-1"
                    />

                    <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={handleAdd} 
                        aria-label="Aumentar quantidade"
                        className="h-7 w-7 text-blue-500 border-blue-300 hover:bg-blue-50">
                            <Plus className="h-3 w-3" />
                    </Button>
                </div>

                <div className="flex-shrink-0 text-right min-w-[80px] sm:min-w-[90px]">
                    <span className="text-xs text-gray-500 block">
                        Preço:
                    </span>

                    <span className="font-semibold text-gray-800 text-sm">
                        {formatPrice(item.price)}
                    </span>
                </div>
            </div>

            <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemove?.(item.id)}
                aria-label="Remover produto"
                className="hidden sm:flex flex-shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50 h-20 w-10">
                    <Trash2 className="h-4 w-4" />
            </Button>
        </div>
    );
}