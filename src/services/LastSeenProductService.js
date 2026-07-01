const LAST_SEEN = 'lastProducts';

export function saveLastSeenProduct(product) {
    localStorage.setItem(LAST_SEEN, JSON.stringify(product));
}

export function getLastSeenProducts() {
    const products = JSON.parse(localStorage.getItem(LAST_SEEN)) || []

    return products;

}




