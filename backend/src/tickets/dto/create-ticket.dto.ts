import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTicketDto {
  @ApiProperty({ example: 'นางสาวศิริพร ใจดี' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  reporter!: string;

  @ApiProperty({ example: 'คณะวิศวกรรมศาสตร์' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  department!: string;

  @ApiProperty({ example: 'คอมพิวเตอร์ตั้งโต๊ะ' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(80)
  device!: string;

  @ApiProperty({ example: 'อาคาร 6 ชั้น 2 ห้อง EN6204' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  location!: string;

  @ApiProperty({ example: 'เปิดเครื่องไม่ติด' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  issue!: string;

  @ApiProperty({ enum: ['High', 'Medium', 'Low'], default: 'Medium' })
  @IsIn(['High', 'Medium', 'Low'])
  priority!: 'High' | 'Medium' | 'Low';
}
