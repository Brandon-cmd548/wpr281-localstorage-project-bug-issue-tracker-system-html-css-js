// ── Storage helpers ───────────────────────────────────────

function getProjects() {
    return JSON.parse(localStorage.getItem('localProjects')) || [];
}

function saveProjects(projects) {
    localStorage.setItem('localProjects', JSON.stringify(projects));
}

function getIssues() {
    return JSON.parse(localStorage.getItem('localIssues')) || [];
}

// ── Project form ──────────────────────────────────────────

function toggleProjectForm() {
    const wrap = document.getElementById('projectFormWrap');
    const isHidden = wrap.classList.contains('hidden');
    if (isHidden) {
        wrap.classList.remove('hidden');
        document.getElementById('projectName').focus();
    } else {
        wrap.classList.add('hidden');
        document.getElementById('projectName').value = '';
    }
}

// ── Project creation ──────────────────────────────────────

function generateProjectId(projects) {
    return (projects.length + 1).toString();
}

function isDuplicateProject(projects, name) {
    return projects.some(p => p.oProName.toLowerCase() === name.toLowerCase());
}

function saveProject() {
    const nameInput = document.getElementById('projectName');
    const name = nameInput.value.trim();

    if (!name) {
        nameInput.style.borderColor = 'var(--status-overdue-text)';
        nameInput.focus();
        return;
    }

    nameInput.style.borderColor = '';

    const projects = getProjects();

    if (isDuplicateProject(projects, name)) {
        nameInput.style.borderColor = 'var(--status-overdue-text)';
        nameInput.placeholder = 'Name already exists';
        nameInput.value = '';
        return;
    }

    const newProject = { oProID: generateProjectId(projects), oProName: name };
    projects.push(newProject);
    saveProjects(projects);

    nameInput.value = '';
    toggleProjectForm();
    renderProjects();
}

// ── Keyboard shortcuts ────────────────────────────────────

function bindProjectFormKeys() {
    const input = document.getElementById('projectName');
    if (!input) return;
    input.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') saveProject();
        if (e.key === 'Escape') toggleProjectForm();
    });
}

// ── Issue count ───────────────────────────────────────────

function getIssueCountForProject(projectName) {
    return getIssues().filter(i => i.oProject === projectName).length;
}

// ── Filtering & sorting ───────────────────────────────────

function getSearchQuery() {
    return document.getElementById('projectSearch')?.value.trim().toLowerCase() || '';
}

function getSortValue() {
    return document.getElementById('projectSort')?.value || '';
}

function filterProjects(projects, search) {
    if (!search) return projects;
    return projects.filter(p => p.oProName.toLowerCase().includes(search));
}

function attachIssueCounts(projects) {
    return projects.map(p => ({ ...p, count: getIssueCountForProject(p.oProName) }));
}

function sortProjects(projects, sort) {
    if (sort === 'name-asc')    return [...projects].sort((a, b) => a.oProName.localeCompare(b.oProName));
    if (sort === 'name-desc')   return [...projects].sort((a, b) => b.oProName.localeCompare(a.oProName));
    if (sort === 'issues-desc') return [...projects].sort((a, b) => b.count - a.count);
    if (sort === 'issues-asc')  return [...projects].sort((a, b) => a.count - b.count);
    return projects;
}

// ── Rendering ─────────────────────────────────────────────

function renderEmptyState(search) {
    return `
        <div class="empty-state" style="grid-column: 1 / -1;">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
            <p>${search ? 'No projects match your search.' : 'No projects yet. Create your first one above.'}</p>
        </div>
    `;
}

function renderProjectCard(p) {
    return `
        <div class="project-card">
            <span class="project-card-id">PRJ-${p.oProID}</span>
            <span class="project-card-name">${p.oProName}</span>
            <span class="project-card-count">${p.count} issue${p.count !== 1 ? 's' : ''}</span>
        </div>
    `;
}

function renderProjects() {
    const container = document.getElementById('projectList');
    const search    = getSearchQuery();
    const sort      = getSortValue();

    let projects = getProjects();
    projects = filterProjects(projects, search);
    projects = attachIssueCounts(projects);
    projects = sortProjects(projects, sort);

    if (projects.length === 0) {
        container.innerHTML = renderEmptyState(search);
        return;
    }

    container.innerHTML = projects.map(renderProjectCard).join('');
}

// ── Init ──────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', bindProjectFormKeys);