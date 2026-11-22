/*
 * KKU IT Support UI state manager.
 * This is a local demonstration only: the account picker simulates KKU SSO and
 * does not authenticate with a real OIDC provider. Load data.js before app.js; this
 * file will load data.js itself when its data constants are not available.
 */
(() => {
  'use strict';

  if (window.__KKU_IT_APP_INITIALIZED__) return;
  window.__KKU_IT_APP_INITIALIZED__ = true;

  const TICKETS_KEY = 'kku-it-support-tickets-v1';
  const SESSION_KEY = 'kku-it-support-current-user-v1';
  const STATUSES = ['Pending', 'In Progress', 'Completed'];
  const $ = (id) => document.getElementById(id);
  let tickets = [];
  let currentUser = null;
  let toastTimer;

  function loadData() {
    if (typeof KKU_UNITS !== 'undefined' && typeof KKU_SSO_ACCOUNTS !== 'undefined' && typeof INITIAL_TICKETS !== 'undefined') {
      initialize(KKU_UNITS, KKU_SSO_ACCOUNTS, INITIAL_TICKETS);
      return;
    }
    const script = document.createElement('script');
    script.src = new URL('./data.js', document.currentScript?.src || window.location.href).href;
    script.onload = () => {
      if (typeof KKU_UNITS === 'undefined' || typeof KKU_SSO_ACCOUNTS === 'undefined' || typeof INITIAL_TICKETS === 'undefined') {
        showToast('Could not load the KKU demo data.');
        return;
      }
      initialize(KKU_UNITS, KKU_SSO_ACCOUNTS, INITIAL_TICKETS);
    };
    script.onerror = () => showToast('Could not load data.js.');
    document.head.appendChild(script);
  }

  function clone(value) { return JSON.parse(JSON.stringify(value)); }

  function readStorage(key) {
    try { return window.localStorage.getItem(key); }
    catch (error) { console.warn(`Local storage is unavailable for ${key}.`, error); return null; }
  }

  function writeStorage(key, value) {
    try { window.localStorage.setItem(key, JSON.stringify(value)); return true; }
    catch (error) {
      console.warn(`Could not save ${key}.`, error);
      showToast('Browser storage is unavailable; changes may not persist.');
      return false;
    }
  }

  function removeStorage(key) {
    try { window.localStorage.removeItem(key); }
    catch (error) { console.warn(`Could not remove ${key}.`, error); }
  }

  function validTickets(value) {
    return Array.isArray(value) && value.every((ticket) => ticket &&
      typeof ticket.id === 'string' && typeof ticket.reporter === 'string' &&
      typeof ticket.department === 'string' && STATUSES.includes(ticket.status));
  }

  function loadTickets(initialTickets) {
    const stored = readStorage(TICKETS_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (validTickets(parsed)) return parsed;
      } catch (error) { console.warn('Saved tickets were invalid; restoring initial tickets.', error); }
    }
    const initial = clone(initialTickets);
    writeStorage(TICKETS_KEY, initial);
    return initial;
  }

  function loadSession() {
    const stored = readStorage(SESSION_KEY);
    if (!stored) return null;
    try {
      const user = JSON.parse(stored);
      if (user && ['user', 'admin'].includes(user.role) && typeof user.name === 'string' && typeof user.department === 'string') return user;
    } catch (error) { console.warn('Saved login session was invalid.', error); }
    removeStorage(SESSION_KEY);
    return null;
  }

  function save() { writeStorage(TICKETS_KEY, tickets); }

  function esc(value) {
    return String(value ?? '').replace(/[&<>"']/g, (character) => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function showToast(message) {
    const toast = $('toast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function accountRole(account) { return account.role === 'IT Admin' ? 'admin' : 'user'; }
  function getAccount(email, accounts) { return accounts.find((account) => account.email === email); }

  function renderAccountCards(accounts) {
    const container = $('sso-account-cards');
    if (!container) return;
    container.innerHTML = accounts.map((account) => `
      <button class="account-card" type="button" data-sso-account="${esc(account.email)}">
        <span class="account-card-name">${esc(account.name)}</span>
        <span class="account-card-email">${esc(account.email)}</span>
        <span class="account-card-role">${esc(account.role)}</span>
      </button>`).join('');
  }

  function setModalOpen(open) {
    const modal = $('sso-modal');
    if (!modal) return;
    modal.hidden = !open;
    document.body.classList.toggle('modal-open', open);
    if (open) $('sso-modal-close')?.focus();
    else $('sso-login-button')?.focus();
  }

  function populateUnits(units) {
    const select = $('login-department');
    if (!select) return;
    const placeholder = select.querySelector('option[value=""]');
    select.replaceChildren();
    const prompt = placeholder || new Option('Select a KKU unit', '', true, true);
    prompt.disabled = true;
    prompt.selected = true;
    select.appendChild(prompt);
    units.forEach((unit) => select.add(new Option(unit, unit)));
  }

  function dateLabel(iso) {
    const date = new Date(`${iso}T00:00:00`);
    return Number.isNaN(date.getTime()) ? esc(iso) :
      new Intl.DateTimeFormat('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  }
  function statusClass(status) {
    return ({ Pending: 'status-pending', 'In Progress': 'status-in-progress', Completed: 'status-completed' })[status] || 'status-pending';
  }
  function statusLabel(status) {
    return ({ Pending: 'รอดำเนินการ', 'In Progress': 'กำลังดำเนินการ', Completed: 'เสร็จสิ้น' })[status] || status;
  }
  function priorityClass(priority) {
    return ({ High: 'priority-high', Medium: 'priority-medium', Low: 'priority-low' })[priority] || 'priority-medium';
  }

  function setView(viewId) {
    document.querySelectorAll('.view').forEach((view) => view.classList.remove('active'));
    const view = $(viewId);
    if (view) view.classList.add('active');
    renderHeader();
    if (viewId === 'user-view') renderUser();
    if (viewId === 'admin-view') renderAdmin();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderHeader() {
    const info = $('session-info');
    if (info) info.hidden = !currentUser;
    const logout = $('logout-button');
    if (logout) logout.hidden = !currentUser;
    const role = $('role-badge');
    if (role) role.hidden = !currentUser;
    const name = $('session-name');
    const department = $('session-department');
    const email = $('session-email');
    if (!currentUser) {
      if (name) name.textContent = '';
      if (department) department.textContent = '';
      if (email) email.textContent = '';
      if (role) role.textContent = '';
      return;
    }
    if (name) name.textContent = currentUser.name;
    if (department) department.textContent = currentUser.department;
    if (email) email.textContent = currentUser.email || '';
    if (role) role.textContent = currentUser.role === 'admin' ? 'IT Admin' : 'User';
  }

  function renderUser() {
    if (currentUser?.role !== 'user') return;
    const body = $('my-ticket-rows');
    if (!body) return;
    const mine = tickets.filter((ticket) => ticket.reporter === currentUser.name && ticket.department === currentUser.department)
      .sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    body.innerHTML = mine.map((ticket) => `
      <tr>
        <td><span class="ticket-id">${esc(ticket.id)}</span><span class="subtext">${dateLabel(ticket.date)}</span></td>
        <td><span class="reporter">${esc(ticket.device)}</span><span class="subtext">${esc(ticket.issue)}</span><span class="priority-badge ${priorityClass(ticket.priority)}">${esc(ticket.priority)}</span></td>
        <td>${esc(ticket.location)}</td>
        <td><span class="status-badge ${statusClass(ticket.status)}">${esc(statusLabel(ticket.status))}</span></td>
        <td>${ticket.notes ? esc(ticket.notes) : '<span class="subtext">—</span>'}</td>
        <td>${ticket.status === 'Pending' ? `<button class="button-danger button-small" type="button" data-cancel="${esc(ticket.id)}">Cancel</button>` : '<span class="subtext">—</span>'}</td>
      </tr>`).join('');
    const empty = $('my-empty');
    if (empty) empty.hidden = mine.length > 0;
    const count = $('my-ticket-count');
    if (count) count.textContent = `${mine.length} tickets`;
  }

  function renderAdmin() {
    if (currentUser?.role !== 'admin') return;
    const body = $('admin-ticket-rows');
    if (!body) return;
    const query = ($('admin-search')?.value || '').trim().toLocaleLowerCase('th');
    const filter = $('admin-status-filter')?.value || 'all';
    const visible = tickets.filter((ticket) => {
      const text = [ticket.id, ticket.reporter, ticket.department, ticket.device, ticket.location, ticket.issue].join(' ').toLocaleLowerCase('th');
      return (!query || text.includes(query)) && (filter === 'all' || ticket.status === filter);
    }).sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
    body.innerHTML = visible.map((ticket) => `
      <tr>
        <td><span class="ticket-id">${esc(ticket.id)}</span><span class="subtext">${esc(ticket.reporter)}<br>${esc(ticket.department)}</span></td>
        <td><span class="reporter">${esc(ticket.device)}</span><span class="subtext">${esc(ticket.issue)}</span></td>
        <td>${esc(ticket.location)}</td>
        <td><span class="priority-badge ${priorityClass(ticket.priority)}">${esc(ticket.priority)}</span></td>
        <td>${dateLabel(ticket.date)}</td>
        <td><label class="sr-only" for="status-${esc(ticket.id)}">Update status for ${esc(ticket.id)}</label>
          <select id="status-${esc(ticket.id)}" data-status="${esc(ticket.id)}" aria-label="Update status for ${esc(ticket.id)}">
            ${STATUSES.map((status) => `<option value="${status}"${ticket.status === status ? ' selected' : ''}>${esc(statusLabel(status))}</option>`).join('')}
          </select><span class="subtext"><span class="status-badge ${statusClass(ticket.status)}">${esc(statusLabel(ticket.status))}</span></span></td>
        <td><input class="note-input" type="text" maxlength="240" value="${esc(ticket.notes)}" data-note="${esc(ticket.id)}" aria-label="Technician notes for ${esc(ticket.id)}" placeholder="Add technician notes">
          <button class="button-secondary button-small save-note" type="button" data-save-note="${esc(ticket.id)}">Save note</button></td>
        <td><button class="button-danger button-small" type="button" data-delete="${esc(ticket.id)}">Delete</button></td>
      </tr>`).join('');
    const empty = $('admin-empty');
    if (empty) empty.hidden = visible.length > 0;
    const resultCount = $('admin-result-count');
    if (resultCount) resultCount.textContent = `${visible.length} of ${tickets.length} tickets`;
    if ($('total-count')) $('total-count').textContent = String(tickets.length);
    if ($('pending-count')) $('pending-count').textContent = String(tickets.filter((ticket) => ticket.status === 'Pending').length);
    if ($('progress-count')) $('progress-count').textContent = String(tickets.filter((ticket) => ticket.status === 'In Progress').length);
    if ($('completed-count')) $('completed-count').textContent = String(tickets.filter((ticket) => ticket.status === 'Completed').length);
  }

  function createId() {
    const thisYear = new Date().getFullYear();
    const lastNumber = tickets.reduce((max, ticket) => {
      const match = /^KKU-\d{4}-(\d+)$/.exec(ticket.id);
      return match ? Math.max(max, Number(match[1])) : max;
    }, 0);
    return `KKU-${thisYear}-${String(lastNumber + 1).padStart(4, '0')}`;
  }

  function login(account, roleOverride) {
    if (!account) return;
    currentUser = {
      name: account.name,
      department: account.department || 'สำนักเทคโนโลยีดิจิทัล',
      email: account.email,
      role: roleOverride || accountRole(account)
    };
    writeStorage(SESSION_KEY, currentUser);
    setModalOpen(false);
    setView(currentUser.role === 'admin' ? 'admin-view' : 'user-view');
    showToast(`Signed in using a simulated KKU account: ${account.email}`);
  }

  function logout() {
    currentUser = null;
    removeStorage(SESSION_KEY);
    $('user-login-form')?.reset();
    $('ticket-form')?.reset();
    if ($('admin-search')) $('admin-search').value = '';
    if ($('admin-status-filter')) $('admin-status-filter').value = 'all';
    setView('welcome-view');
    showToast('You have been signed out.');
  }

  function bindEvents(accounts) {
    renderAccountCards(accounts);
    $('sso-login-button')?.addEventListener('click', () => setModalOpen(true));
    $('sso-modal-close')?.addEventListener('click', () => setModalOpen(false));
    $('sso-modal')?.addEventListener('click', (event) => {
      if (event.target === $('sso-modal')) setModalOpen(false);
    });
    $('sso-account-cards')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-sso-account]');
      if (!button) return;
      const account = getAccount(button.dataset.ssoAccount, accounts);
      if (account) login(account);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !$('sso-modal')?.hidden) setModalOpen(false);
    });

    const manualForm = $('user-login-form');
    if (manualForm) manualForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (!manualForm.reportValidity()) return;
      const formData = new FormData(manualForm);
      const name = String(formData.get('name') || '').trim();
      const department = String(formData.get('department') || '');
      const account = accounts.find((item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase());
      currentUser = { name, department, email: account?.email || '', role: 'user' };
      writeStorage(SESSION_KEY, currentUser);
      setView('user-view');
      showToast('Signed in with the manual demo form.');
    });

    $('admin-login-button')?.addEventListener('click', () => {
      const admin = accounts.find((account) => accountRole(account) === 'admin');
      if (admin) login(admin, 'admin');
    });
    $('logout-button')?.addEventListener('click', logout);

    const ticketForm = $('ticket-form');
    if (ticketForm) ticketForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (currentUser?.role !== 'user' || !ticketForm.reportValidity()) return;
      const formData = new FormData(ticketForm);
      tickets.unshift({
        id: createId(), reporter: currentUser.name, department: currentUser.department,
        device: String(formData.get('device') || '').trim(),
        location: String(formData.get('location') || '').trim(),
        issue: String(formData.get('issue') || '').trim(),
        priority: String(formData.get('priority') || 'Medium'), status: 'Pending', notes: '',
        date: new Date().toISOString().slice(0, 10)
      });
      save(); ticketForm.reset(); renderUser(); showToast('Repair ticket created.');
    });

    $('my-ticket-rows')?.addEventListener('click', (event) => {
      const button = event.target.closest('[data-cancel]');
      if (!button || currentUser?.role !== 'user') return;
      const ticket = tickets.find((item) => item.id === button.dataset.cancel);
      if (!ticket || ticket.status !== 'Pending' || ticket.reporter !== currentUser.name || ticket.department !== currentUser.department) return;
      if (!window.confirm(`Cancel ticket ${ticket.id}?`)) return;
      tickets = tickets.filter((item) => item.id !== ticket.id);
      save(); renderUser(); showToast('Ticket cancelled.');
    });

    $('admin-search')?.addEventListener('input', renderAdmin);
    $('admin-status-filter')?.addEventListener('change', renderAdmin);
    const adminRows = $('admin-ticket-rows');
    if (adminRows) {
      adminRows.addEventListener('change', (event) => {
        const select = event.target.closest('[data-status]');
        if (!select || currentUser?.role !== 'admin' || !STATUSES.includes(select.value)) return;
        const ticket = tickets.find((item) => item.id === select.dataset.status);
        if (!ticket) return;
        ticket.status = select.value; save(); renderAdmin(); showToast(`Status updated for ${ticket.id}.`);
      });
      adminRows.addEventListener('click', (event) => {
        const saveButton = event.target.closest('[data-save-note]');
        if (saveButton && currentUser?.role === 'admin') {
          const id = saveButton.dataset.saveNote;
          const ticket = tickets.find((item) => item.id === id);
          const input = adminRows.querySelector(`[data-note="${CSS.escape(id)}"]`);
          if (!ticket || !input) return;
          ticket.notes = input.value.trim(); save(); renderAdmin(); showToast(`Technician note saved for ${id}.`);
          return;
        }
        const deleteButton = event.target.closest('[data-delete]');
        if (deleteButton && currentUser?.role === 'admin') {
          const id = deleteButton.dataset.delete;
          const ticket = tickets.find((item) => item.id === id);
          if (!ticket || !window.confirm(`Delete ticket ${id}? This cannot be undone.`)) return;
          tickets = tickets.filter((item) => item.id !== id);
          save(); renderAdmin(); showToast(`Ticket ${id} deleted.`);
        }
      });
    }
  }

  function initialize(units, accounts, initialTickets) {
    tickets = loadTickets(initialTickets);
    currentUser = loadSession();
    populateUnits(units);
    bindEvents(accounts);
    const today = new Intl.DateTimeFormat('th-TH', { dateStyle: 'full' }).format(new Date());
    if ($('user-date')) $('user-date').textContent = today;
    if ($('admin-date')) $('admin-date').textContent = today;
    if (currentUser) setView(currentUser.role === 'admin' ? 'admin-view' : 'user-view');
    else setView('welcome-view');
  }

  loadData();
})();
