import { Controller, Get } from '@nestjs/common';
import { InsertarMongooseService } from './insertar_mongoose.service';

@Controller('insertar-mongoose')
export class InsertarMongooseController {
  constructor(
    private readonly insertarMongooseService: InsertarMongooseService,
  ) {}

  @Get()
  obtenerDatos() {
    return this.insertarMongooseService.getPosts();
  }
}
