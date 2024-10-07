import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PhotosController } from './photos.controller';
import { PhotosService } from './photos.service';
import { Photo } from './photos.entity';
import { Favorite } from '../favorites/favorite.entity';
import { User } from '../users/users.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Photo, Favorite,User,SharedModule])],
  controllers: [PhotosController],
  providers: [PhotosService],
})
export class PhotosModule {}