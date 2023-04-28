## Description

Invoices Service

## Installation

Configuration steps:

- Docker installed
- $ docker run -d --hostname invoices-rabbit --name invoices-rabbit -p 5672:5672 -p 15672:15672 rabbitmq:3-management
- Login to: http://localhost:15672 user: guest, password guest
- Create queue "invoices_queue", Durability - Transient; - why? because one of our controller use this queue before initialization in other module.
- npm install

      Hint: If you want delete invoice, you need to have his id.
      eg: POST: /invoice/1

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
