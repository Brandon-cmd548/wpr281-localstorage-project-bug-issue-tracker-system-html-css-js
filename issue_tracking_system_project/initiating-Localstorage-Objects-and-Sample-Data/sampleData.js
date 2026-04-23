
localStorage.clear();
console.log("local cleared");

// we will create a function to call an array containing multibe objects of people, projects and issues for sample data.
function sampleData() {

    let sampleAdmin = [
        {oAdminID: '1', oAdminName: "Darth", oAdminSurname: "Vader", oAdminEmail: "darth@gmail.com", oAdminUsername: "dVader", oAdminPassword: "thechoosenone"}
    ]

    // Stored sample people data to call for assigning issues to.
    // A person must have an id, name, surname, email address, and unique username. Add a profile picture for bonus marks. 
    let samplePeople = [
        { oPerID: '1', oPerName: 'John', oPerSurname: 'Doe', oPerEmail: 'john@example.com', oPerUsername: 'jDoe' },
        { oPerID: '2', oPerName: 'Jekyll', oPerSurname: 'Hyde', oPerEmail: 'Jekyll@example.com', oPerUsername: 'jHyde' },
        { oPerID: '3', oPerName: 'Tony', oPerSurname: 'Stark', oPerEmail: 'Tony@example.com', oPerUsername: 'tStark' },
        { oPerID: '4', oPerName: 'Harry', oPerSurname: 'Potter', oPerEmail: 'Harry@example.com', oPerUsername: 'hPotter' }
    ];

    // Stored sample project data for the place the issue was identified in.
    // A project must have an id and name. A name is any valid string.
    let sampleProjects = [
            { oProID: '1', oProName: 'Web Application' },
            { oProID: '2', oProName: 'Mobile App' },
            { oProID: '3', oProName: 'Backend API' },
            { oProID: '4', oProName: 'Database Migration' }
        ];

    // stored sample issues for populating the local server for testing the project
    /*The following information is required for a valid issue:   
    0)Issue ID for calling and editing
    1)Summary of the issue that was discovered   
    2)Detailed description of the issue   
    3)Who identified the issue   
    4)The date on which the issue was identified   
    5)Which project the issue is related to   
    6)Who the issue is assigned to (this can be null and assigned later in the edit issue button)  
    7)A status of the issue [open/ resolved/ overdue]   
    8)Priority of the issue [ low/ medium/ high]   
    9)Target resolution date   
    10)Actual resolution date   
    11)Resolution summary*/
    let sampleIssues = [
            {
                oIssueID: '1',
                oSummary: 'Login page not working in Safari',
                oDetailed: 'Users cannot log in using Safari browser. Console shows CORS error.',
                oWho: 'User1',
                oDate: '20/01/2025',
                oProject: 'Web Application',
                oAssigned: 'jDoe',
                oStatus: 'open',
                oPriority: 'low',
                oTarget: '25/01/2027',
                oActual: '10/02/2027',
                oResolution: 'CORS policy updated to allow Safari browser requests.'
            },
            {
                oIssueID: '2',
                oSummary: 'Mobile menu collapses unexpectedly',
                oDetailed: 'The hamburger menu closes immediately after opening on Android devices.',
                oWho: 'User2',
                oDate: '20/02/2025',
                oProject: 'Mobile App',
                oAssigned: 'jHyde',
                oStatus: 'resolved',
                oPriority: 'medium',
                oTarget: '25/02/2025',
                oActual: '10/03/2025',
                oResolution: 'Fixed JavaScript event listener causing menu to close instantly.'
            },
            {
                oIssueID: '3',
                oSummary: 'API response time > 5 seconds',
                oDetailed: 'The /users endpoint is taking too long to respond under load.',
                oWho: 'User3',
                oDate: '20/03/2025',
                oProject: 'Backend API',
                oAssigned: 'tStark',
                oStatus: 'overdue',
                oPriority: 'high',
                oTarget: '25/03/2027',
                oActual: '10/04/2027',
                oResolution: 'Optimized database queries and added caching to reduce response time.'
            },
            {
                oIssueID: '4',
                oSummary: 'Fixed user profile update',
                oDetailed: 'Profile updates now persist correctly.',
                oWho: 'User4',
                oDate: '20/04/2025',
                oProject: 'Database Migration',
                oAssigned: 'hPotter',
                oStatus: 'open',
                oPriority: 'medium',
                oTarget: '25/04/2027',
                oActual: '10/05/2027',
                oResolution: 'Resolved database write issue ensuring profile updates are saved.'
            },
            {
                oIssueID: '5',
                oSummary: 'Database connection pool exhausted',
                oDetailed: 'Connections not being released properly after queries.',
                oWho: 'User5',
                oDate: '20/05/2025',
                oProject: 'Web Application',
                oAssigned: 'jDoe',
                oStatus: 'overdue',
                oPriority: 'high',
                oTarget: '25/05/2025',
                oActual: '10/06/2025',
                oResolution: 'Implemented proper connection closing and pooling strategy.'
            },
            {
                oIssueID: '6',
                oSummary: 'Typo in welcome email template',
                oDetailed: 'Subject line has a spelling error.',
                oWho: 'User6',
                oDate: '20/06/2025',
                oProject: 'Mobile App',
                oAssigned: 'tStark',
                oStatus: 'open',
                oPriority: 'low',
                oTarget: '25/06/2027',
                oActual: '10/07/2027',
                oResolution: 'Corrected spelling mistake in email subject template.'
            },
            {
                oIssueID: '7',
                oSummary: 'Push notifications not working on iOS',
                oDetailed: 'iOS devices not receiving push notifications after update.',
                oWho: 'User7',
                oDate: '20/07/2025',
                oProject: 'Backend API',
                oAssigned: 'hPotter',
                oStatus: 'resolved',
                oPriority: 'medium',
                oTarget: '25/07/2027',
                oActual: '10/08/2027',
                oResolution: 'Updated notification service configuration for iOS compatibility.'
            },
            {
                oIssueID: '8',
                oSummary: 'Rate limiting not applied correctly',
                oDetailed: 'Some IPs can bypass rate limits.',
                oWho: 'User8',
                oDate: '20/08/2025',
                oProject: 'Database Migration',
                oAssigned: 'jDoe',
                oStatus: 'open',
                oPriority: 'high',
                oTarget: '25/08/2025',
                oActual: '10/09/2025',
                oResolution: 'Fixed rate limiting logic to correctly track all incoming requests.'
            },
            {
                oIssueID: '9',
                oSummary: 'Migration script failed on production',
                oDetailed: 'Foreign key constraint error during migration.',
                oWho: 'User9',
                oDate: '20/09/2025',
                oProject: 'Database Migration',
                oAssigned: 'jDoe',
                oStatus: 'open',
                oPriority: 'high',
                oTarget: '25/09/2027',
                oActual: '10/10/2027',
                oResolution: 'Adjusted migration script to handle foreign key dependencies correctly.'
            },
            {
                oIssueID: '10',
                oSummary: 'Dark mode colors inconsistent',
                oDetailed: 'Some text is unreadable in dark mode.',
                oWho: 'User10',
                oDate: '20/10/2025',
                oProject: 'Mobile App',
                oAssigned: 'jHyde',
                oStatus: 'resolved',
                oPriority: 'low',
                oTarget: '25/10/2025',
                oActual: '10/11/2025',
                oResolution: 'Updated CSS styles to improve contrast in dark mode.'
            },
            {
                oIssueID: '11',
                oSummary: 'Memory leak in background service',
                oDetailed: 'App memory usage grows over time when running in background.',
                oWho: 'User11',
                oDate: '20/11/2025',
                oProject: 'Backend API',
                oAssigned: 'jHyde',
                oStatus: 'overdue',
                oPriority: 'high',
                oTarget: '25/11/2027',
                oActual: '10/12/2027',
                oResolution: 'Fixed memory leak by properly disposing unused objects.'
            },
            {
                oIssueID: '12',
                oSummary: 'Incorrect error message on 404',
                oDetailed: 'Returns 500 instead of 404 for missing resources.',
                oWho: 'User12',
                oDate: '20/12/2025',
                oProject: 'Web Application',
                oAssigned: 'hPotter',
                oStatus: 'open',
                oPriority: 'medium',
                oTarget: '25/12/2025',
                oActual: '10/01/2026',
                oResolution: 'Corrected error handling to return proper 404 status codes.'
            }
        ];

// Now we save the created arrray of object sample data to the corrospanding local storage key
// we use a if statement to check if there is alredy a value stored in local storage

if (!localStorage.getItem("localAdmin")) {
    localStorage.setItem("localAdmin", JSON.stringify(sampleAdmin));
}

if (!localStorage.getItem("localPeople")) {
    localStorage.setItem("localPeople", JSON.stringify(samplePeople));
    console.log("new data people");
    
}

if (!localStorage.getItem("localProjects")) {
    localStorage.setItem("localProjects", JSON.stringify(sampleProjects));
    console.log("new data projects");
}

if (!localStorage.getItem("localIssues")) {
    localStorage.setItem("localIssues", JSON.stringify(sampleIssues));
    console.log("new data issues");
}

}

// this will execute sampleData() function to store sample data
sampleData();

function viewSampleData() {
    let peopleFromStorage = JSON.parse(localStorage.getItem("localPeople"));
    let projectsFromStorage = JSON.parse(localStorage.getItem("localProjects"));
    let issuesFromStorage = JSON.parse(localStorage.getItem("localIssues"));
    console.log(peopleFromStorage);
    console.log(projectsFromStorage);
    console.log(issuesFromStorage);
}

// this will execute viewSampleData() to see log sample data
viewSampleData();