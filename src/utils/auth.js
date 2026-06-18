
const AUTH = "usuarioLogado";

export function createSession(user) {
    const TWO_HOURS = 2 * 60 * 60 * 1000;

    const authData = {
        email: user.email,
        name: user.nome,
        isAuthenticated: true,
        expiresAt: Date.now() + TWO_HOURS,
    };

    sessionStorage.setItem(AUTH, JSON.stringify(authData));
}

export function getSession() {
    return JSON.parse(sessionStorage.getItem(AUTH));
}

export function logout() {
    sessionStorage.removeItem(AUTH);
}

export function isAuthenticated() {
    const auth = JSON.parse(sessionStorage.getItem(AUTH));

    if (!auth) return false;

    if (Date.now() > auth.expiresAt) {
        logout();
        return false;
    }

    return true;
}