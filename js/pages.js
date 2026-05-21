// PÁGINAS - PAGES.JS

class PageManager {
  constructor() {
    this.currentPage = "login";
  }

  renderLoginPage() {
    return `
        <div class="login-container">
            <div class="card login-card animate-scale-in">

                <div class="login-header">
                    <div class="logo-circle">I</div>
                    <h1>ImuniTrack</h1>
                    <p>Seu controle de vacinação em dia</p>
                </div>

                <div class="login-body">
                    <h5 class="card-title mb-4 text-center">Bem-vindo</h5>

                    <form id="loginForm">
                        <div class="mb-3">
                            <label for="loginEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="loginEmail" placeholder="seu@email.com" required>
                        </div>

                        <div class="mb-3">
                            <label for="loginPassword" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="loginPassword" placeholder="••••••••" required>
                        </div>

                        <button type="submit" class="btn btn-primary w-100 mb-3">
                            <i class="bi bi-box-arrow-in-right"></i> Entrar
                        </button>
                    </form>

                    <div class="d-flex align-items-center gap-2 mb-3">
                        <div class="flex-grow-1 border-top"></div>
                        <small class="text-muted">Novo por aqui?</small>
                        <div class="flex-grow-1 border-top"></div>
                    </div>

                    <button class="btn btn-outline-primary w-100" onclick="app.goToPage('register')">
                        <i class="bi bi-person-plus"></i> Criar Conta
                    </button>

                    <div class="test-credentials">
                        <h6>Credenciais de Teste</h6>
                        <p><strong>Email:</strong> <code>teste@email.com</code></p>
                        <p><strong>Senha:</strong> <code>123456</code></p>
                    </div>
                </div>

            </div>
        </div>
    `;
  }

  // Renderizar página de registro
  renderRegisterPage() {
    return `
        <div class="login-container">
            <div class="card login-card animate-scale-in">

                <div class="login-header">
                    <button class="btn btn-link text-muted mb-3" onclick="app.goToPage('login')">
                        <i class="bi bi-arrow-left"></i> Voltar ao Login
                    </button>

                    <div class="logo-circle">I</div>

                    <h1>ImuniTrack</h1>
                    <p>Crie sua conta agora</p>
                </div>

                <div class="login-body">
                    <h5 class="card-title mb-4 text-center">Novo Cadastro</h5>

                    <form id="registerForm">

                        <div class="mb-3">
                            <label for="registerName" class="form-label">Nome Completo</label>
                            <input type="text" class="form-control" id="registerName" placeholder="Seu nome" required>
                        </div>

                        <div class="mb-3">
                            <label for="registerEmail" class="form-label">Email</label>
                            <input type="email" class="form-control" id="registerEmail" placeholder="seu@email.com" required>
                        </div>

                        <div class="mb-3">
                            <label for="registerBirthDate" class="form-label">Data de Nascimento</label>
                            <input type="date" class="form-control" id="registerBirthDate" required>
                        </div>

                        <div class="mb-3">
                            <label for="registerPassword" class="form-label">Senha</label>
                            <input type="password" class="form-control" id="registerPassword" placeholder="••••••••" required>
                        </div>

                        <div class="mb-3">
                            <label for="registerConfirmPassword" class="form-label">Confirmar Senha</label>
                            <input type="password" class="form-control" id="registerConfirmPassword" placeholder="••••••••" required>
                        </div>

                        <button type="submit" class="btn btn-primary w-100">
                            <i class="bi bi-check-circle"></i> Criar Conta
                        </button>

                    </form>
                </div>

            </div>
        </div>
    `;
  }

  // Renderizar layout principal (com navbar e sidebar)
  renderMainLayout(content) {
    const user = auth.getCurrentUser();
    const progress = vaccination.getImmunizationProgress();
    const completed = vaccination.getCompletedVaccines().length;
    const total = vaccination.getAllVaccines().length;

    return `
            <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
                <div class="container-fluid">

                    <!-- Logo -->
                    <a class="navbar-brand" href="#">
                        <i class="bi bi-shield-check"></i> ImuniTrack
                    </a>

                    <!-- MENU BOOTSTRAP -->
                    <button class="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <!-- NAVBAR -->
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto">

                            <li class="nav-item">
                                <span class="nav-link">
                                    <i class="bi bi-person"></i> ${user.name}
                                </span>
                            </li>

                            <li class="nav-item">
                                <button class="nav-link btn btn-link"
                                        onclick="UIManager.toggleTheme()">
                                    <i class="bi bi-moon"></i>
                                </button>
                            </li>

                            <li class="nav-item">
                                <button class="nav-link btn btn-link"
                                        onclick="app.logout()">
                                    <i class="bi bi-box-arrow-right"></i> Sair
                                </button>
                            </li>

                        </ul>
                    </div>

                </div>
            </nav>
            <!-- BOTÃO SIDEBAR MOBILE -->
            <button class="sidebar-mobile-toggle d-md-none"
                    id="menuToggle">
                <i class="bi bi-list"></i>
            </button>
            <div class="container-fluid">
                <div class="row">

                    <!-- Sidebar -->
                    <div class="col-md-3 p-0 sidebar-wrapper" id="sidebarWrapper">

                        <div class="sidebar">

                            <div class="p-3 mb-3">
                                <div class="card bg-primary text-white">
                                    <div class="card-body text-center">
                                        <h6 class="card-title">Progresso</h6>

                                        <div class="progress mb-2" style="height: 8px;">
                                            <div class="progress-bar" style="width: ${progress}%"></div>
                                        </div>

                                        <small>
                                            ${progress}% - ${completed}/${total} vacinas
                                        </small>
                                    </div>
                                </div>
                            </div>

                            <a href="#"
                            class="sidebar-item ${this.currentPage === "dashboard" ? "active" : ""}"
                            onclick="app.goToPage('dashboard'); return false;">
                                <i class="bi bi-speedometer2"></i>
                                Dashboard
                            </a>

                            <a href="#"
                            class="sidebar-item ${this.currentPage === "calendar" ? "active" : ""}"
                            onclick="app.goToPage('calendar'); return false;">
                                <i class="bi bi-calendar-event"></i>
                                Calendário
                            </a>

                            <a href="#"
                            class="sidebar-item ${this.currentPage === "history" ? "active" : ""}"
                            onclick="app.goToPage('history'); return false;">
                                <i class="bi bi-clock-history"></i>
                                Histórico
                            </a>

                            <a href="#"
                            class="sidebar-item ${this.currentPage === "profile" ? "active" : ""}"
                            onclick="app.goToPage('profile'); return false;">
                                <i class="bi bi-person-circle"></i>
                                Perfil
                            </a>

                            <a href="#"
                            class="sidebar-item ${this.currentPage === "settings" ? "active" : ""}"
                            onclick="app.goToPage('settings'); return false;">
                                <i class="bi bi-gear"></i>
                                Configurações
                            </a>
                        </div>
                    </div>

                    <!-- Conteúdo Principal -->
                    <div class="col-md-9 p-4">
                        ${content}
                    </div>

                </div>
            </div>
        `;
  }

  // Renderizar Dashboard
  renderDashboard() {
    const progress = vaccination.getImmunizationProgress();
    const completed = vaccination.getCompletedVaccines();
    const upcoming = vaccination.getUpcomingVaccines();
    const overdue = vaccination.getOverdueVaccines();

    let statsHTML = `
            <div class="page-title">Dashboard</div>
            <p class="page-subtitle">Acompanhe seu calendário de vacinação</p>

            <div class="stats-grid">
                ${UIManager.createStatCard('<i class="bi bi-graph-up"></i>', "primary", "Progresso", `${progress}%`)}
                ${UIManager.createStatCard('<i class="bi bi-check-circle"></i>', "success", "Concluídas", completed.length)}
                ${UIManager.createStatCard('<i class="bi bi-clock"></i>', "primary", "Próximas", upcoming.length)}
                ${UIManager.createStatCard('<i class="bi bi-exclamation-circle"></i>', "danger", "Atrasadas", overdue.length)}
            </div>

            <div class="progress mb-4" style="height: 20px;">
                <div class="progress-bar" style="width: ${progress}%">${progress}%</div>
            </div>
        `;

    if (overdue.length > 0) {
      statsHTML += `
                <div class="alert alert-danger mb-4">
                    <h5><i class="bi bi-exclamation-triangle"></i> Vacinas Atrasadas</h5>
                    <p>Você tem ${overdue.length} vacina(s) atrasada(s). Agende sua(s) dose(s) o mais breve possível.</p>
                    <button class="btn btn-danger btn-sm" onclick="app.goToPage('calendar')">
                        <i class="bi bi-calendar-event"></i> Agendar Agora
                    </button>
                </div>
            `;
    }

    statsHTML += `
            <div class="text-center mt-5">
                <button class="btn btn-primary btn-lg adicionar-vacina" onclick="app.goToPage('calendar')">
                    <i class="bi bi-plus-circle"></i> Adicionar Vacina
                </button>
            </div>
        `;

    return this.renderMainLayout(statsHTML);
  }

  // Renderizar Calendário
  renderCalendar() {
    const vaccines = vaccination.getAllVaccines();

    let calendarHTML = `
            <div class="page-title m">Calendário de Vacinação</div>
            <p class="page-subtitle">Acompanhe suas próximas doses e marque as já tomadas</p>

            <div class="row">
                <div class="col-lg-8 mt-4 mt-lg-0">
                    <div class="card p-4">
                        <h5 class="mb-4">Vacinas Agendadas</h5>
                        <div id="vaccinesList">
        `;

    if (vaccines.length === 0) {
      calendarHTML += `
                <p class="text-muted text-center py-5">Nenhuma vacina agendada</p>
            `;
    } else {
      vaccines.forEach((vaccine) => {
        calendarHTML += UIManager.createVaccineElement(vaccine);
      });
    }

    calendarHTML += `
                        </div>
                    </div>
                </div>

                <div class="col-lg-4 mt-4 mt-lg-0">
                    <div class="card p-4 mb-4">
                        <h5 class="mb-3">Adicionar Vacina</h5>
                        <form id="addVaccineForm">
                            <div class="mb-3">
                                <label for="vaccineName" class="form-label">Nome da Vacina</label>
                                <input type="text" class="form-control" id="vaccineName" placeholder="Ex: Hepatite B" required>
                            </div>

                            <div class="mb-3">
                                <label for="vaccineDescription" class="form-label">Descrição</label>
                                <input type="text" class="form-control" id="vaccineDescription" placeholder="Ex: Proteção contra hepatite B">
                            </div>

                            <div class="row">
                                <div class="col-6 mb-3">
                                    <label for="vaccineDose" class="form-label">Dose Atual</label>
                                    <input type="number" class="form-control" id="vaccineDose" value="1" min="1" required>
                                </div>
                                <div class="col-6 mb-3">
                                    <label for="vaccineTotalDoses" class="form-label">Total de Doses</label>
                                    <input type="number" class="form-control" id="vaccineTotalDoses" value="1" min="1" required>
                                </div>
                            </div>

                            <div class="mb-3">
                                <label for="vaccineDate" class="form-label">Data da Próxima Dose</label>
                                <input type="date" class="form-control" id="vaccineDate" required>
                            </div>

                            <button type="submit" class="btn btn-primary w-100 adicionar-vacina">
                                <i class="bi bi-plus-circle"></i> Adicionar Vacina
                            </button>
                        </form>
                    </div>

                    <div class="card p-4 bg-light card-dicas">
                        <h6 class="mb-3"><i class="bi bi-lightbulb"></i> Dicas</h6>
                        <ul class="small text-muted mb-0">
                            <li>✓ Clique em "Já Tomei" para marcar uma vacina como concluída</li>
                            <li>✓ Adicione novas vacinas com a data agendada</li>
                            <li>✓ Acompanhe o progresso no Dashboard</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;

    return this.renderMainLayout(calendarHTML);
  }

  // Renderizar Histórico
  renderHistory() {
    const vaccines = vaccination.getAllVaccines();
    const completed = vaccination.getCompletedVaccines();

    let historyHTML = `
            <div class="page-title">Histórico de Vacinação</div>
            <p class="page-subtitle">Acompanhe todas as suas vacinas aplicadas</p>

            <div class="mb-4">
                <input type="text" class="form-control" id="searchVaccine" placeholder="Buscar vacina...">
            </div>

            <div id="historyList">
        `;

    if (completed.length === 0) {
      historyHTML += `
                <div class="alert alert-info">
                    <i class="bi bi-info-circle"></i> Nenhuma vacina marcada como concluída ainda.
                </div>
            `;
    } else {
      completed.forEach((vaccine) => {
        const takenDate = vaccine.takenAt
          ? UIManager.formatDateShort(vaccine.takenAt)
          : "Data não registrada";
        historyHTML += `
                    <div class="card mb-3 vaccine-item">
                        <div >
                            <div class="d-flex justify-content-between align-items-start">
                                <div>
                                    <h6 class="card-title mb-1">
                                        <i class="bi bi-check-circle text-success"></i> ${vaccine.name}
                                    </h6>
                                    <p class="card-text text-muted small mb-2">${vaccine.description}</p>
                                    <small class="text-muted">
                                        <strong>Data Agendada:</strong> ${UIManager.formatDateShort(vaccine.nextDueDate)}<br>
                                        <strong>Data Tomada:</strong> ${takenDate}<br>
                                        <strong>Dose:</strong> ${vaccine.doseNumber} de ${vaccine.totalDoses}
                                    </small>
                                </div>
                                <span class="badge bg-success">Concluída</span>
                            </div>
                        </div>
                    </div>
                `;
      });
    }

    historyHTML += `
            </div>
        `;

    return this.renderMainLayout(historyHTML);
  }

  // Renderizar Perfil
  renderProfile() {
    const user = auth.getCurrentUser();

    let profileHTML = `
            <div class="page-title">Meu Perfil</div>
            <p class="page-subtitle">Gerencie suas informações pessoais</p>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card p-4">
                        <div class="text-center mb-4">
                            <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #3b82f6 0%, #a78bfa 100%); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; color: white; font-size: 2.5rem; font-weight: 700;">
                                ${user.name.charAt(0).toUpperCase()}
                            </div>
                            <h5>${user.name}</h5>
                            <p class="text-muted">${user.email}</p>
                        </div>

                        <form id="profileForm">
                            <div class="mb-3">
                                <label for="profileName" class="form-label">Nome Completo</label>
                                <input type="text" class="form-control" id="profileName" value="${user.name}" required>
                            </div>

                            <div class="mb-3">
                                <label for="profileEmail" class="form-label">Email</label>
                                <input type="email" class="form-control" id="profileEmail" value="${user.email}" required>
                            </div>

                            <div class="mb-3">
                                <label for="profileBirthDate" class="form-label">Data de Nascimento</label>
                                <input type="date" class="form-control" id="profileBirthDate" value="${user.dateOfBirth}">
                            </div>

                            <button type="submit" class="btn btn-primary">
                                <i class="bi bi-check-circle"></i> Salvar Alterações
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        `;

    return this.renderMainLayout(profileHTML);
  }

  // Renderizar Configurações
  renderSettings() {
    let settingsHTML = `
            <div class="page-title">Configurações</div>
            <p class="page-subtitle">Personalize sua experiência no ImuniTrack</p>

            <div class="row">
                <div class="col-lg-8">
                    <div class="card p-4 mb-4">
                        <h5 class="mb-4"><i class="bi bi-palette"></i> Tema</h5>
                        <div class="d-flex align-items-center justify-content-between p-3  rounded card-theme">
                            <div>
                                <p class="mb-0"><strong>Modo Escuro</strong></p>
                                <small class="text-muted">Escolha entre tema claro e escuro</small>
                            </div>
                            <button class="btn btn-primary btn-sm" onclick="UIManager.toggleTheme()">
                                <i class="bi bi-moon"></i> Alternar Tema
                            </button>
                        </div>
                    </div>

                    <div class="card p-4">
                        <h5 class="mb-4"><i class="bi bi-bell"></i> Notificações</h5>
                        <div class="form-check form-switch mb-3">
                            <input class="form-check-input" type="checkbox" id="emailNotifications" checked>
                            <label class="form-check-label" for="emailNotifications">
                                <strong>Notificações por Email</strong>
                                <br>
                                <small class="text-muted">Receba lembretes de vacinação por email</small>
                            </label>
                        </div>

                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="pushNotifications" checked>
                            <label class="form-check-label" for="pushNotifications">
                                <strong>Notificações Push</strong>
                                <br>
                                <small class="text-muted">Receba notificações no navegador</small>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        `;

    return this.renderMainLayout(settingsHTML);
  }
}

const pages = new PageManager();

document.addEventListener("click", (e) => {
  const toggle = e.target.closest("#menuToggle");
  const sidebar = document.getElementById("sidebarWrapper");

  if (toggle) {
    sidebar.classList.toggle("active");
  }
});
