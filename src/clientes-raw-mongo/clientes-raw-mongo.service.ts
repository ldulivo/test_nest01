import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ClientesRaw, ClientesRawDocument } from './schemas/clientes_raw';
import { ClientesRawService } from 'src/clientes-raw/clientes-raw.service';

@Injectable()
export class ClientesRawMongoService {
  constructor(
    private readonly clientesRawService: ClientesRawService,
    @InjectModel(ClientesRaw.name)
    private clientesRawModel: Model<ClientesRawDocument>,
  ) {}

  async insertarClientes(): Promise<ClientesRaw[]> {
    // traer los datos de la coleccion ClientesRawService
    const clientes = await this.clientesRawService.getClientes();

    // Inserto los nuevos datos
    const resultado = await this.clientesRawModel.insertMany(clientes);
    return resultado;
  }
}
