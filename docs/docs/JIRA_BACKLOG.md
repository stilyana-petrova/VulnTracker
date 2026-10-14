# VulnTracker — Jira backlog

This document mirrors the work items created in the VulnTracker Jira space (KAN). Story point estimates are relative planning values and can be refined as implementation details become clearer. The original starter items KAN-1, KAN-2, and KAN-3 were already present in the Jira space and were left unchanged.

## Epic 1 — Vulnerability register and triage

| Type | Summary | User story / description | Story points |
|---|---|---|---:|
| KAN-7 · Story | View the vulnerability register | As a security analyst, I want to see all recorded vulnerabilities in one list so that I can review the team's open findings. | 3 |
| KAN-8 · Story | Search and filter findings | As a security analyst, I want to search and filter findings by severity and status so that I can find the records I need quickly. | 3 |
| KAN-9 · Story | View finding details | As a security analyst, I want to open a finding's details so that I can understand the affected asset and recommended remediation. | 2 |
| KAN-10 · Story | See severity at a glance | As a team lead, I want findings grouped by severity so that I can identify the highest-risk items first. | 2 |
| KAN-11 · Story | Record a new finding | As a security analyst, I want to record a vulnerability and its affected asset so that the team has a shared source of information. | 5 |

## Epic 2 — Remediation ownership and progress

| Type | Summary | User story / description | Story points |
|---|---|---|---:|
| KAN-12 · Story | Track remediation status | As an IT administrator, I want to update a finding's status so that the team can follow remediation from open to resolved. | 3 |
| KAN-13 · Story | Assign an owner and due date | As a team lead, I want to assign an owner and target date so that responsibility and timing are clear. | 3 |
| KAN-14 · Story | Review the dashboard summary | As a team lead, I want to see counts by severity and status so that I can understand the current workload. | 2 |
| KAN-15 · Story | Add remediation notes | As an IT administrator, I want to add notes to a finding so that investigation and remediation decisions are recorded. | 3 |

**Epic keys:** KAN-5 — Vulnerability register and triage; KAN-6 — Remediation ownership and progress.

## Technical tasks

1. **KAN-4** — Write README and define the VulnTracker product scope.
2. **KAN-16** — Set up the static application structure and shared styles.
3. **KAN-17** — Configure GitHub for Jira and confirm that issue links appear in Jira. The GitHub for Atlassian connection is now active.

## Bugs

1. **KAN-18 — Severity filter shows findings from other severities** — selecting a severity must show only matching findings.
2. **KAN-19 — Resolved count does not update after a status change** — the dashboard count must reflect the current statuses.

## Subtasks example

Break **KAN-7 — View the vulnerability register** into:

- **KAN-20** — Define the vulnerability fields shown in each register row.
- **KAN-21** — Build the register layout and severity/status labels.
- **KAN-22** — Add sample records and an empty-state message.

## Baseline and board

Use **KAN-7 — View the vulnerability register (3 points)** as the baseline: it is a small, visible, bounded feature. Compare other stories against its effort and uncertainty. The project uses a Kanban board with **To Do → In Progress → In Review → Done**; the Jira backlog is the staging area before work enters To Do. The **In Progress** column has a maximum WIP limit of **2**.

## Suggested implementation order

1. Repository setup and README.
2. Vulnerability register and detail view.
3. Search and filters.
4. Dashboard summary.
5. Status, owner, due date, and notes.
6. Jira–GitHub links and final board cleanup.
