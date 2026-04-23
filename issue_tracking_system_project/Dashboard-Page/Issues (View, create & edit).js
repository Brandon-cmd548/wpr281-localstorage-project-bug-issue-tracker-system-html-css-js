
function displayIssues() {
    let issues = JSON.parse(localStorage.getItem("localIssues")) || [];
    const container = document.getElementById('issueList');
    if (!container) return;

    // Read toolbar values
    const search   = (document.getElementById('issueSearch')?.value || '').toLowerCase();
    const priority = document.getElementById('issueFilterPriority')?.value || '';
    const project  = document.getElementById('issueFilterProject')?.value || '';
    const sort     = document.getElementById('issueSort')?.value || '';

    // Filter
    if (search)   issues = issues.filter(i =>
        i.oSummary.toLowerCase().includes(search) ||
        i.oDetailed.toLowerCase().includes(search) ||
        i.oAssigned.toLowerCase().includes(search)
    );
    if (priority) issues = issues.filter(i => i.oPriority === priority);
    if (project)  issues = issues.filter(i => i.oProject  === project);

    // Sort
    const priorityRank = { high: 0, medium: 1, low: 2 };
    const statusRank   = { overdue: 0, open: 1, resolved: 2 };
    if (sort === 'urgency') issues.sort((a, b) => priorityRank[a.oPriority] - priorityRank[b.oPriority]);
    if (sort === 'status')  issues.sort((a, b) => statusRank[a.oStatus]    - statusRank[b.oStatus]);

    container.innerHTML = '';

    if (issues.length === 0) {
        container.innerHTML = `<div class="empty-state" style="grid-column:1/-1"><p>No issues match your filters.</p></div>`;
        return;
    }

    // Need real index for edit/resolve, so look it up from the full array
    const allIssues = JSON.parse(localStorage.getItem("localIssues")) || [];

    issues.forEach(issue => {
        const realIndex = allIssues.findIndex(i => i.oIssueID === issue.oIssueID);

        const priorityBorderColor = {
            high:   'var(--status-overdue-text)',
            medium: 'var(--priority-medium-text)',
            low:    'var(--priority-low-text)'
        }[issue.oPriority] || 'var(--border)';

        const statusStyle = {
            open:     'background:var(--status-open-bg);color:var(--status-open-text)',
            resolved: 'background:var(--status-resolved-bg);color:var(--status-resolved-text)',
            overdue:  'background:var(--status-overdue-bg);color:var(--status-overdue-text)'
        }[issue.oStatus] || '';

        const isResolved = issue.oStatus === 'resolved';

        container.innerHTML += `
            <div class="project-card" style="border:3px solid ${priorityBorderColor};">
                <div style="display:flex;justify-content:space-between;align-items:center">
                    <span style="font-size:11px;font-weight:600;padding:3px 10px;border-radius:999px;${statusStyle}">${issue.oStatus}</span>
                    <span style="font-size:11px;color:var(--text-muted)">ID: ${issue.oIssueID}</span>
                </div>
                <span class="project-card-name">${issue.oSummary}</span>
                <p style="font-size:12px;color:var(--text-muted);overflow:hidden;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;margin:0">${issue.oDetailed}</p>
                <div style="font-size:12px;color:var(--text);display:flex;flex-direction:column;gap:3px;padding-top:6px;border-top:1px solid var(--border)">
                    <span><strong>Project:</strong> ${issue.oProject}</span>
                    <span><strong>Assigned:</strong> ${issue.oAssigned}</span>
                </div>
                <div style="display:flex;gap:8px;margin-top:auto">
                    <button class="btn-primary" style="flex:1;justify-content:center" onclick="openEditModal(${realIndex})">
                        View / Edit
                    </button>
                    <button 
                        style="flex:1;justify-content:center;display:inline-flex;align-items:center;padding:9px 18px;border-radius:8px;font-size:13px;font-weight:600;cursor:pointer;border:none;transition:background 0.15s;
                        background:${isResolved ? 'var(--status-resolved-bg)' : 'var(--status-open-bg)'};
                        color:${isResolved ? 'var(--status-resolved-text)' : 'var(--status-open-text)'}"
                        onclick="markResolved(${realIndex})">
                        ${isResolved ? '✓ Resolved' : 'Mark Resolved'}
                    </button>
                </div>
            </div>`;
    });
}

// ── MARK RESOLVED ─────────────────────────────────────────
function markResolved(index) {
    const issues = JSON.parse(localStorage.getItem("localIssues"));
    issues[index].oStatus = issues[index].oStatus === 'resolved' ? 'open' : 'resolved';
    localStorage.setItem("localIssues", JSON.stringify(issues));
    displayIssues();
}

// ── OPEN EDIT MODAL ───────────────────────────────────────
let currentEditIndex = null;

function openEditModal(index) {
    const issues   = JSON.parse(localStorage.getItem("localIssues"));
    const people   = JSON.parse(localStorage.getItem("localPeople"))   || [];
    const projects = JSON.parse(localStorage.getItem("localProjects")) || [];
    const issue    = issues[index];
    currentEditIndex = index;

    const peopleOptions = people.map(p =>
        `<option value="${p.oPerUsername}" ${issue.oAssigned === p.oPerUsername ? 'selected' : ''}>${p.oPerName} ${p.oPerSurname}</option>`
    ).join('');

    const projectOptions = projects.map(proj =>
        `<option value="${proj.oProName}" ${issue.oProject === proj.oProName ? 'selected' : ''}>${proj.oProName}</option>`
    ).join('');

    document.getElementById('modalBody').innerHTML = `
        <div class="form-row">
            <div class="form-group" style="grid-column:1/-1">
                <label>Identifier</label>
                <input type="text" id="editWho" value="${issue.oWho}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group" style="grid-column:1/-1">
                <label>Identified Date</label>
                <input type="text" id="editDate" value="${issue.oDate}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group" style="grid-column:1/-1">
                <label>Summary</label>
                <input type="text" id="editSummary" value="${issue.oSummary}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group" style="grid-column:1/-1">
                <label>Detailed Description</label>
                <textarea id="editDetailed" rows="3">${issue.oDetailed}</textarea>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Project</label>
                <select id="editProject">${projectOptions}</select>
            </div>
            <div class="form-group">
                <label>Assigned To</label>
                <select id="editAssigned">
                    <option value="Unassigned" ${issue.oAssigned === 'Unassigned' ? 'selected' : ''}>Unassigned</option>
                    ${peopleOptions}
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Status</label>
                <select id="editStatus">
                    <option value="open"     ${issue.oStatus === 'open'     ? 'selected' : ''}>Open</option>
                    <option value="resolved" ${issue.oStatus === 'resolved' ? 'selected' : ''}>Resolved</option>
                    <option value="overdue"  ${issue.oStatus === 'overdue'  ? 'selected' : ''}>Overdue</option>
                </select>
            </div>
            <div class="form-group">
                <label>Priority</label>
                <select id="editPriority">
                    <option value="low"    ${issue.oPriority === 'low'    ? 'selected' : ''}>Low</option>
                    <option value="medium" ${issue.oPriority === 'medium' ? 'selected' : ''}>Medium</option>
                    <option value="high"   ${issue.oPriority === 'high'   ? 'selected' : ''}>High</option>
                </select>
            </div>
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>Target Date</label>
                <input type="date" id="editTarget" value="${issue.oTarget || ''}">
            </div>
            <div class="form-group">
                <label>Actual Date</label>
                <input type="date" id="editActual" value="${issue.oActual || ''}">
            </div>
        </div>
        <div class="form-row">
            <div class="form-group" style="grid-column:1/-1">
                <label>Resolution Summary</label>
                <textarea id="editResolution" rows="2">${issue.oResolution || ''}</textarea>
            </div>
        </div>
    `;
    document.getElementById('editModalOverlay').classList.remove('hidden');
}

function closeEditModal() {
    document.getElementById('editModalOverlay').classList.add('hidden');
}


function saveChanges() {
    let issues = JSON.parse(localStorage.getItem("localIssues"));
    issues[currentEditIndex] = {
        ...issues[currentEditIndex],
        oSummary:    document.getElementById('editSummary').value,
        oDetailed:   document.getElementById('editDetailed').value,
        oProject:    document.getElementById('editProject').value,
        oAssigned:   document.getElementById('editAssigned').value,
        oStatus:     document.getElementById('editStatus').value,
        oPriority:   document.getElementById('editPriority').value,
        oTarget:     document.getElementById('editTarget').value,
        oActual:     document.getElementById('editActual').value,
        oResolution: document.getElementById('editResolution').value
    };
    localStorage.setItem("localIssues", JSON.stringify(issues));
    closeEditModal();
    displayIssues();
}

function toggleIssueForm() {
    const wrap = document.getElementById('IssueFormWrap');
    const isHidden = wrap.classList.contains('hidden');
    if (isHidden) {
        wrap.classList.remove('hidden');
        initReportIssueForm();
    } else {
        wrap.classList.add('hidden');
    }
}

function initReportIssueForm() {
    const projectSelect = document.getElementById("project");
    if (!projectSelect) return;

    // Populate project dropdown
    const projects = JSON.parse(localStorage.getItem("localProjects")) || [];
    projectSelect.innerHTML = '<option value="">-- Select Project --</option>';
    projects.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.oProName;
        opt.textContent = p.oProName;
        projectSelect.appendChild(opt);
    });

    const assignSelect = document.getElementById("assign");
    const people = JSON.parse(localStorage.getItem("localPeople")) || [];
    assignSelect.innerHTML = '<option value="">-- Select Person --</option>';
    people.forEach(p => {
        const opt = document.createElement("option");
        opt.value = p.oPerUsername;
        opt.textContent = `${p.oPerName} ${p.oPerSurname}`;
        assignSelect.appendChild(opt);
    });

     document.getElementById("date").value = new Date().toISOString().split('T')[0];


    // Auto-generate ID
    document.getElementById("issueID").value = generateIssueID();

    // Cancel button
    document.getElementById("reportBugCloseBtn").onclick = toggleIssueForm;

    // Submit
    const form = document.getElementById("reportBugForm");
    form.onsubmit = function(e) {
        e.preventDefault();
        createIssue();
    };
}
// Find start here
function generateIssueID() {
    const issues = JSON.parse(localStorage.getItem("localIssues")) || [];
    if (issues.length === 0) return "1";
    const highest = issues.reduce((max, i) => Math.max(max, parseInt(i.oIssueID, 10)), 0);
    return (highest + 1).toString();
}

function createIssue() {
    const newIssue = {
        oIssueID:  document.getElementById("issueID").value,
        oSummary:  document.getElementById("summary").value,
        oDetailed: document.getElementById("detailed").value,
        oWho:      document.getElementById("who").value,
        oDate:     document.getElementById("date").value,
        oProject:  document.getElementById("project").value,
        oAssigned: document.getElementById("assign").value,
        oStatus:   "open",
        oPriority: document.getElementById("priority").value,
        oTarget: "", oActual: "", oResolution: ""
    };
    const issues = JSON.parse(localStorage.getItem("localIssues")) || [];
    issues.push(newIssue);
    localStorage.setItem("localIssues", JSON.stringify(issues));
    document.getElementById("reportBugForm").reset();
    toggleIssueForm();
    displayIssues();
}

// ── POPULATE PROJECT FILTER DROPDOWN ─────────────────────
function populateIssueProjectFilter() {
    const select = document.getElementById('issueFilterProject');
    if (!select) return;
    const projects = JSON.parse(localStorage.getItem("localProjects")) || [];
    select.innerHTML = '<option value="">All Projects</option>';
    projects.forEach(p => {
        const opt = document.createElement('option');
        opt.value = p.oProName;
        opt.textContent = p.oProName;
        select.appendChild(opt);
    });
}