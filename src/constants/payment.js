export const PAYMENT_METHODS = [
    { value: "credit", label: "Cartão de Crédito" },
    { value: "debit", label: "Cartão de Débito" },
    { value: "pix", label: "Pix" },
    { value: "boleto", label: "Boleto Bancário" },
];

export const INSTALLMENTS = {
    credit: [1, 2, 3, 6, 9, 12],
    debit: [1],
    pix: [1],
    boleto: [1],
};