# Bug Crusher 3000 - Bug Tracking System Documentation

## Table of Contents

1. Overview
2. System Features
3. Dashboard Analytics
4. Module Guide
5. Technical Implementation
6. User Interface
7. Usage Guide
8. Sample Data
9. Workflow Example
10. Requirements Met
11. Installation and Setup
12. Tips and Best Practices
13. Possible Enhancements

---

## 1. Overview

Bug Crusher 3000 is a comprehensive bug tracking system designed to help development teams manage, track, and resolve software issues efficiently. The system provides an intuitive dashboard, full CRUD operations for issues, project management, and team member management.

Login Credentials:
- Username: dVader
- Password: thechoosenone

---

## 2. System Features

Core Functionality:

- Issue Tracking - Create, view, edit, and resolve bugs or issues
- Project Management - Organize issues by project categories
- Team Management - Manage team members with optional profile pictures
- Dashboard Analytics - Visual charts showing system metrics
- Dark and Light Mode - Toggle between themes for comfortable viewing
- Data Persistence - All data saved via localStorage API

Issue Fields Captured:

- Summary and detailed description
- Priority (Low, Medium, High)
- Status (Open, Resolved, Overdue)
- Project association
- Assignment to team member
- Target and actual resolution dates
- Resolution summary
- Who identified the issue
- Date identified

---

## 3. Dashboard Analytics

The dashboard provides four interactive charts:

Chart 1 - Issues By Priority (Doughnut Chart)
- Visual breakdown of low, medium, and high priority issues

Chart 2 - Issues By Project (Stacked Bar Chart)
- Shows open, resolved, and overdue issues per project

Chart 3 - Most Issues Solved (Horizontal Bar Chart)
- Top three team members by resolved issues
- Displays profile pictures when available

Chart 4 - Issues by Status Over Time (Line Chart)
- Monthly trend of open versus overdue issues

All charts update automatically based on current data and theme changes.

---

## 4. Module Guide

Dashboard Module
- Landing page showing key metrics and visual analytics
- Central hub for system overview

View and Edit Issues Module
- Search: Filter issues by summary, description, or assignee
- Filter: By priority level or project
- Sort: By urgency (priority) or status
- View/Edit button: Opens modal with complete issue details
- Mark Resolved button: Toggle issue resolution status

Create Project Module
- Add new projects with unique names
- Search and sort existing projects
- View issue count per project
- Projects automatically link to issues

Create Person Module
- Required fields: Username, Email, First Name, Last Name
- Optional: Profile picture upload (supports images)
- Automatic ID generation
- Persons appear in issue assignment dropdowns

---

## 5. Technical Implementation

Technology Stack:

- HTML5 - Structure and semantic markup
- CSS3 - Styling with CSS variables for theming
- JavaScript (ES6+) - Application logic and DOM manipulation
- Chart.js - Data visualization library
- localStorage API - Client-side data persistence

Data Structure - Issue Object:

{
  oIssueID: string,
  oSummary: string,
  oDetailed: string,
  oWho: string,
  oDate: string,
  oProject: string,
  oAssigned: string,
  oStatus: 'open' or 'resolved' or 'overdue',
  oPriority: 'low' or 'medium' or 'high',
  oTarget: string,
  oActual: string,
  oResolution: string
}

Data Structure - Person Object:

{
  oPerID: string,
  oPerUsername: string,
  oPerName: string,
  oPerSurname: string,
  oPerEmail: string,
  oPerPic: string (base64) or null
}

Data Structure - Project Object:

{
  oProID: string,
  oProName: string
}

localStorage Keys:

- localAdmin - Admin account credentials
- localPeople - Team members collection
- localProjects - Projects collection
- localIssues - Issues collection
- theme - User's theme preference

---

## 6. User Interface

Theme System:
- CSS variables for easy theme management
- Dark mode with carefully selected color palettes
- Theme preference persists across sessions
- Charts automatically adapt to theme changes

Responsive Design:
- Grid-based layouts for optimal space usage
- Flexible card components
- Mobile-friendly navigation sidebar

Visual Indicators:
- Priority: Colored borders on issue cards (Red for High, Orange for Medium, Purple for Low)
- Status: Color-coded badges with appropriate backgrounds
- Icons: SVG icons for navigation and action buttons

---

## 7. Usage Guide

Creating an Issue:

Step 1: Navigate to View And Edit Issues
Step 2: Click the Report Issue button
Step 3: Fill in all required fields including summary, detailed description, project, priority, and optional assignment
Step 4: The date identified field auto-populates with current date
Step 5: Click Submit to save the issue

Editing an Issue:

Step 1: Find the issue card in the issues list
Step 2: Click the View or Edit button
Step 3: Modify any field in the modal dialog including summary, description, assignment, project, priority, status, target date, actual date, and resolution summary
Step 4: Click Save Changes to persist updates

Managing Projects:

Step 1: Navigate to Create Project section
Step 2: Search existing projects using the search bar
Step 3: Click New Project to add a project
Step 4: Enter a unique project name
Step 5: Press Enter or click Save Project

Adding Team Members:

Step 1: Navigate to Create Person section
Step 2: Fill in username, email, first name, and last name
Step 3: Optionally upload a profile picture by clicking the upload area
Step 4: Click Create Person to save

---

## 8. Sample Data

The system automatically populates with 12 sample issues across 4 projects when first loaded.

Projects:
- Web Application
- Mobile App
- Backend API
- Database Migration

Team Members:
- John Doe (username: jDoe)
- Jekyll Hyde (username: jHyde)
- Tony Stark (username: tStark)
- Harry Potter (username: hPotter)

Sample Issues Include:
- High priority: API response time issues, memory leaks
- Medium priority: UI bugs, notification issues
- Low priority: Typo fixes, styling inconsistencies

Each sample issue includes varied attributes including entry dates, resolution dates, target dates, priority levels, and assigned persons for testing purposes.

---

## 9. Workflow Example

Complete Bug Lifecycle:

Step 1 - Create: QA tester reports bug via issue form with summary, description, and priority

Step 2 - Assign: Manager assigns issue to developer (or assignment can be done later via edit)

Step 3 - View: Developer sees issue in dashboard or issues list

Step 4 - Work: Developer investigates and fixes the bug

Step 5 - Update: Developer adds resolution summary and actual resolution date

Step 6 - Resolve: Mark issue as resolved or close it

Step 7 - Persist: All changes automatically saved to localStorage

The system tracks the issue from creation through resolution with complete history available.

---

## 10. Requirements Met

Core Functional Requirements:

- Issue Creation: Captures all required fields including summary, description, person, dates, project, status, priority, and resolution details
- Issue Assignment: Supports assigning and reassigning issues including delayed assignment
- View All Issues: Clear structured overview with meaningful fields including status and priority
- View Single Issue: Complete and intuitive display of all issue details
- Edit and Update Issue: Ability to update relevant fields with correct persistence
- People Management: Proper structure with ID, name, surname, email, and username
- Project Management: Projects defined and correctly linked to issues
- Data Persistence: All entities including issues, people, and projects persist across sessions using localStorage

System Logic and Integration:

- Status and Priority Logic: Correct use of status values (open, resolved, overdue) and priority values (low, medium, high) with logical consistency across the system
- End-to-End Workflow Integration: Demonstrates full lifecycle from create to assign to view to edit to persist with features working cohesively

Bonus Features Implemented:

- Profile picture upload for team members
- Dark and Light mode toggle with persistence
- Interactive dashboard charts with real-time updates
- Search, filter, and sort capabilities on issues and projects
- Responsive design for various screen sizes

---

## 11. Installation and Setup

Installation Steps:

Step 1: Clone or download all files to a local directory

Step 2: Ensure the following file structure exists:

project/
- index.html (login page)
- home.html (main application)
- style.css
- login-page-style.css
- app.js
- dashboard.js
- document.md
- projects.js
- Issues (View, create and edit).js
- create-people-handerler.js
- login-handler.js
- sampleData.js
- images/ (directory for logo files)
  - Light_Mode_Logo.png
  - Dark_Mode_Logo.png

Step 3: Open index.html in a web browser (Chrome, Firefox, or Edge recommended)

Step 4: Login using the provided admin credentials

Step 5: Begin tracking bugs

No server or database setup is required as the application runs entirely in the browser using localStorage.

---

## 12. Tips and Best Practices

Use meaningful issue summaries to make searching easier for team members

Set realistic target dates to help identify overdue issues accurately

Add detailed resolution summaries to provide context for future reference

Upload profile pictures to personalize the dashboard chart display

Regularly check the dashboard to monitor open and overdue issues

Use the search and filter features to quickly locate specific issues

Assign issues promptly to ensure accountability and tracking

Update issue status regularly to maintain accurate project metrics

---

## 13. Possible Enhancements

Email notifications for newly assigned issues

Comment threads on individual issues for team discussion

File attachments for screenshots and logs

Issue history and audit log showing all changes

Export data to CSV or PDF formats for reporting

User roles with different permissions (admin, developer, viewer)

API endpoints for external system integration

Bulk issue operations for mass updates

Custom issue fields for project-specific needs

Integration with version control systems

---

## Document Information

Document Version: 1.0
Last Updated: 2026
Author: Group Project Team
Purpose: User and technical documentation for Bug Crusher 3000 Bug Tracking System

---