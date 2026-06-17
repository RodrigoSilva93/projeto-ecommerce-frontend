export async function ProductService() {
    try {
        const response = await fetch('../data/produtos.json'); // este caminho ainda não existe, mas será onde o JSON com os dados de todos os produtos estarão
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
}