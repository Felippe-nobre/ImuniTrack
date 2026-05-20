// ============================================
// GERENCIAMENTO DE VACINAÇÃO - VACCINATION.JS
// ============================================

class VaccinationManager {
    constructor() {
        this.vaccines = this.loadVaccines();
    }

    // Carregar vacinas do localStorage
    loadVaccines() {
        const userId = auth.getCurrentUser()?.id;
        if (!userId) return [];

        const vaccines = localStorage.getItem(`vaccines_${userId}`);
        return vaccines ? JSON.parse(vaccines) : [];
    }

    // Salvar vacinas no localStorage
    saveVaccines() {
        const userId = auth.getCurrentUser()?.id;
        if (!userId) return;

        localStorage.setItem(`vaccines_${userId}`, JSON.stringify(this.vaccines));
    }

    // Adicionar vacina
    addVaccine(vaccineData) {
        const vaccine = {
            id: Date.now().toString(),
            ...vaccineData,
            createdAt: new Date().toISOString(),
            takenAt: null
        };

        this.vaccines.push(vaccine);
        this.saveVaccines();
        return vaccine;
    }

    // Marcar vacina como tomada
    markAsTaken(vaccineId) {
        const vaccine = this.vaccines.find(v => v.id === vaccineId);
        if (vaccine) {
            vaccine.status = 'completed';
            vaccine.takenAt = new Date().toISOString();
            this.saveVaccines();
        }
        return vaccine;
    }

    // Remover vacina
    deleteVaccine(vaccineId) {
        this.vaccines = this.vaccines.filter(v => v.id !== vaccineId);
        this.saveVaccines();
    }

    // Obter todas as vacinas
    getAllVaccines() {
        return this.vaccines;
    }

    // Obter vacinas concluídas
    getCompletedVaccines() {
        return this.vaccines.filter(v => v.status === 'completed');
    }

    // Obter próximas vacinas
    getUpcomingVaccines() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.vaccines.filter(v => {
            if (v.status === 'completed') return false;
            const dueDate = new Date(v.nextDueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate > today;
        });
    }

    // Obter vacinas atrasadas
    getOverdueVaccines() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return this.vaccines.filter(v => {
            if (v.status === 'completed') return false;
            const dueDate = new Date(v.nextDueDate);
            dueDate.setHours(0, 0, 0, 0);
            return dueDate <= today;
        });
    }

    // Calcular progresso de imunização
    getImmunizationProgress() {
        if (this.vaccines.length === 0) return 0;
        const completed = this.getCompletedVaccines().length;
        return Math.round((completed / this.vaccines.length) * 100);
    }

    // Obter vacina por ID
    getVaccineById(id) {
        return this.vaccines.find(v => v.id === id);
    }

    // Atualizar vacina
    updateVaccine(id, updates) {
        const vaccine = this.getVaccineById(id);
        if (vaccine) {
            Object.assign(vaccine, updates);
            this.saveVaccines();
        }
        return vaccine;
    }

    // Buscar vacinas por nome
    searchVaccines(term) {
        const lowerTerm = term.toLowerCase();
        return this.vaccines.filter(v => 
            v.name.toLowerCase().includes(lowerTerm) ||
            v.description.toLowerCase().includes(lowerTerm)
        );
    }
}


// Instância global
const vaccination = new VaccinationManager();
