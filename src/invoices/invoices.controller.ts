import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { InvoiceDto } from './dto/invoices.dto';
import { InvoicesService } from './invoices.service';

@Controller()
export class InvoicesController {
  constructor(
    private readonly invoiceService: InvoicesService,
    @Inject('INVOICES_SERVICE') private readonly client: ClientProxy,
  ) {}
  @Get('invoices')
  all() {
    return this.invoiceService.all();
  }
  @Post('invoice')
  @UsePipes(ValidationPipe)
  async add(@Body() data: InvoiceDto): Promise<string> {
    const result = await this.invoiceService.add(data);
    if (result === 'Invoice added') {
      this.client.emit('Invoice_created', `Invoice created}`);
    } else {
      this.client.emit('Invoice_created', `Can't create invoice}`);
    }
    return result;
  }
  @Post('invoice/:id')
  async remove(@Param('id') id: number): Promise<string> {
    const result = await this.invoiceService.remove(id);
    if (result === `Invoice with ID ${id} has been deleted!`) {
      this.client.emit('Invoice_deleted', `Invoice with Id: ${id} deleted`);
    } else {
      this.client.emit(
        'Invoice_deleted',
        `Can't delete invoice with Id: ${id}`,
      );
    }
    return result;
  }
}
