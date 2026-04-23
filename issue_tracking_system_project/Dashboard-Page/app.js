function showSection(id, el) {
    document.querySelectorAll('.section').forEach(s => s.classList.add('hidden'));
    document.getElementById(id).classList.remove('hidden');

    document.querySelectorAll('#navigation li').forEach(li => li.classList.remove('active'));
    el.classList.add('active');

    if (id === 'projects') renderProjects();
    if (id === 'issues') {
        populateIssueProjectFilter();
        displayIssues();
    };
    if (id === 'people') initPeopleForm();
}
function themeChange() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    document.documentElement.dataset.theme = isDark ? '' : 'dark';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    document.getElementById('themeLabel').textContent = isDark ? 'Dark Mode' : 'Light Mode';

    setTimeout(() => {
        Object.values(Chart.instances).forEach(chart => chart.destroy());
        renderAllCharts();
    }, 50);

     if (localStorage.getItem('theme') === 'dark') {
        document.documentElement.dataset.theme = 'dark';
        document.getElementById('themeLabel').textContent = 'Light Mode';
    }
}
// overdue status check
function updateOverdueStatus() {
    const issues = JSON.parse(localStorage.getItem("localIssues")) || [];
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time for accurate date comparison
    
    let changed = false;
    
    issues.forEach(issue => {
        // check open issues that have a target date
        if (issue.oStatus === 'open' && issue.oTarget) {
            // Parse the target date
            let targetDate;
            if (issue.oTarget.includes('-')) {
                targetDate = new Date(issue.oTarget);
            } else if (issue.oTarget.includes('/')) {
                const parts = issue.oTarget.split('/');
                targetDate = new Date(parts[2], parts[1] - 1, parts[0]);
            }
            
            if (targetDate && targetDate < today) {
                issue.oStatus = 'overdue';
                changed = true;
            }
        }
    });
    
    if (changed) {
        localStorage.setItem("localIssues", JSON.stringify(issues));
    }
}
document.addEventListener('DOMContentLoaded', function () {
    renderAllCharts();
    renderProjects();
    updateOverdueStatus();
});
