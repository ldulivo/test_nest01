import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InsertarMongooseModule } from './insertar_mongoose/insertar_mongoose.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ClientesRawModule } from './clientes-raw/clientes-raw.module';
import { ClientesRawMongoModule } from './clientes-raw-mongo/clientes-raw-mongo.module';
import { ResultModule } from './result/result.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    InsertarMongooseModule,
    ClientesRawModule,
    ClientesRawMongoModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
