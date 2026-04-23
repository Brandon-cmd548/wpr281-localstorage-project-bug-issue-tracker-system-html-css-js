// ── Storage helpers ───────────────────────────────────────

function getDashboardIssues() {
    return JSON.parse(localStorage.getItem('localIssues')) || [];
}

function getDashboardProjects() {
    return JSON.parse(localStorage.getItem('localProjects')) || [];
}

function getDashboardPeople() {
    return JSON.parse(localStorage.getItem('localPeople')) || [];
}

// ── Theme ─────────────────────────────────────────────────

function getThemeColor() {
    return getComputedStyle(document.body).getPropertyValue('--text').trim();
}

// ── Chart: Issues by Priority ─────────────────────────────

function getPriorityCounts(issues) {
    return {
        low:    issues.filter(i => i.oPriority === 'low').length,
        medium: issues.filter(i => i.oPriority === 'medium').length,
        high:   issues.filter(i => i.oPriority === 'high').length
    };
}

function IssuesByPriorityChart() {
    const issues = getDashboardIssues();
    const counts = getPriorityCounts(issues);
    const ctx    = document.getElementById('byPriority').getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Low', 'Medium', 'High'],
            datasets: [{
                label: 'Priority',
                data: [counts.low, counts.medium, counts.high],
                backgroundColor: ['#a855f7', '#f97316', '#ef4444']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'Issues By Priority', color: getThemeColor() },
                legend: { position: 'right', labels: { color: getThemeColor() } }
            }
        }
    });
}

// ── Chart: Issues by Project ──────────────────────────────

function getProjectStatusCounts(issues, projects) {
    return projects.map(p => ({
        name:     p.oProName,
        open:     issues.filter(i => i.oProject === p.oProName && i.oStatus === 'open').length,
        resolved: issues.filter(i => i.oProject === p.oProName && i.oStatus === 'resolved').length,
        overdue:  issues.filter(i => i.oProject === p.oProName && i.oStatus === 'overdue').length
    }));
}

function IssuesByProjectChart() {
    const issues   = getDashboardIssues();
    const projects = getDashboardProjects();
    const data     = getProjectStatusCounts(issues, projects);
    const ctx      = document.getElementById('byProject').getContext('2d');

    const labels       = data.map(d => d.name);
    const openCounts    = data.map(d => d.open);
    const resolvedCounts = data.map(d => d.resolved);
    const overdueCounts  = data.map(d => d.overdue);

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels,
            datasets: [
                { label: 'Open',     data: openCounts,     backgroundColor: '#4ade80' },
                { label: 'Resolved', data: resolvedCounts, backgroundColor: '#94a3b8' },
                { label: 'Overdue',  data: overdueCounts,  backgroundColor: '#f87171' }
            ]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'Issues By Project', color: getThemeColor() },
                legend: { labels: { color: getThemeColor() } }
            },
            scales: {
                x: {
                    stacked: true,
                    min: 0,
                    suggestedMax: Math.max(...data.map(d => d.open + d.resolved + d.overdue)) + 1,
                    ticks: { color: getThemeColor() },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                },
                y: {
                    stacked: true,
                    ticks: { color: getThemeColor() },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                }
            }
        }
    });
}

// ── Chart: Most Issues Resolved by Person ─────────────────

function getResolvedCountsPerPerson(issues, people) {
    return people.map(p => ({
        username: p.oPerName,
        issuesResolved: issues.filter(i => i.oAssigned === p.oPerUsername && i.oStatus === 'resolved').length
    }));
}

function getTopResolvers(people, limit = 3) {
    const issues = getDashboardIssues();
    return getResolvedCountsPerPerson(issues, people)
        .sort((a, b) => b.issuesResolved - a.issuesResolved)
        .slice(0, limit);
}

function buildAvatarPlugin(resolvers, colors) {
    // Pre-load images for people who have profile pictures
    const people = getDashboardPeople();
    const imageCache = {};
    people.forEach(p => {
        if (p.oPerPic) {
            const img = new Image();
            img.src = p.oPerPic;
            imageCache[p.oPerName] = img;
        }
    });

    return {
        id: 'avatarPlugin',
        afterDraw(chart) {
            const ctx  = chart.ctx;
            const meta = chart.getDatasetMeta(0);
            meta.data.forEach((bar, index) => {
                const resolver = resolvers[index];
                const x = bar.x + 24;
                const y = bar.y;
                const radius = 14;

                ctx.save();
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, Math.PI * 2);
                ctx.closePath();
                ctx.clip();

                const img = imageCache[resolver.username];
                if (img && img.complete && img.naturalWidth > 0) {
                    ctx.drawImage(img, x - radius, y - radius, radius * 2, radius * 2);
                } else {
                    // Fallback: coloured circle with initial
                    ctx.fillStyle = colors[index];
                    ctx.fill();
                    ctx.restore();
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 11px Segoe UI';
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText(resolver.username[0].toUpperCase(), x, y);
                    return;
                }

                ctx.restore();
            });
        }
    };
}

function issuesResolvedBy() {
    const people    = getDashboardPeople();
    const resolvers = getTopResolvers(people);
    const colors    = ['#19a3b5', '#dce61b', '#0aee12'];
    const ctx       = document.getElementById('byPerson').getContext('2d');

    new Chart(ctx, {
        plugins: [buildAvatarPlugin(resolvers, colors)],
        type: 'bar',
        data: {
            labels: resolvers.map(r => r.username),
            datasets: [{ data: resolvers.map(r => r.issuesResolved), backgroundColor: colors }]
        },
        options: {
            layout: { padding: { right: 50 } },
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'Most Issues Solved', color: getThemeColor() },
                legend: { display: false }
            },
            scales: {
                x: {
                    min: 0,
                    suggestedMax: Math.max(...resolvers.map(r => r.issuesResolved)) + 1,
                    ticks: { color: getThemeColor() },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                },
                y: {
                    ticks: { color: getThemeColor() },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                }
            }
        }
    });
}

// ── Chart: Issues by Status Over Time ─────────────────────

function parseIssueMonth(dateStr) {
    const [, month] = dateStr.split('/');
    return parseInt(month) - 1;
}

function getMonthlyStatusCounts(issues) {
    const open    = new Array(12).fill(0);
    const overdue = new Array(12).fill(0);

    issues.forEach(issue => {
        const month = parseIssueMonth(issue.oDate);
        if (issue.oStatus === 'open')    open[month]++;
        if (issue.oStatus === 'overdue') overdue[month]++;
    });

    return { open, overdue };
}

function IssuesByStatusOverTime() {
    const issues  = getDashboardIssues();
    const { open, overdue } = getMonthlyStatusCounts(issues);
    const ctx     = document.getElementById('ByMonth').getContext('2d');
    const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Open',
                    data: open,
                    borderColor: 'rgb(74, 222, 128)',
                    backgroundColor: 'rgba(74, 222, 128, 0.3)',
                    tension: 0.4,
                    fill: true
                },
                {
                    label: 'Overdue',
                    data: overdue,
                    borderColor: '#f87171',
                    backgroundColor: 'rgba(248, 113, 113, 0.3)',
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title:  { display: true, text: 'Issues by Status Over Time', color: getThemeColor() },
                legend: { position: 'bottom', labels: { color: getThemeColor() } }
            },
            scales: {
                y: {
                    min: 0,
                    suggestedMax: Math.max(...open, ...overdue) + 1,
                    ticks: { color: getThemeColor(), stepSize: 1 },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                },
                x: {
                    ticks: { color: getThemeColor() },
                    grid:  { color: 'rgba(128,128,128,0.15)' }
                }
            }
        }
    });
}

// ── Render all charts ─────────────────────────────────────

function renderAllCharts() {
    IssuesByPriorityChart();
    IssuesByProjectChart();
    issuesResolvedBy();
    IssuesByStatusOverTime();
}