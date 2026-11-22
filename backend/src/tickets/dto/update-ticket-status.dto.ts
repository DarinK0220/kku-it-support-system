import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateTicketStatusDto {
  @ApiProperty({ enum: ['Pending', 'In Progress', 'Completed'] })
  @IsIn(['Pending', 'In Progress', 'Completed'])
  status!: 'Pending' | 'In Progress' | 'Completed';

  @ApiPropertyOptional({ example: 'ตรวจเช็คอุปกรณ์และทำความสะอาดแล้ว', maxLength: 240 })
  @IsOptional()
  @IsString()
  @MaxLength(240)
  technicianNotes?: string;
}
