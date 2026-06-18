export async function ProductService() {
    try {
        const response = await fetch('/data/produtos.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        return [];
    }
}