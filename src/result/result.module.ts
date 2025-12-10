import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  DatosExternos,
  DatosExternosSchema,
} from './schemas/datos-externos.schema';
import {
  ClienteFinal,
  ClienteFinalSchema,
} from './schemas/cliente-final.schema';
import {
  ClientesRaw,
  ClientesRawSchema,
} from 'src/clientes-raw-mongo/schemas/clientes_raw'; // reutilizamos el schema que ya tienes

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: DatosExternos.name, schema: DatosExternosSchema },
      { name: ClienteFinal.name, schema: ClienteFinalSchema },
      { name: ClientesRaw.name, schema: ClientesRawSchema },
    ]),
  ],
  controllers: [ResultController],
  providers: [ResultService],
})
export class ResultModule {}
