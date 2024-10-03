import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photos.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    const photo = this.photosRepository.create({
      ...createPhotoDto,
      date: new Date(),
    });
    return this.photosRepository.save(photo);
  }

  async findAll(userId?: number): Promise<Photo[]> {
    if (userId) {
      return this.photosRepository.createQueryBuilder('photo')
        .leftJoinAndSelect('photo.favorites', 'favorite')
        .addSelect('CASE WHEN favorite.userId = :userId THEN true ELSE false END', 'isFavorite')
        .setParameter('userId', userId)
        .getMany();
    } else {
      return this.photosRepository.find();
    }
  }

  async getFavorites(userId: number): Promise<Photo[]> {
    return this.photosRepository.createQueryBuilder('photo')
      .innerJoin('photo.favorites', 'favorite', 'favorite.userId = :userId', { userId })
      .getMany();
  }

  async favorite(photoId: number, userId: number): Promise<Photo> {
    const photo = await this.photosRepository.findOne({
      where: { id: photoId },
      relations: ['favorites'],
    });
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }
    
    const userIndex = photo.favorites.findIndex(user => user.id === userId);
    if (userIndex > -1) {
      photo.favorites.splice(userIndex, 1);
    } else {
      photo.favorites.push({ id: userId } as any);
    }
    
    return this.photosRepository.save(photo);
  }
}