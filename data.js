const KKU_UNITS = [
  "สำนักเทคโนโลยีดิจิทัล",
  "สำนักบริหารและพัฒนาวิชาการ",
  "สำนักหอสมุด",
  "คณะวิศวกรรมศาสตร์",
  "คณะวิทยาศาสตร์",
  "คณะแพทยศาสตร์",
  "คณะพยาบาลศาสตร์",
  "คณะบริหารธุรกิจและการบัญชี",
  "คณะมนุษยศาสตร์และสังคมศาสตร์",
  "คณะเกษตรศาสตร์",
  "คณะศึกษาศาสตร์",
  "คณะเภสัชศาสตร์",
  "คณะทันตแพทยศาสตร์",
  "คณะเทคนิคการแพทย์",
  "กองบริหารงานกลาง"
];

const KKU_SSO_ACCOUNTS = [
  {
    email: "darin.ku@kku.ac.th",
    role: "IT Admin",
    name: "Darin K."
  },
  {
    email: "somchai.w@kku.ac.th",
    role: "Staff User",
    name: "Somchai W."
  },
  {
    email: "student.demo@kkumail.com",
    role: "Student User",
    name: "Student Demo"
  }
];

const INITIAL_TICKETS = [
  {
    id: "KKU-2026-0201",
    reporter: "Somchai W.",
    department: "คณะวิศวกรรมศาสตร์",
    device: "Desktop computer",
    location: "Engineering Building 6, Room 4201",
    issue: "Computer restarts unexpectedly during lab sessions; checked power cable and outlet.",
    priority: "High",
    status: "In Progress",
    notes: "IT staff checking the power supply and event logs.",
    date: "2026-11-20"
  },
  {
    id: "KKU-2026-0202",
    reporter: "Student Demo",
    department: "คณะวิทยาศาสตร์",
    device: "Wi-Fi",
    location: "SC Building, 3rd floor, study area",
    issue: "Unable to connect to the campus Wi-Fi; connection drops repeatedly on a laptop.",
    priority: "Medium",
    status: "Pending",
    notes: "",
    date: "2026-11-21"
  },
  {
    id: "KKU-2026-0203",
    reporter: "Somchai W.",
    department: "สำนักหอสมุด",
    device: "Printer",
    location: "Learning Resource Center, service counter",
    issue: "Network printer shows an offline message and queued documents are not printing.",
    priority: "Medium",
    status: "Completed",
    notes: "Printer network connection restored and test page printed successfully.",
    date: "2026-11-19"
  },
  {
    id: "KKU-2026-0204",
    reporter: "Student Demo",
    department: "คณะแพทยศาสตร์",
    device: "Laptop",
    location: "Srinagarind Hospital, Education Center, Room 205",
    issue: "Laptop cannot detect the classroom projector over HDMI for a scheduled presentation.",
    priority: "High",
    status: "Pending",
    notes: "Presentation is scheduled this afternoon; please check the HDMI adapter and display settings.",
    date: "2026-11-22"
  }
];
