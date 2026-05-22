
// AUTENTICAÇÃO - AUTH.JS


class AuthManager {
    constructor() {
        this.currentUser = this.loadUser();
        this.users = this.loadUsers();
    }

    // Carregar usuário atual do localStorage
    loadUser() {
        const user = localStorage.getItem('currentUser');
        return user ? JSON.parse(user) : null;
    }

    // Carregar todos os usuários do localStorage
    loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    // Salvar usuários no localStorage
    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    // Fazer login
    login(email, password) {
        const user = this.users.find(u => u.email === email && u.password === password);
        
        if (!user) {
            throw new Error('Email ou senha incorretos');
        }

        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
        return user;
    }

    // Fazer registro
    register(name, email, password, dateOfBirth) {
        // Verificar se email já existe
        if (this.users.some(u => u.email === email)) {
            throw new Error('Este email já está cadastrado');
        }

        const newUser = {
            id: Date.now().toString(),
            name,
            email,
            password, // Em produção, seria criptografado
            dateOfBirth,
            createdAt: new Date().toISOString()
        };

        this.users.push(newUser);
        this.saveUsers();

        // Fazer login automático
        this.currentUser = newUser;
        localStorage.setItem('currentUser', JSON.stringify(newUser));

        return newUser;
    }

    // Fazer logout
    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
    }

    // Verificar se está autenticado
    isAuthenticated() {
        return this.currentUser !== null;
    }

    // Obter usuário atual
    getCurrentUser() {
        return this.currentUser;
    }

    // Atualizar perfil do usuário
    updateProfile(updates) {
        if (!this.currentUser) {
            throw new Error('Usuário não autenticado');
        }

        this.currentUser = { ...this.currentUser, ...updates };
        
        // Atualizar na lista de usuários
        const index = this.users.findIndex(u => u.id === this.currentUser.id);
        if (index !== -1) {
            this.users[index] = this.currentUser;
            this.saveUsers();
        }

        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
        return this.currentUser;
    }

    // Adicionar usuário de teste
    addTestUser() {
        const testUser = {
            id: '1',
            name: 'Usuário Teste',
            email: 'teste@email.com',
            password: '123456',
            dateOfBirth: '2000-06-15',
            createdAt: new Date().toISOString()
        };

        // Verificar se já existe
        if (!this.users.some(u => u.email === testUser.email)) {
            this.users.push(testUser);
            this.saveUsers();
        }
    }
}

// Instância global
const auth = new AuthManager();

// Adicionar usuário de teste na primeira vez
if (auth.users.length === 0) {
    auth.addTestUser();
}
