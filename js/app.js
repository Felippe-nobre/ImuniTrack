
// APLICAÇÃO PRINCIPAL - APP.JS


class ImuniTrackApp {
    constructor() {
        this.appContainer = document.getElementById('app');
        this.init();
    }

    // Inicializar aplicação
    init() {
        // Verificar se usuário está autenticado
        if (auth.isAuthenticated()) {
            this.goToPage('dashboard');
        } else {
            this.goToPage('login');
        }

        // Adicionar event listeners
        this.setupEventListeners();
    }

    // Configurar event listeners
    setupEventListeners() {
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'loginForm') {
                this.handleLogin(e);
            } else if (e.target.id === 'registerForm') {
                this.handleRegister(e);
            } else if (e.target.id === 'addVaccineForm') {
                this.handleAddVaccine(e);
            } else if (e.target.id === 'profileForm') {
                this.handleProfileUpdate(e);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.id === 'searchVaccine') {
                this.handleSearchVaccines(e.target.value);
            }
        });
    }

    // Navegar para página
    goToPage(pageName) {
        if (!auth.isAuthenticated() && pageName !== 'login' && pageName !== 'register') {
            this.goToPage('login');
            return;
        }

        pages.currentPage = pageName;
        let content = '';

        switch (pageName) {
            case 'login':
                content = pages.renderLoginPage();
                break;
            case 'register':
                content = pages.renderRegisterPage();
                break;
            case 'dashboard':
                content = pages.renderDashboard();
                break;
            case 'calendar':
                content = pages.renderCalendar();
                break;
            case 'history':
                content = pages.renderHistory();
                break;
            case 'profile':
                content = pages.renderProfile();
                break;
            case 'settings':
                content = pages.renderSettings();
                break;
            default:
                content = pages.renderLoginPage();
        }

        this.appContainer.innerHTML = content;
        window.scrollTo(0, 0);

    }

    // Lidar com login
    handleLogin(e) {
        e.preventDefault();
        UIManager.showLoading();

        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;

        try {
            auth.login(email, password);
            UIManager.hideLoading();
            UIManager.showToast('Login realizado com sucesso!', 'success');
            
            // Recarregar vacinas
            vaccination.vaccines = vaccination.loadVaccines();
            
            // Se o usuário não tem vacinas, gerar automaticamente baseado na data de nascimento
            if (vaccination.vaccines.length === 0) {
                const user = auth.getCurrentUser();
                if (user && user.dateOfBirth) {
                    const autoVaccines = generateAutomaticVaccines(user.dateOfBirth);
                    autoVaccines.forEach(vaccine => {
                        vaccination.addVaccine(vaccine);
                    });
                    vaccination.vaccines = vaccination.loadVaccines();
                }
            }
            
            this.goToPage('dashboard');
        } catch (error) {
            UIManager.hideLoading();
            UIManager.showToast(error.message, 'error');
        }
    }

    // Lidar com registro
    handleRegister(e) {
        e.preventDefault();
        UIManager.showLoading();

        const name = document.getElementById('registerName').value;
        const email = document.getElementById('registerEmail').value;
        const dateOfBirth = document.getElementById('registerBirthDate').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;

        // Validações
        if (!UIManager.validateEmail(email)) {
            UIManager.hideLoading();
            UIManager.showToast('Email inválido', 'error');
            return;
        }

        if (!UIManager.validatePassword(password)) {
            UIManager.hideLoading();
            UIManager.showToast('Senha deve ter pelo menos 6 caracteres', 'error');
            return;
        }

        if (password !== confirmPassword) {
            UIManager.hideLoading();
            UIManager.showToast('Senhas não conferem', 'error');
            return;
        }

        try {
            auth.register(name, email, password, dateOfBirth);
            UIManager.hideLoading();
            UIManager.showToast('Conta criada com sucesso!', 'success');

            // Gerar vacinas automáticas baseadas na data de nascimento
            const autoVaccines = generateAutomaticVaccines(dateOfBirth);
            autoVaccines.forEach(vaccine => {
                vaccination.addVaccine(vaccine);
            });

            // Recarregar vacinas
            vaccination.vaccines = vaccination.loadVaccines();

            this.goToPage('dashboard');
        } catch (error) {
            UIManager.hideLoading();
            UIManager.showToast(error.message, 'error');
        }
    }

    // Lidar com adição de vacina
    handleAddVaccine(e) {
        e.preventDefault();

        const name = document.getElementById('vaccineName').value;
        const description = document.getElementById('vaccineDescription').value;
        const doseNumber = parseInt(document.getElementById('vaccineDose').value);
        const totalDoses = parseInt(document.getElementById('vaccineTotalDoses').value);
        const nextDueDate = document.getElementById('vaccineDate').value;

        if (!name || !nextDueDate) {
            UIManager.showToast('Preencha todos os campos obrigatórios', 'error');
            return;
        }

        try {
            vaccination.addVaccine({
                name,
                description,
                recommendedAge: '',
                nextDueDate,
                status: 'pending',
                doseNumber,
                totalDoses
            });

            UIManager.showToast('Vacina adicionada com sucesso!', 'success');
            document.getElementById('addVaccineForm').reset();
            this.goToPage('calendar');
        } catch (error) {
            UIManager.showToast(error.message, 'error');
        }
    }

    // Marcar vacina como tomada
    markVaccineAsTaken(vaccineId) {
        try {
            vaccination.markAsTaken(vaccineId);
            UIManager.showToast('Vacina marcada como tomada!', 'success');
            this.goToPage('calendar');
        } catch (error) {
            UIManager.showToast(error.message, 'error');
        }
    }

    // Remover vacina
    deleteVaccine(vaccineId) {
        if (confirm('Tem certeza que deseja remover esta vacina?')) {
            try {
                vaccination.deleteVaccine(vaccineId);
                UIManager.showToast('Vacina removida com sucesso!', 'success');
                this.goToPage('calendar');
            } catch (error) {
                UIManager.showToast(error.message, 'error');
            }
        }
    }

    // Lidar com atualização de perfil
    handleProfileUpdate(e) {
        e.preventDefault();

        const name = document.getElementById('profileName').value;
        const email = document.getElementById('profileEmail').value;
        const dateOfBirth = document.getElementById('profileBirthDate').value;

        try {
            auth.updateProfile({ name, email, dateOfBirth });
            UIManager.showToast('Perfil atualizado com sucesso!', 'success');
            this.goToPage('profile');
        } catch (error) {
            UIManager.showToast(error.message, 'error');
        }
    }

    // Buscar vacinas
    handleSearchVaccines(searchTerm) {
        const historyList = document.getElementById('historyList');
        if (!historyList) return;

        const results = vaccination.searchVaccines(searchTerm);
        let html = '';

        if (results.length === 0) {
            html = '<div class="alert alert-info">Nenhuma vacina encontrada</div>';
        } else {
            results.forEach(vaccine => {
                const takenDate = vaccine.takenAt ? UIManager.formatDateShort(vaccine.takenAt) : 'Data não registrada';
                html += `
                    <div class="card mb-3 vaccine-item">
                        <div class="card-body">
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="card-title mb-1">
                                        ${UIManager.getStatusIcon(vaccine.status)} ${vaccine.name}
                                    </h6>
                                    <p class="card-text text-muted small mb-2">${vaccine.description}</p>
                                    <small class="text-muted">
                                        <strong>Data Agendada:</strong> ${UIManager.formatDateShort(vaccine.nextDueDate)}<br>
                                        <strong>Dose:</strong> ${vaccine.doseNumber} de ${vaccine.totalDoses}
                                    </small>
                                </div>
                                ${UIManager.getStatusBadge(vaccine.status)}
                            </div>
                        </div>
                    </div>
                `;
            });
        }

        historyList.innerHTML = html;
    }

    // Fazer logout
    logout() {
        if (confirm('Tem certeza que deseja fazer logout?')) {
            auth.logout();
            UIManager.showToast('Logout realizado com sucesso!', 'success');
            this.goToPage('login');
        }
    }
}

// Inicializar SOMENTE após DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    window.app = new ImuniTrackApp();
});