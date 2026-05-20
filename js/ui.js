// ============================================
// UTILITÁRIOS DE UI - UI.JS
// ============================================

class UIManager {
    // Mostrar toast (notificação)
    static showToast(message, type = 'info') {
        const toastContainer = document.getElementById('toastContainer');
        
        const toastHTML = `
            <div class="toast align-items-center text-white border-0 bg-${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'}" role="alert" aria-live="assertive" aria-atomic="true">
                <div class="d-flex">
                    <div class="toast-body">
                        ${message}
                    </div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
            </div>
        `;

        toastContainer.insertAdjacentHTML('beforeend', toastHTML);

        // Criar e mostrar toast
        const toastElement = toastContainer.lastElementChild;
        const toast = new bootstrap.Toast(toastElement);
        toast.show();

        // Remover elemento após desaparecer
        toastElement.addEventListener('hidden.bs.toast', () => {
            toastElement.remove();
        });
    }

    // Mostrar loading spinner
    static showLoading() {
        document.getElementById('loadingSpinner').classList.remove('d-none');
    }

    // Esconder loading spinner
    static hideLoading() {
        document.getElementById('loadingSpinner').classList.add('d-none');
    }

    // Formatar data para exibição
    static formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Formatar data curta (DD/MM/YYYY)
    static formatDateShort(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR');
    }

    // Obter status badge HTML
    static getStatusBadge(status) {
        const badges = {
            'completed': '<span class="badge badge-success"><i class="bi bi-check-circle"></i> Concluída</span>',
            'pending': '<span class="badge badge-info"><i class="bi bi-clock"></i> Próxima</span>',
            'overdue': '<span class="badge badge-danger"><i class="bi bi-exclamation-circle"></i> Atrasada</span>'
        };
        return badges[status] || '';
    }

    // Obter ícone de status
    static getStatusIcon(status) {
        const icons = {
            'completed': '<i class="bi bi-check-circle text-success"></i>',
            'pending': '<i class="bi bi-clock text-primary"></i>',
            'overdue': '<i class="bi bi-exclamation-circle text-danger"></i>'
        };
        return icons[status] || '';
    }

    // Validar email
    static validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Validar senha
    static validatePassword(password) {
        return password.length >= 6;
    }

    // Alternar tema escuro/claro
    static toggleTheme() {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    }

    // Carregar preferência de tema
    static loadThemePreference() {
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        if (isDarkMode) {
            document.body.classList.add('dark-mode');
        }
    }

    // Criar elemento de vacina
    static createVaccineElement(vaccine) {
        const statusIcon = this.getStatusIcon(vaccine.status);
        const statusBadge = this.getStatusBadge(vaccine.status);
        const dueDate = this.formatDateShort(vaccine.nextDueDate);

        return `
            <div class="vaccine-item animate-slide-in-up">
                <div class="vaccine-header">
                    <div>
                        <p class="vaccine-name">${statusIcon} ${vaccine.name}</p>
                        <p class="vaccine-date">Data: ${dueDate}</p>
                        ${vaccine.description ? `<p class="vaccine-date">${vaccine.description}</p>` : ''}
                    </div>
                    ${statusBadge}
                </div>
                <div class="vaccine-actions">
                    ${vaccine.status !== 'completed' ? `
                        <button class="btn btn-sm btn-success" onclick="app.markVaccineAsTaken('${vaccine.id}')">
                            <i class="bi bi-check-circle"></i> Já Tomei
                        </button>
                    ` : ''}
                    <button class="btn btn-sm btn-outline-danger" onclick="app.deleteVaccine('${vaccine.id}')">
                        <i class="bi bi-trash"></i> Remover
                    </button>
                </div>
            </div>
        `;
    }

    // Criar card de estatística
    static createStatCard(icon, iconColor, label, value) {
        return `
            <div class="stat-card">
                <div class="stat-icon ${iconColor}">${icon}</div>
                <p class="stat-label">${label}</p>
                <p class="stat-value">${value}</p>
            </div>
        `;
    }

    // Formatar número com zero à esquerda
    static padZero(num) {
        return String(num).padStart(2, '0');
    }
}

// Carregar tema ao iniciar
UIManager.loadThemePreference();
