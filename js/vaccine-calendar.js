// CALENDÁRIO VACINAL OFICIAL - VACCINE-CALENDAR.JS
// Baseado no calendário do Ministério da Saúde do Brasil


const VACCINE_CALENDAR = {
  
  // BEBÊS (0 - 12 MESES)
  
  baby: [
    {
      name: "BCG",
      description: "Proteção contra formas graves de tuberculose",
      ageInMonths: 0,
      doses: 1,
    },
    {
      name: "Hepatite B",
      description: "Proteção contra hepatite B",
      ageInMonths: 0,
      doses: 3,
    },
    {
      name: "Pentavalente",
      description:
        "Proteção contra difteria, tétano, coqueluche, hepatite B e Hib",
      ageInMonths: 2,
      doses: 3,
    },
    {
      name: "VIP / Poliomielite",
      description: "Proteção contra poliomielite",
      ageInMonths: 2,
      doses: 3,
    },
    {
      name: "Pneumocócica 10",
      description: "Proteção contra pneumonias e meningites",
      ageInMonths: 2,
      doses: 3,
    },
    {
      name: "Rotavírus",
      description: "Proteção contra diarreia por rotavírus",
      ageInMonths: 2,
      doses: 2,
    },
    {
      name: "Meningocócica C",
      description: "Proteção contra meningite meningocócica",
      ageInMonths: 3,
      doses: 2,
    },
    {
      name: "Influenza",
      description: "Vacina anual contra gripe",
      ageInMonths: 6,
      doses: 2,
    },
    {
      name: "Febre Amarela",
      description: "Proteção contra febre amarela",
      ageInMonths: 9,
      doses: 1,
    },
    {
      name: "Tríplice Viral (SCR)",
      description: "Proteção contra sarampo, caxumba e rubéola",
      ageInMonths: 12,
      doses: 2,
    },
  ],

  
  // CRIANÇAS (1 - 9 ANOS)
  
  children: [
    {
      name: "DTP Reforço",
      description: "Reforço contra difteria, tétano e coqueluche",
      ageInMonths: 15,
      doses: 1,
    },
    {
      name: "Poliomielite Reforço",
      description: "Reforço contra poliomielite",
      ageInMonths: 15,
      doses: 1,
    },
    {
      name: "Hepatite A",
      description: "Proteção contra hepatite A",
      ageInMonths: 15,
      doses: 1,
    },
    {
      name: "Varicela",
      description: "Proteção contra catapora",
      ageInMonths: 15,
      doses: 2,
    },
    {
      name: "Meningocócica ACWY",
      description: "Proteção ampliada contra meningite",
      ageInMonths: 132,
      doses: 1,
    },
    {
      name: "Influenza",
      description: "Dose anual contra gripe",
      ageInMonths: 24,
      doses: 1,
    },
  ],

  
  // ADOLESCENTES (10 - 17 ANOS)
  
  adolescents: [
    {
      name: "HPV",
      description: "Proteção contra HPV",
      ageInMonths: 108,
      doses: 2,
    },
    {
      name: "Meningocócica ACWY",
      description: "Reforço contra meningite",
      ageInMonths: 132,
      doses: 1,
    },
    {
      name: "dT",
      description: "Reforço contra difteria e tétano",
      ageInMonths: 144,
      doses: 1,
    },
    {
      name: "Influenza",
      description: "Vacina anual contra gripe",
      ageInMonths: 120,
      doses: 1,
    },
    {
      name: "COVID-19",
      description: "Reforço atualizado contra COVID-19",
      ageInMonths: 144,
      doses: 1,
    },
  ],

  
  // ADULTOS (18 - 59 ANOS)
  
  adults: [
    {
      name: "dT",
      description: "Reforço contra difteria e tétano a cada 10 anos",
      ageInMonths: 216,
      doses: 1,
    },
    {
      name: "Hepatite B",
      description: "Esquema completo contra hepatite B",
      ageInMonths: 216,
      doses: 3,
    },
    {
      name: "Febre Amarela",
      description: "Dose única ou reforço dependendo da situação vacinal",
      ageInMonths: 216,
      doses: 1,
    },
    {
      name: "Influenza",
      description: "Vacina anual contra gripe",
      ageInMonths: 216,
      doses: 1,
    },
    {
      name: "COVID-19",
      description: "Reforço anual atualizado",
      ageInMonths: 216,
      doses: 1,
    },
    {
      name: "Tríplice Viral",
      description: "Proteção contra sarampo, caxumba e rubéola",
      ageInMonths: 216,
      doses: 2,
    },
  ],

  
  // IDOSOS (60+)
  
  elderly: [
    {
      name: "Influenza",
      description: "Vacina anual contra gripe",
      ageInMonths: 720,
      doses: 1,
    },
    {
      name: "COVID-19",
      description: "Reforço anual atualizado",
      ageInMonths: 720,
      doses: 1,
    },
    {
      name: "Pneumocócica 23",
      description: "Proteção contra pneumonia",
      ageInMonths: 720,
      doses: 1,
    },
    {
      name: "Herpes Zóster",
      description: "Proteção contra cobreiro",
      ageInMonths: 720,
      doses: 2,
    },
    {
      name: "dT",
      description: "Reforço contra tétano e difteria",
      ageInMonths: 720,
      doses: 1,
    },
  ],
};

// Função para obter vacinas recomendadas por idade
function getRecommendedVaccines(birthDate) {
  try {
    const today = new Date();
    const birth = new Date(birthDate);
    const ageInMonths =
      (today.getFullYear() - birth.getFullYear()) * 12 +
      (today.getMonth() - birth.getMonth());
    const ageInYears = Math.floor(ageInMonths / 12);

    let recommended = [];

    if (ageInMonths <= 12) {
      recommended = VACCINE_CALENDAR.baby;
    } else if (ageInYears <= 9) {
      recommended = [...VACCINE_CALENDAR.baby, ...VACCINE_CALENDAR.children];
    } else if (ageInYears <= 17) {
      recommended = [
        ...VACCINE_CALENDAR.children,
        ...VACCINE_CALENDAR.adolescents,
      ];
    } else if (ageInYears <= 59) {
      recommended = VACCINE_CALENDAR.adults;
    } else {
      recommended = VACCINE_CALENDAR.elderly;
    }

    return recommended;
  } catch (error) {
    console.error("Erro ao obter vacinas recomendadas:", error);
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
    console.error("Erro ao calcular data:", error);
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
        // Para adultos, usar datas futuras a partir do ano atual
        let dueDate;

        if (vaccine.ageInMonths === 0) {
          // Cria datas distribuídas ao longo do próximo ano
          dueDate = new Date();

          // adiciona meses diferentes para cada vacina
          dueDate.setMonth(dueDate.getMonth() + index * 2);
        } else {
          // Mantém cálculo normal para crianças/adolescentes
          dueDate = calculateRecommendedDate(
            birthDate,
            vaccine.ageInMonths || 0,
          );
        }

        if (dueDate && !isNaN(dueDate.getTime())) {
          const dateString = dueDate.toISOString().split("T")[0];

          // Status automático
          let status = "pending";

          // Só marca como overdue se realmente passou
          if (dueDate < today) {
            status = "overdue";
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
            takenAt: null,
          });
        }
      } catch (e) {
        console.error("Erro ao processar vacina:", vaccine.name, e);
      }
    });

    console.log(`✓ Vacinas geradas: ${vaccines.length}`);
    return vaccines;
  } catch (error) {
    console.error("Erro ao gerar vacinas:", error);
    return [];
  }
}
