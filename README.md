# WPRG281 Bug / Issue Tracking System (localStorage)

A browser-based **Issue Tracking System** built for the **WPRG281 Web Programming** group project.  
The system allows an admin user to **create**, **assign**, **view**, and **edit** issues (tickets) linked to projects and people, with **data persistence using the Web Storage API (localStorage)**.

---

## 📌 Project Overview

This application simulates a lightweight bug/issue tracker similar to what development teams use during software projects.  
All issues are stored as "tickets" with key details such as:

- summary + description
- who reported the issue + date reported
- project the issue belongs to
- assignee (or unassigned)
- status and priority
- resolution-related fields (if applicable)

The goal was to implement an end-to-end workflow that demonstrates:

> Create → Assign → View → Edit → Persist (localStorage)

---

## ✅ Core Features

### 🧾 Issue (Ticket) Management
- Create a new issue ticket with required fields
- Assign an issue to a person (or leave unassigned)
- Set and update issue status: **open / resolved / overdue**
- Set and update priority: **low / medium / high**
- View all issues (dashboard/summary list)
- View a single issue with full details
- Edit existing issues and persist updates

### 👤 People Management
- Store and manage people that issues can be assigned to
- People contain: **id, name, surname, email, username**  
  *(profile picture optional/bonus depending on implementation)*

### 📁 Project Management
- Store and manage projects
- Projects contain: **id, name**

### 💾 Data Persistence
- All data persists across sessions using **localStorage**:
  - Projects list
  - People list
  - Issues list

---

## 🧱 Data Model (localStorage Structure)

The app stores data in localStorage keys (example naming):

- `localPeople` → array of people objects
- `localProjects` → array of project objects
- `localIssues` → array of issue objects

- ## 🧠 Skills Demonstrated
- DOM manipulation and event handling
- Form validation
- localStorage persistence (JSON stringify/parse)
- CRUD workflows
- UI structure and navigation

``
## 🤝 Contributors (Work Split)

- **Ruan Megit (Person 1):** Data layer — Person/Project/Issue objects, localStorage setup, seed data  
  - GitHub: [Ruan3174](https://github.com/Ruan3174)  
  - LinkedIn: [Ruan Megit](https://www.linkedin.com/in/ruan-megit-385256349)  

- **Brandon Zander Purcell (Person 2):** Create Issue — form/modal, dropdowns, save new issue to localStorage, return to dashboard  
  - GitHub: [Brandon-cmd548](https://github.com/Brandon-cmd548)  
  - LinkedIn: [Brandon Purcell](https://www.linkedin.com/in/brandon-purcell-89114736a)  

- **Sange Tyhali (Person 3):** View & Edit Issues — view all, view one, edit with save/cancel, navigation back to dashboard  
  - GitHub: [add link]  
  - LinkedIn: [add link]  

- **Jude Bridger (Person 4):** People & Login — people page and login page  
  - GitHub: [add link]  
  - LinkedIn: [add link]  

- **Mugisho Muguruka (Person 5):** Projects & Dashboard — projects page and dashboard page  
  - GitHub: [add link]  
  - LinkedIn: [add link]  
``

### Example: Issue Object Shape
```js
{
  oIssueID: "13",
  oSummary: "Login page not working in Safari",
  oDetailed: "Users cannot log in using Safari browser...",
  oWho: "User1",
  oDate: "2026-04-14",
  oProject: "Web Application",
  oAssigned: "Unassigned",
  oStatus: "open",
  oPriority: "medium",
  oTarget: "",
  oActual: "",
  oResolution: ""
}
``

