const USUARIOS = 'users'
 
export function getUsers() {
    return JSON.parse(localStorage.getItem(USUARIOS)) || []
}
 
function saveUsers(users) {
    localStorage.setItem(USUARIOS, JSON.stringify(users))
}
 
export function registerUser(userData) {
    const users = getUsers()
    const exists = users.some(u => u.email === userData.email)
    if (exists) return false
    saveUsers([...users, userData])
    return true
}
 
export function findUser(email, senha) {
    const users = getUsers()
    return users.find(u => u.email === email && u.senha === senha) ?? null
}