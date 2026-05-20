// CALENDÁRIO VACINAL OFICIAL - VACCINE-CALENDAR.JS
// Baseado no calendário do Ministério da Saúde do Brasil
// ============================================

const VACCINE_CALENDAR = {
    // BEBÊS (0-12 meses)
    baby: [
        { name: 'BCG', description: 'Proteção contra tuberculose', ageInMonths: 0, doses: 1 },
        { name: 'Hepatite B', description: 'Proteção contra hepatite B', ageInMonths: 0, doses: 3 },
        { name: 'Poliomielite (VOP)', description: 'Proteção contra poliomielite', ageInMonths: 2, doses: 3 },
        { name: 'Rotavírus', description: 'Proteção contra rotavírus', ageInMonths: 2, doses: 2 },
        { name: 'Pneumocócica 10', description: 'Proteção contra pneumococo', ageInMonths: 2, doses: 3 },
        { name: 'Meningocócica C', description: 'Proteção contra meningite C', ageInMonths: 3, doses: 3 },
        { name: 'DTP', description: 'Difteria, Tétano, Coqueluche', ageInMonths: 2, doses: 3 },
        { name: 'Haemophilus influenzae tipo b', description: 'Proteção contra Haemophilus', ageInMonths: 2, doses: 3 },
        { name: 'Influenza', description: 'Proteção contra gripe', ageInMonths: 6, doses: 2 },
        { name: 'Febre Amarela', description: 'Proteção contra febre amarela', ageInMonths: 9, doses: 2 }
    ],

    // CRIANÇAS (1-5 anos)
    children: [
        { name: 'DTP Reforço', description: 'Reforço contra difteria, tétano e coqueluche', ageInMonths: 15, doses: 1 },
        { name: 'Poliomielite Reforço', description: 'Reforço contra poliomielite', ageInMonths: 15, doses: 1 },
        { name: 'Pneumocócica Reforço', description: 'Reforço contra pneumococo', ageInMonths: 12, doses: 1 },
        { name: 'Meningocócica Reforço', description: 'Reforço contra meningite C', ageInMonths: 12, doses: 1 },
        { name: 'Varicela', description: 'Proteção contra catapora', ageInMonths: 15, doses: 2 },
        { name: 'SCR', description: 'Sarampo, Caxumba, Rubéola', ageInMonths: 12, doses: 2 }
    ],

    // ADOLESCENTES (6-17 anos)
    adolescents: [
        { name: 'DTP Reforço Escolar', description: 'Reforço contra difteria, tétano e coqueluche', ageInMonths: 60, doses: 1 },
        { name: 'Poliomielite Reforço Escolar', description: 'Reforço contra poliomielite', ageInMonths: 60, doses: 1 },
        { name: 'HPV', description: 'Proteção contra papilomavírus humano', ageInMonths: 132, doses: 2 },
        { name: 'Meningocócica ACWY', description: 'Proteção contra meningite ACWY', ageInMonths: 132, doses: 1 }
    ],

    // ADULTOS (18+ anos)
    adults: [
        { name: 'Tétano', description: 'Reforço contra tétano', ageInMonths: 0, doses: 1 },
        { name: 'Hepatite B', description: 'Proteção contra hepatite B', ageInMonths: 0, doses: 3 },
        { name: 'COVID-19', description: 'Proteção contra COVID-19', ageInMonths: 0, doses: 2 },
        { name: 'Herpes Zóster', description: 'Proteção contra herpes zóster', ageInMonths: 600, doses: 2 }
    ]
};

// Função para obter vacinas recomendadas por idade
function getRecommendedVaccines(birthDate) {
    try {
        const today = new Date();
        const birth = new Date(birthDate);
        const ageInMonths = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
        const ageInYears = Math.floor(ageInMonths / 12);

        let recommended = [];

        if (ageInMonths <= 12) {
            recommended = VACCINE_CALENDAR.baby;
        } else if (ageInYears <= 5) {
            recommended = [...VACCINE_CALENDAR.baby, ...VACCINE_CALENDAR.children];
        } else if (ageInYears <= 17) {
            recommended = [...VACCINE_CALENDAR.baby, ...VACCINE_CALENDAR.children, ...VACCINE_CALENDAR.adolescents];
        } else {
            recommended = VACCINE_CALENDAR.adults;
        }

        return recommended;
    } catch (error) {
        console.error('Erro ao obter vacinas recomendadas:', error);
        return [];
    }
}

// Função para calcular data recomendada
function calculateRecommendedDate(birthDate, ageInMonths) {
    try {
        const birth = new Date(birthDate);
        
        // Calcular a data adicionando meses
        let year = birth.getFullYear();
        let month = birth.getMonth() + ageInMonths;
        let day = birth.getDate();
        
        // Ajustar ano e mês se necessário
        year += Math.floor(month / 12);
        month = month % 12;
        
        // Criar nova data
        const dueDate = new Date(year, month, day);
        
        return dueDate;
    } catch (error) {
        console.error('Erro ao calcular data:', error);
        return new Date();
    }
}

// Função para criar vacinas automáticas
function generateAutomaticVaccines(birthDate) {
    try {
        const recommended = getRecommendedVaccines(birthDate);
        const vaccines = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        recommended.forEach((vaccine, index) => {
            try {
                const dueDate = calculateRecommendedDate(birthDate, vaccine.ageInMonths || 0);
                
                if (dueDate && !isNaN(dueDate.getTime())) {
                    const dateString = dueDate.toISOString().split('T')[0];
                    
                    // Determinar status
                    let status = 'pending';
                    if (dueDate < today) {
                        status = 'overdue';
                    }
                    
                    vaccines.push({
                        id: `vaccine_${Date.now()}_${index}`,
                        name: vaccine.name,
                        description: vaccine.description,
                        nextDueDate: dateString,
                        status: status,
                        doseNumber: 1,
                        totalDoses: vaccine.doses || 1,
                        createdAt: new Date().toISOString(),
                        takenAt: null
                    });
                }
            } catch (e) {
                console.error('Erro ao processar vacina:', vaccine.name, e);
            }
        });
        
        console.log(`✓ Vacinas geradas: ${vaccines.length}`);
        return vaccines;
    } catch (error) {
        console.error('Erro ao gerar vacinas:', error);
        return [];
    }
}
