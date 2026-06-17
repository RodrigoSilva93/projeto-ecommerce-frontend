export async function ProductService() {
    try {
        const response = await fetch('/data/produtos.json'); // este caminho ainda não existe, mas será onde o JSON com os dados de todos os produtos estarão
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        return [];
    }
}