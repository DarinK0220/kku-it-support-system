/*
 * Thai and English UI copy for the KKU IT Support & Ticketing System.
 * Mark an element with data-i18n="key" to translate its text content.
 */
const TRANSLATIONS = {
  th: {
    headerTitle: 'ระบบแจ้งซ่อมและติดตามงาน IT',
    ssoLoginButton: 'เข้าสู่ระบบด้วย KKU SSO / OIDC',
    welcomeSubtitle: 'แจ้งซ่อมและติดตามสถานะอุปกรณ์และบริการด้านเทคโนโลยีสารสนเทศของมหาวิทยาลัยขอนแก่น',
    demoNote: 'บัญชีตัวอย่างสำหรับการประเมินเท่านั้น · เลือกบัญชีเพื่อทดลองใช้งานระบบ',
    userPortal: 'พอร์ทัลผู้ใช้ · KKU IT Support',
    repairPortal: 'พอร์ทัลแจ้งซ่อม',
    userPortalDescription: 'สร้างคำขอแจ้งซ่อมและติดตามสถานะคำขอของคุณ',
    createTicket: 'สร้างคำขอแจ้งซ่อม',
    formDescription: 'กรอกรายละเอียดอุปกรณ์และปัญหาที่พบ',
    form: {
      device: 'อุปกรณ์ / บริการ',
      selectDevice: 'เลือกอุปกรณ์หรือบริการ',
      location: 'สถานที่ / อาคาร',
      locationPlaceholder: 'อาคาร ชั้น และห้อง',
      issue: 'รายละเอียดปัญหา',
      issuePlaceholder: 'อธิบายปัญหาและข้อความแจ้งเตือนที่พบ',
      priority: 'ความสำคัญ',
      low: 'ต่ำ',
      medium: 'ปานกลาง',
      high: 'สูง'
    },
    myTickets: 'รายการแจ้งซ่อมของฉัน',
    myTicketsDescription: 'รายการแจ้งซ่อมของคุณ',
    ticketCount: 'รายการ',
    table: {
      id: 'รหัส',
      reporter: 'ผู้แจ้ง',
      device: 'อุปกรณ์',
      issue: 'ปัญหา',
      priority: 'ความสำคัญ',
      date: 'วันที่',
      status: 'สถานะ',
      notes: 'บันทึกช่าง',
      action: 'การดำเนินการ',
      ticketDate: 'หมายเลข / วันที่',
      deviceIssue: 'อุปกรณ์ / ปัญหา',
      location: 'สถานที่',
      actions: 'การดำเนินการ'
    },
    emptyTicketsTitle: 'ยังไม่มีรายการแจ้งซ่อม',
    emptyTicketsDescription: 'สร้างคำขอแจ้งซ่อมด้วยแบบฟอร์มเพื่อเริ่มต้น',
    adminEyebrow: 'ผู้ดูแลระบบ IT · สำนักเทคโนโลยีดิจิทัล',
    ticketAdministration: 'จัดการคำขอแจ้งซ่อม',
    adminDescription: 'ตรวจสอบคำขอ อัปเดตสถานะ และเพิ่มบันทึกสำหรับช่าง',
    ticketSummary: 'สรุปรายการแจ้งซ่อม',
    stats: {
      total: 'รายการทั้งหมด',
      pending: 'รอดำเนินการ',
      inProgress: 'กำลังดำเนินการ',
      completed: 'เสร็จสิ้น'
    },
    allTickets: 'รายการแจ้งซ่อมทั้งหมด',
    allTicketsDescription: 'ค้นหา อัปเดตสถานะ และเพิ่มบันทึกสำหรับช่าง',
    searchPlaceholder: 'ค้นหารายการแจ้งซ่อม',
    allStatuses: 'ทุกสถานะ',
    emptySearchTitle: 'ไม่พบรายการที่ตรงกัน',
    emptySearchDescription: 'ลองเปลี่ยนคำค้นหาหรือตัวกรองสถานะ',
    savedInBrowser: 'การเปลี่ยนแปลงจะบันทึกไว้ในพื้นที่จัดเก็บของเบราว์เซอร์นี้',
    statuses: {
      pending: 'รอดำเนินการ',
      inProgress: 'กำลังดำเนินการ',
      completed: 'เสร็จสิ้น'
    },
    buttons: {
      submit: 'ส่งคำขอแจ้งซ่อม',
      signOut: 'ออกจากระบบ',
      cancel: 'ยกเลิก',
      saveNote: 'บันทึกหมายเหตุ',
      delete: 'ลบ',
      close: 'ปิด',
      updateStatus: 'อัปเดตสถานะ'
    },
    sso: {
      title: 'เลือกบัญชีเพื่อเข้าสู่ระบบ',
      description: 'เลือกบัญชีตัวอย่าง · ใช้สำหรับทดลองเท่านั้น ไม่มีการยืนยันตัวตนจริง',
      closeAccountSelection: 'ปิดหน้าต่างเลือกบัญชี'
    },
    footer: 'สำนักเทคโนโลยีดิจิทัล มหาวิทยาลัยขอนแก่น'
  },
  en: {
    headerTitle: 'IT Support & Ticketing System',
    ssoLoginButton: 'Sign in with KKU SSO / OIDC',
    welcomeSubtitle: 'Report issues and track the status of information technology equipment and services at Khon Kaen University.',
    demoNote: 'Demo accounts for evaluation only · Select an account to try the system',
    userPortal: 'USER PORTAL · KKU IT SUPPORT',
    repairPortal: 'Repair Portal',
    userPortalDescription: 'Create a repair request and track its status',
    createTicket: 'Create Repair Ticket',
    formDescription: 'Enter the device details and describe the issue',
    form: {
      device: 'Device / Service',
      selectDevice: 'Select a device or service',
      location: 'Location / Building',
      locationPlaceholder: 'Building, floor, and room',
      issue: 'Issue description',
      issuePlaceholder: 'Describe the issue and any error messages',
      priority: 'Priority',
      low: 'Low',
      medium: 'Medium',
      high: 'High'
    },
    myTickets: 'My Tickets',
    myTicketsDescription: 'Your repair requests',
    ticketCount: 'tickets',
    table: {
      id: 'ID',
      reporter: 'Reporter',
      device: 'Device',
      issue: 'Issue',
      priority: 'Priority',
      date: 'Date',
      status: 'Status',
      notes: 'Notes',
      action: 'Action',
      ticketDate: 'Ticket / Date',
      deviceIssue: 'Device / Issue',
      location: 'Location',
      actions: 'Actions'
    },
    emptyTicketsTitle: 'No repair tickets yet',
    emptyTicketsDescription: 'Create a ticket using the form to get started.',
    adminEyebrow: 'IT ADMIN · DIGITAL TECHNOLOGY OFFICE',
    ticketAdministration: 'Ticket Administration',
    adminDescription: 'Review requests, update statuses, and add technician notes',
    ticketSummary: 'Ticket summary',
    stats: {
      total: 'Total Tickets',
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed'
    },
    allTickets: 'All Repair Tickets',
    allTicketsDescription: 'Search, update statuses, and add technician notes',
    searchPlaceholder: 'Search repair tickets',
    allStatuses: 'All statuses',
    emptySearchTitle: 'No matching tickets',
    emptySearchDescription: 'Try changing the search text or status filter.',
    savedInBrowser: "Changes are saved in this browser's local storage.",
    statuses: {
      pending: 'Pending',
      inProgress: 'In Progress',
      completed: 'Completed'
    },
    buttons: {
      submit: 'Submit repair ticket',
      signOut: 'Sign out',
      cancel: 'Cancel',
      saveNote: 'Save note',
      delete: 'Delete',
      close: 'Close',
      updateStatus: 'Update status'
    },
    sso: {
      title: 'Choose an account to sign in',
      description: 'Demo account selection only · No real authentication is performed',
      closeAccountSelection: 'Close account selection'
    },
    footer: 'Digital Technology Office, Khon Kaen University'
  }
};

const LANGUAGE_STORAGE_KEY = 'kku-it-support-language';
const TABLE_HEADER_KEYS = {
  priority: ['Priority', 'ความสำคัญ'],
  date: ['Date', 'วันที่'],
  status: ['Status', 'สถานะ']
};
const STATUS_KEYS = {
  Pending: 'pending',
  'In Progress': 'inProgress',
  Completed: 'completed'
};

function translateDynamicContent(language) {
  const translations = TRANSLATIONS[language] || TRANSLATIONS.th;

  document.querySelectorAll('thead th').forEach((header) => {
    const key = Object.keys(TABLE_HEADER_KEYS).find((name) =>
      TABLE_HEADER_KEYS[name].includes(header.textContent.trim())
    );
    const translated = key ? translations.table[key] : null;
    if (translated && header.textContent !== translated) header.textContent = translated;
  });

  document.querySelectorAll('.status-badge, select[data-status] option').forEach((element) => {
    const status = element.matches('option') ? element.value : element.textContent.trim();
    const key = STATUS_KEYS[status] || Object.keys(STATUS_KEYS).find((englishStatus) =>
      TRANSLATIONS.th.statuses[STATUS_KEYS[englishStatus]] === status
    );
    const translated = key ? translations.statuses[key] : null;
    if (translated && element.textContent !== translated) element.textContent = translated;
  });
}

function setLanguage(lang) {
  const language = Object.prototype.hasOwnProperty.call(TRANSLATIONS, lang) ? lang : 'th';
  const translations = TRANSLATIONS[language];

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const value = element.dataset.i18n.split('.').reduce((entry, key) => entry?.[key], translations);
    if (typeof value === 'string' && element.textContent !== value) element.textContent = value;
  });
  translateDynamicContent(language);

  document.documentElement.lang = language;
  try {
    window.localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch (error) {
    console.warn('Could not persist the selected language.', error);
  }
  return language;
}

// Translate statuses as app.js inserts or refreshes ticket rows.
if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
  const statusObserver = new MutationObserver(() => {
    translateDynamicContent(document.documentElement.lang || 'th');
  });
  statusObserver.observe(document.documentElement, { childList: true, subtree: true });
  document.addEventListener('DOMContentLoaded', () => {
    let savedLanguage = 'th';
    try {
      savedLanguage = window.localStorage.getItem(LANGUAGE_STORAGE_KEY) || 'th';
    } catch (error) {
      console.warn('Could not read the saved language.', error);
    }
    setLanguage(savedLanguage);
  });
}

// Expose the translation data and function for the UI and other scripts.
if (typeof window !== 'undefined') {
  window.TRANSLATIONS = TRANSLATIONS;
  window.setLanguage = setLanguage;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { TRANSLATIONS, setLanguage };
}
