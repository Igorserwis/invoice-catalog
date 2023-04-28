export class InvoiceEntity {
  id: number;
  issue_date: Date;
  purchase_date: Date;
  supplier: string;
  customer: string;
  products: string[];
  net_price: number;
  tax: number;
  total_price: number;
}
