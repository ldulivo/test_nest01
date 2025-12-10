import { Module } from '@nestjs/common';
import { InsertarMongooseController } from './insertar_mongoose.controller';
import { InsertarMongooseService } from './insertar_mongoose.service';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './schemas/post.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [InsertarMongooseController],
  providers: [InsertarMongooseService],
})
export class InsertarMongooseModule {}
