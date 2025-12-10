import { Controller, Get } from '@nestjs/common';
import { ClientesRawMongoService } from './clientes-raw-mongo.service';

@Controller('clientes-raw-mongo')
export class ClientesRawMongoController {
  constructor(
    private readonly clientesRawMongoService: ClientesRawMongoService,
  ) {}

  @Get()
  insertarClientes() {
    return this.clientesRawMongoService.insertarClientes();
  }
}
