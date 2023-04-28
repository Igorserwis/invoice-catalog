import { IsArray, IsNumber, IsString, IsISO8601 } from 'class-validator';
export class InvoiceDto {
  @IsISO8601()
  issue_date: Date;

  @IsISO8601()
  purchase_date: Date;

  @IsString()
  supplier: string;

  @IsString()
  customer: string;

  @IsArray()
  products: string[];

  @IsNumber()
  net_price: number;

  @IsNumber()
  tax: number;

  @IsNumber()
  total_price: number;
}
