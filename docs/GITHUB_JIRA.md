# Jira and GitHub integration

VulnTracker uses Jira to plan and track work and GitHub to review and store the code. The Jira project key is KAN. GitHub for Atlassian is connected to the repository stilyana-petrova/VulnTracker.

## Link a change to a Jira issue

Use the Jira issue key consistently in the development branch name, commit message, and pull request title. This allows Jira to associate development activity with the corresponding work item.

Example for KAN-17:

- Branch: KAN-17-github-jira-integration
- Commit: KAN-17 Document Jira and GitHub integration
- Pull request: KAN-17 Document Jira and GitHub integration

Include the Jira issue URL in the pull request description as an additional reference.

## Development workflow

1. Move the Jira issue to In Progress.
2. Create a branch from main whose name starts with the Jira key.
3. Make a focused change and commit it with the Jira key in the message.
4. Open a pull request to main with the Jira key in its title and a link to the Jira issue in its description.
5. Review the change and merge the pull request.
6. Move the Jira issue to Done after the change is merged.

## Notes

- Keep each branch and pull request focused on one Jira ticket.
- Do not commit ticket changes directly to main; use a pull request.
- A branch or PR title containing an issue key helps Jira show development links. Jira workflow status may still need to be updated manually if no automation is configured.
- This integration links planning and code review activity. It does not add vulnerability scanning or SIEM capabilities to the prototype.
