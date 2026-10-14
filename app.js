const STORAGE_KEY = 'vulntracker.findings.v1';

const starterFindings = [
  { id: 'VT-001', title: 'Outdated OpenSSL library', asset: 'api-gateway-01', severity: 'Critical', status: 'Open', owner: 'Maya Chen', due: '2026-10-14', description: 'The API gateway uses an OpenSSL version with a known remote code execution vulnerability.', remediation: 'Upgrade OpenSSL to a supported release, deploy through staging, and verify the gateway after rollout.', notes: '' },
  { id: 'VT-002', title: 'SQL injection in search endpoint', asset: 'customer-portal', severity: 'High', status: 'In progress', owner: 'Ivan Petrov', due: '2026-10-16', description: 'Crafted search parameters may reach a database query without safe handling.', remediation: 'Use parameterized queries, validate input on the server, and add a regression check for the affected endpoint.', notes: '' },
  { id: 'VT-003', title: 'Missing security headers', asset: 'marketing-site', severity: 'Medium', status: 'Open', owner: 'Unassigned', due: '2026-10-20', description: 'Several recommended browser security headers are not configured.', remediation: 'Add the agreed Content-Security-Policy and other required headers, then verify them against the deployed site.', notes: '' },
  { id: 'VT-004', title: 'Public storage bucket permissions', asset: 'backup-storage', severity: 'High', status: 'In progress', owner: 'Elena Markova', due: '2026-10-13', description: 'Storage permissions allow broader access than required.', remediation: 'Disable public access, grant least-privilege access to approved service identities, and review access logs.', notes: '' },
  { id: 'VT-005', title: 'Weak TLS configuration', asset: 'vpn-edge-02', severity: 'Medium', status: 'Resolved', owner: 'Maya Chen', due: '2026-10-09', description: 'The service accepted outdated TLS settings.', remediation: 'Keep deprecated TLS versions and weak cipher suites disabled, and verify the configuration during routine review.', notes: '' },
  { id: 'VT-006', title: 'Unpatched Linux kernel', asset: 'worker-node-07', severity: 'Critical', status: 'Open', owner: 'Ivan Petrov', due: '2026-10-15', description: 'A security update is available for the kernel running on this worker node.', remediation: 'Apply the kernel update during the approved maintenance window, reboot if required, and confirm the running version.', notes: '' },
  { id: 'VT-007', title: 'Verbose error messages', asset: 'internal-dashboard', severity: 'Low', status: 'Resolved', owner: 'Elena Markova', due: '2026-10-08', description: 'Error responses exposed implementation details.', remediation: 'Return generic error messages to clients and retain diagnostic details only in access-controlled logs.', notes: '' }
];

const rows = document.querySelector('#finding-rows');
const search = document.querySelector('#search');
const severityFilter = document.querySelector('#severity-filter');
const statusFilter = document.querySelector('#status-filter');
const clearFilters = document.querySelector('#clear-filters');
const detailDialog = document.querySelector('#detail-dialog');
const addDialog = document.querySelector('#add-dialog');
const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));

function todayDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function loadFindings() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (Array.isArray(saved) && saved.every(item => item && item.id && item.title && item.severity && item.status)) {
      return saved.map(item => ({ ...item, updated: item.updated || todayDate() }));
    }
  } catch (error) {
    console.warn('Saved findings could not be read; using the sample records.', error);
  }
  return starterFindings.map(item => ({ ...item, updated: todayDate() }));
}

let findings = loadFindings();

function saveFindings() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(findings));
}

function formatDate(value) {
  if (!value) return '—';
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.valueOf()) ? value : new Intl.DateTimeFormat('en', { month: 'short', day: '2-digit', year: 'numeric' }).format(date);
}

function updateDashboard() {
  document.querySelector('#total-count').textContent = findings.length;
  document.querySelector('#nav-count').textContent = findings.length;
  document.querySelector('#open-count').textContent = findings.filter(item => item.status === 'Open').length;
  document.querySelector('#progress-count').textContent = findings.filter(item => item.status === 'In progress').length;
  document.querySelector('#resolved-count').textContent = findings.filter(item => item.status === 'Resolved').length;
  document.querySelectorAll('[data-severity-count]').forEach(element => {
    element.textContent = findings.filter(item => item.severity === element.dataset.severityCount).length;
  });
}

function renderRows() {
  const query = search.value.trim().toLowerCase();
  const severity = severityFilter.value;
  const status = statusFilter.value;
  const visible = findings.filter(item => {
    const searchable = `${item.id} ${item.title} ${item.asset} ${item.owner} ${item.description} ${item.notes}`.toLowerCase();
    return searchable.includes(query) && (severity === 'all' || item.severity === severity) && (status === 'all' || item.status === status);
  });

  rows.innerHTML = visible.length ? visible.map(item => `
    <tr>
      <td><div class="finding-name">${escapeHtml(item.title)}</div><div class="finding-id">${escapeHtml(item.id)}</div></td>
      <td><span class="asset-name">${escapeHtml(item.asset)}</span></td>
      <td><span class="severity severity-${escapeHtml(item.severity.toLowerCase())}">${escapeHtml(item.severity)}</span></td>
      <td><button class="status status-${escapeHtml(item.status.toLowerCase().replaceAll(' ', '-'))}" data-id="${escapeHtml(item.id)}" aria-label="Update status for ${escapeHtml(item.title)}">${escapeHtml(item.status)}</button></td>
      <td><span class="owner">${escapeHtml(item.owner || 'Unassigned')}</span></td>
      <td class="${item.due && item.due < todayDate() && item.status !== 'Resolved' ? 'due-overdue' : ''}">${escapeHtml(formatDate(item.due))}${item.due && item.due < todayDate() && item.status !== 'Resolved' ? '<span class="overdue-label">Overdue</span>' : ''}</td>
      <td>${escapeHtml(formatDate(item.updated))}</td>
      <td><button class="row-menu" data-id="${escapeHtml(item.id)}" aria-label="View ${escapeHtml(item.title)} details">···</button></td>
    </tr>`).join('') : '<tr><td colspan="8" class="empty-state">No findings match these filters.</td></tr>';

  document.querySelector('#result-count').textContent = `Showing ${visible.length} of ${findings.length} findings`;
  clearFilters.disabled = !search.value && severity === 'all' && status === 'all';
}

function showDetails(id) {
  const item = findings.find(record => record.id === id);
  if (!item) return;
  document.querySelector('#detail-id').textContent = item.id;
  document.querySelector('#detail-title').textContent = item.title;
  document.querySelector('#detail-description').textContent = item.description;
  document.querySelector('#detail-remediation').textContent = item.remediation || 'No remediation guidance recorded.';
  document.querySelector('#detail-severity').textContent = item.severity;
  document.querySelector('#detail-status').value = item.status;
  document.querySelector('#detail-asset').textContent = item.asset;
  document.querySelector('#detail-owner').value = item.owner === 'Unassigned' ? '' : item.owner;
  document.querySelector('#detail-due').value = item.due || '';
  document.querySelector('#detail-notes').value = item.notes || '';
  detailDialog.dataset.findingId = item.id;
  detailDialog.showModal();
}

function nextFindingId() {
  const highest = findings.reduce((max, item) => {
    const number = Number(item.id.match(/\d+$/)?.[0] || 0);
    return Math.max(max, number);
  }, 0);
  return `VT-${String(highest + 1).padStart(3, '0')}`;
}

search.addEventListener('input', renderRows);
[severityFilter, statusFilter].forEach(control => control.addEventListener('change', renderRows));
clearFilters.addEventListener('click', () => {
  search.value = '';
  severityFilter.value = 'all';
  statusFilter.value = 'all';
  renderRows();
  search.focus();
});

document.querySelectorAll('[data-severity-filter]').forEach(button => {
  button.addEventListener('click', () => {
    severityFilter.value = button.dataset.severityFilter;
    renderRows();
    document.querySelector('#findings').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

rows.addEventListener('click', event => {
  const button = event.target.closest('[data-id]');
  if (button) showDetails(button.dataset.id);
});

document.querySelector('#detail-form').addEventListener('submit', event => {
  event.preventDefault();
  const item = findings.find(record => record.id === detailDialog.dataset.findingId);
  if (!item) return;
  item.status = document.querySelector('#detail-status').value;
  item.owner = document.querySelector('#detail-owner').value.trim() || 'Unassigned';
  item.due = document.querySelector('#detail-due').value;
  item.notes = document.querySelector('#detail-notes').value.trim();
  item.updated = todayDate();
  saveFindings();
  updateDashboard();
  renderRows();
  detailDialog.close();
});

document.querySelector('#add-button').addEventListener('click', () => addDialog.showModal());
const addForm = document.querySelector('#add-form');
const requiredFindingFields = ['title', 'asset', 'description'].map(name => addForm.elements.namedItem(name));
requiredFindingFields.forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));

addForm.addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const title = String(data.get('title')).trim();
  const asset = String(data.get('asset')).trim();
  const description = String(data.get('description')).trim();
  const normalizedValues = [title, asset, description];
  requiredFindingFields.forEach((field, index) => field.setCustomValidity(normalizedValues[index] ? '' : 'This field cannot be blank.'));
  if (!form.reportValidity()) return;
  findings.unshift({
    id: nextFindingId(),
    title,
    asset,
    severity: String(data.get('severity')),
    status: String(data.get('status')),
    owner: String(data.get('owner')).trim() || 'Unassigned',
    due: String(data.get('due')),
    description,
    remediation: String(data.get('remediation')).trim(),
    notes: '',
    updated: todayDate()
  });
  saveFindings();
  updateDashboard();
  renderRows();
  form.reset();
  addDialog.close();
});

document.querySelectorAll('dialog').forEach(dialog => dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
}));

document.querySelector('#export-button').addEventListener('click', () => {
  const headings = ['ID', 'Finding', 'Asset', 'Severity', 'Status', 'Owner', 'Due date', 'Last updated', 'Description', 'Remediation', 'Notes'];
  const csv = [headings, ...findings.map(item => [item.id, item.title, item.asset, item.severity, item.status, item.owner, formatDate(item.due), formatDate(item.updated), item.description, item.remediation, item.notes])]
    .map(line => line.map(value => `"${String(value ?? '').replaceAll('"', '""')}"`).join(',')).join('\r\n');
  const link = document.createElement('a');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.href = url;
  link.download = 'vulntracker-findings.csv';
  link.click();
  URL.revokeObjectURL(url);
});

updateDashboard();
renderRows();
