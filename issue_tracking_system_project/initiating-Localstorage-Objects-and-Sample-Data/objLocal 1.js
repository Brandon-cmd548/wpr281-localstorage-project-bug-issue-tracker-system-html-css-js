/*
this is only to initiate a base for others to take and modify when creating a person, issue, and project

// creating a function to store the create issue form input values into an object to add into local storage with corresponding key
function createIssue() {

    let issueID = document.getElementById("fIssueID").value;
    let summary = document.getElementById("fSummary").value;
    let detailed = document.getElementById("fDetailed").value;
    let who = document.getElementById("fWho").value;
    let date = document.getElementById("fDate").value;
    let project = document.getElementById("fProject").value;
    let assigned = document.getElementById("fAssigned").value;
    let target = document.getElementById("fTarget").value;
    let actual = document.getElementById("fActual").value;
    let resolution = document.getElementById("fResolution").value;
    let status = document.getElementById("fStatus").value;
    let priority = document.getElementById("fPriority").value;

    let oIssue = {
        oIssueID: issueID,
        oSummary: summary,
        oDetailed: detailed,
        oWho: who,
        oDate: date,
        oProject: project,
        oAssigned: assigned,
        oStatus: status,
        oPriority: priority,
        oTarget: target,
        oActual: actual,
        oResolution: resolution
    }

let stringIssues = JSON.stringify(oIssue);
localStorage.setItem("localIssues",  stringIssues);
}
createIssue();

// creating a function to store the create person form input values into an object to add into local storage with corresponding key
function createPerson() {
    let perID = document.getElementById("fPerID").value;
    let perName = document.getElementById("fPerName").value;
    let perSurname = document.getElementById("fPerSurname").value;
    let perEmail = document.getElementById("fPerEmail").value;
    let perUsername = document.getElementById("fPerUsername").value;

    let oPeople = {
        oPerID: perID,
        oPerName: perName,
        oPerSurname: perSurname,
        oPerEmail: perEmail,
        oPerUsername: perUsername
    };

let stringPeople = JSON.stringify(samplePeople);
localStorage.setItem("localPeople", stringPeople);
}
createPerson();

// creating a function to store the create project form input values into an object to add into local storage with corresponding key
function createProject() {
    let proID = document.getElementById("fProID").value;
    let proName = document.getElementById("fProName").value;

    let oProject = {
        oProID: proID,
        oProName: proName,
    };

let stringProjects = JSON.stringify(sampleProjects);
localStorage.setItem("localProjects", stringProjects);
}
createProject();

*/