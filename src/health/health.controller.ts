import { Controller, Get } from '@nestjs/common';
import * as amqp from 'amqplib/callback_api';

@Controller('health')
export class HealthController {
  private messageCount = 0;
  private queue = '';
  private messageUnreaded = 0;
  private consumerCount = 0;
  constructor() {
    amqp.connect('amqp://localhost', async (error, connection) => {
      if (error) {
        this.queue = 'CONNECTION ERROR';
        this.consumerCount = 0;
        this.messageUnreaded = 0;
        this.messageCount = 0;
        return error;
      }
      connection.createChannel((error, channel) => {
        if (error) {
          return error;
        }
        channel.consume('invoices_queue', (message) => {
          this.messageCount++;
        });
        channel.checkQueue('invoices_queue', (err, que) => {
          if (err) {
            return err;
          }
          this.queue = que.queue;
          this.consumerCount = que.consumerCount;
          this.messageUnreaded = que.messageCount;
          return que;
        });
      });
    });
  }
  @Get()
  async accessibility() {
    return {
      RabbitStatus: {
        queue: this.queue,
        consumers: this.consumerCount,
        messageInQue: this.messageUnreaded,
        allMessage: this.messageCount,
      },
    };
  }
}
