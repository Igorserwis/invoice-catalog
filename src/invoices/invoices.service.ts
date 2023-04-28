import { Injectable } from '@nestjs/common';
import { InvoiceDto } from './dto/invoices.dto';
import { InvoiceEntity } from './entities/invoices.entity';

let invoicesDB: Array<InvoiceEntity> = [];
let id: number = 1;

@Injectable()
export class InvoicesService {
  all() {
    return invoicesDB;
  }
  async add(data: InvoiceDto): Promise<string> {
    try {
      invoicesDB.push({
        id,
        customer: data.customer,
        issue_date: data.issue_date,
        net_price: data.net_price,
        products: data.products,
        purchase_date: data.purchase_date,
        supplier: data.supplier,
        tax: data.tax,
        total_price: data.total_price,
      });
      id++;
      return 'Invoice added';
    } catch (err) {
      return err;
    }
  }
  async remove(id: number): Promise<string> {
    if (invoicesDB.length == 0) {
      return 'DB is empty';
    }
    for (let i = 0; i < invoicesDB.length; i++) {
      if (invoicesDB[i].id == id) {
        invoicesDB.splice(i, 1);
        return `Invoice with ID ${id} has been deleted!`;
      }
    }
    return "Invoice with give ID doesn't exist!";
  }
}
