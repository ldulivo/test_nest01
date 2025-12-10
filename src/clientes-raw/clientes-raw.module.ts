import { Module } from '@nestjs/common';
import { ClientesRawController } from './clientes-raw.controller';
import { ClientesRawService } from './clientes-raw.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [ClientesRawController],
  providers: [ClientesRawService],
  exports: [ClientesRawService],
})
export class ClientesRawModule {}
