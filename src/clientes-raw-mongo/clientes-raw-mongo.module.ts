import { Module } from '@nestjs/common';
import { ClientesRawMongoService } from './clientes-raw-mongo.service';
import { ClientesRawMongoController } from './clientes-raw-mongo.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientesRaw, ClientesRawSchema } from './schemas/clientes_raw';
import { ClientesRawModule } from 'src/clientes-raw/clientes-raw.module';

@Module({
  imports: [
    ClientesRawModule,
    MongooseModule.forFeature([
      { name: ClientesRaw.name, schema: ClientesRawSchema },
    ]),
  ],
  providers: [ClientesRawMongoService],
  controllers: [ClientesRawMongoController],
})
export class ClientesRawMongoModule {}
