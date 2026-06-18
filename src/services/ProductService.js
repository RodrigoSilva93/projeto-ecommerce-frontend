export async function ProductService() {
    try {
        const response = await fetch('/data/produtos.json'); 
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Erro ao buscar produtos: ", error);
        return [];
    }
}