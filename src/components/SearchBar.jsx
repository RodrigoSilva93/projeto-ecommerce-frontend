import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, ArrowRight, X } from 'lucide-react'

import { useProducts } from '@/hooks/useProducts'

export function SearchBar({ className = '' }) {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const [query, setQuery] = useState('');
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef(null);

    useEffect(() => { //atualiza a pesquisa após 600ms em idle
        const timer = setTimeout(() => setQuery(input), 600);
        return () => clearTimeout(timer);
    }, [input]);

    useEffect(() => {
        const handler = (e) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    const suggestions = useProducts({ query });
    const isSearching = input.trim().length > 0
    const hasSuggestions = isSearching && suggestions.length > 0;

    const handleSearch = () => {
        if (!input.trim()) return;
        setOpen(false);
        navigate(`/?q=${encodeURIComponent(input.trim())}`);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSearch();
        if (e.key === 'Escape') setOpen(false);
    };

    const handleSuggestionClick = (product) => {
        setInput('');
        setQuery('');
        setOpen(false);
        navigate(`/product/${product.id}`);
    };

    const handleClear = () => {
        setInput('');
        setQuery('');
        setOpen(false);
    }

    const getImage = (product) => {
        if (!Array.isArray(product.images)) return null;
        return product.images.find(src => src != null) ?? null;
    }

    return (
        <div ref={wrapperRef} className={`relative w-full ${className}`}>
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />

            <Input
                value={input}
                onChange={e => { setInput(e.target.value); setOpen(true); }}
                onFocus={() => input.trim() && setOpen(true)}
                onKeyDown={handleKeyDown}
                className="pl-9 pr-16 bg-white placeholder:text-gray-400"
                placeholder="Encontre seu aparelho ou acessório"
            />

            {input && (
                <Button
                    size="icon"
                    variant="ghost"
                    onClick={handleClear}
                    className="absolute right-9 top-1/2 -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-gray-600">
                    <X className="h-4 w-4" />
                </Button>
            )}

            <Button
                size="icon"
                variant="ghost"
                onClick={handleSearch}
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <ArrowRight className="h-4 w-4" />
            </Button>

            {open && isSearching && (
                <ul className="absolute top-full mt-1 left-0 right-0 bg-white border border-gray-200 rounded-lg shadow-md z-50 max-h-64 overflow-y-auto">
                    {hasSuggestions ? (
                        suggestions.map((product) => {
                            const thumbnail = getImage(product);
                            return (
                                <li key={product.id}>
                                    <button
                                        onMouseDown={() => handleSuggestionClick(product)}
                                        className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-3 transition-colors">
                                            {thumbnail ? (
                                                <img 
                                                    src={thumbnail}
                                                    alt=""
                                                    className="w-8 h-8 object-contain flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-8 h-8 bg-gray-100 rounded flex-shrink-0" />                                                    
                                            )}
                                            <span className="line-clamp-1">
                                                {product.name}
                                            </span>
                                    </button>
                                </li>
                            )
                        })
                    ) : (
                        <li className="px-4 py-3 text-sm text-gray-400 text-center">
                            Nenhum produto encontrado
                        </li>
                    )}
                </ul>
            )}
        </div>
    )
}