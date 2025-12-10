import { Controller, Get } from '@nestjs/common';
import { ClientesRawService } from './clientes-raw.service';

@Controller('clientes-raw')
export class ClientesRawController {
  constructor(private readonly clientesRawService: ClientesRawService) {}

  @Get()
  obtenerClientes() {
    return this.clientesRawService.getClientes();
  }
}
