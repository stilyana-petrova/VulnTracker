# VulnTracker

VulnTracker is a lightweight vulnerability management dashboard for small IT and security teams. It helps analysts keep security findings in one place, understand which issues need attention first, and track remediation through to resolution.

## The problem

Vulnerability findings often arrive through different scanners, reports, and team members. When they are scattered across spreadsheets and messages, teams can lose track of affected systems, remediation owners, deadlines, and the issues that pose the greatest risk.

VulnTracker provides a shared register for organizing and reviewing those findings. The initial version focuses on visibility and remediation tracking. It does not scan systems or replace a SIEM. Scanner imports and SIEM integrations may be considered as future extensions.

## Who it is for

- **Security analysts** who review and prioritize vulnerability findings.
- **IT administrators** who are responsible for fixing issues on systems they manage.
- **Team leads** who need a clear view of risk, ownership, and remediation progress.

## What the prototype includes

- A dashboard summarizing findings by severity and remediation status.
- A vulnerability register showing the finding, affected asset, severity, status, owner, and due date.
- Search and filters for finding and asset names, severity, and status.
- A detail view with context and a suggested remediation note.
- Create findings and update their status, owner, due date, and remediation notes.
- A severity breakdown and dashboard counts that recalculate after changes.
- CSV export of the sample findings.
- Sample data so the interface can be explored without a server or account. Changes are saved in the current browser using localStorage.

## Run locally

1. Clone or download this repository.
2. Open index.html in a modern web browser.

The prototype is a static frontend and requires no package installation, build step, or server. The sample records are defined in app.js; changes are saved in the browser's local storage and remain on that browser after a refresh. This is local persistence, not a shared database.

## Project structure

- README.md: product overview and instructions
- index.html: dashboard markup
- styles.css: responsive interface styles
- app.js: sample data and client-side behavior
- docs/JIRA_BACKLOG.md: Jira work items and planning notes

## Jira and GitHub workflow

The Jira backlog documents the work items created for this project. The Jira space is named **VulnTracker** and currently uses the key KAN; changing the display name does not change Jira issue keys. The backlog includes two epics, nine estimated user stories, three technical tasks, two bugs, and a story split into three subtasks. The In Progress column has a maximum WIP limit of two work items.

Use the Jira issue key in each development branch, commit message, and pull request title. For example: KAN-7-view-vulnerability-register and KAN-7 Add finding table.

For each change:

1. Move its Jira issue to **In Progress**.
2. Create a branch named with the Jira issue key.
3. Make a focused change and include the key in the commit message.
4. Open a pull request whose title includes the same Jira key.
5. Merge the pull request and move the Jira issue to **Done**.

Keep changes to main behind pull requests. Use a pull request for every ticket so the work is reviewed and linked to its Jira issue. GitHub for Atlassian is connected to the Jira site. Use issue keys in branch names, commit messages, and pull request titles so the work can be linked back to Jira.

## Scope and limitations

This is a course-project prototype with illustrative sample records. It has no authentication, backend, shared database, vulnerability scanner, or production security controls. Browser storage is device-specific and should not be used for real security findings. Future work could add a server-backed API, shared persistence, access control, and imports from security tools.

## Product goal

Help a small team answer three questions quickly: **What vulnerabilities do we have? Which ones should we address first? Who is responsible for fixing them?**
