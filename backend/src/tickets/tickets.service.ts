import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketStatusDto } from './dto/update-ticket-status.dto';

export type TicketStatus = 'Pending' | 'In Progress' | 'Completed';
export type TicketPriority = 'High' | 'Medium' | 'Low';

export interface RepairTicket {
  id: string;
  reporter: string;
  department: string;
  device: string;
  location: string;
  issue: string;
  priority: TicketPriority;
  status: TicketStatus;
  notes: string;
  date: string;
}

@Injectable()
export class TicketsService {
  private readonly tickets: RepairTicket[] = [
    { id: 'KKU-2026-0148', reporter: 'น.ส. พิมพ์ชนก ศรีสวัสดิ์', department: 'คณะวิทยาศาสตร์', device: 'คอมพิวเตอร์ตั้งโต๊ะ', location: 'อาคารวิทยวิภาส ชั้น 3 ห้อง SC3201', issue: 'เปิดเครื่องไม่ติด หลังไฟฟ้าดับ', priority: 'High', status: 'In Progress', notes: 'ตรวจสอบ Power Supply และรออะไหล่', date: '2026-11-22' },
    { id: 'KKU-2026-0147', reporter: 'นายธนกฤต วัฒนชัย', department: 'คณะวิศวกรรมศาสตร์', device: 'เครื่องพิมพ์', location: 'อาคาร 6 ชั้น 2 ห้อง EN6204', issue: 'พิมพ์เอกสารแล้วกระดาษติดบ่อย', priority: 'Medium', status: 'Pending', notes: '', date: '2026-11-22' },
    { id: 'KKU-2026-0146', reporter: 'นางสาวสุภาวดี แก้วคำ', department: 'คณะศึกษาศาสตร์', device: 'เครือข่าย / Wi-Fi', location: 'อาคารคณะศึกษาศาสตร์ ชั้น 4', issue: 'สัญญาณ Wi-Fi หลุดเป็นระยะ', priority: 'Medium', status: 'Pending', notes: '', date: '2026-11-21' },
    { id: 'KKU-2026-0145', reporter: 'นายกิตติพงษ์ มณีวงศ์', department: 'สำนักเทคโนโลยีดิจิทัล', device: 'โปรเจกเตอร์ / จอภาพ', location: 'อาคารศูนย์สารสนเทศ ห้องประชุม 2', issue: 'ภาพจากโปรเจกเตอร์ไม่แสดงสี', priority: 'Low', status: 'Completed', notes: 'เปลี่ยนสาย HDMI และทดสอบเรียบร้อย', date: '2026-11-21' },
    { id: 'KKU-2026-0144', reporter: 'น.ส. รุ่งทิวา บุญมี', department: 'คณะมนุษยศาสตร์และสังคมศาสตร์', device: 'คอมพิวเตอร์โน้ตบุ๊ก', location: 'อาคาร HS.05 ชั้น 2 ห้อง 5207', issue: 'แบตเตอรี่ไม่ชาร์จและเครื่องร้อน', priority: 'High', status: 'In Progress', notes: 'ทำความสะอาดพัดลมและตรวจแบตเตอรี่', date: '2026-11-20' },
    { id: 'KKU-2026-0143', reporter: 'นายณัฐวุฒิ พรมมา', department: 'คณะเกษตรศาสตร์', device: 'คอมพิวเตอร์ตั้งโต๊ะ', location: 'อาคาร AG ชั้น 1 ห้องปฏิบัติการคอมพิวเตอร์', issue: 'ระบบปฏิบัติการทำงานช้าผิดปกติ', priority: 'Low', status: 'Completed', notes: 'อัปเดตระบบและกำจัดไฟล์ชั่วคราวแล้ว', date: '2026-11-19' },
    { id: 'KKU-2026-0142', reporter: 'นางสาวอรทัย จันทะวงษ์', department: 'บัณฑิตวิทยาลัย', device: 'เครื่องพิมพ์', location: 'อาคารพิมล กลกิจ ชั้น 4', issue: 'เครื่องไม่เชื่อมต่อกับคอมพิวเตอร์', priority: 'Medium', status: 'Pending', notes: '', date: '2026-11-18' },
  ];

  findAll(): RepairTicket[] {
    return [...this.tickets].sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
  }

  create(dto: CreateTicketDto): RepairTicket {
    const nextNumber = Math.max(0, ...this.tickets.map((ticket) => Number(ticket.id.split('-').pop()) || 0)) + 1;
    const ticket: RepairTicket = {
      ...dto,
      id: `KKU-${new Date().getFullYear()}-${String(nextNumber).padStart(4, '0')}`,
      status: 'Pending',
      notes: '',
      date: new Date().toISOString().slice(0, 10),
    };
    this.tickets.unshift(ticket);
    return ticket;
  }

  updateStatus(id: string, dto: UpdateTicketStatusDto): RepairTicket {
    const ticket = this.findById(id);
    ticket.status = dto.status;
    if (dto.technicianNotes !== undefined) ticket.notes = dto.technicianNotes;
    return ticket;
  }

  remove(id: string): RepairTicket {
    const index = this.tickets.findIndex((ticket) => ticket.id === id);
    if (index < 0) throw new NotFoundException(`Ticket ${id} was not found.`);
    return this.tickets.splice(index, 1)[0];
  }

  private findById(id: string): RepairTicket {
    const ticket = this.tickets.find((item) => item.id === id);
    if (!ticket) throw new NotFoundException(`Ticket ${id} was not found.`);
    return ticket;
  }
}
