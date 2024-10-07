import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Photo } from './photos.entity';
import { CreatePhotoDto } from './dto/create-photo.dto';
import { Favorite } from '../favorites/favorite.entity';
import { User } from '../users/users.entity';

@Injectable()
export class PhotosService {
  constructor(
    @InjectRepository(Photo)
    private photosRepository: Repository<Photo>,
    @InjectRepository(Favorite) 
    private favoritesRepository: Repository<Favorite>,
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}

  async create(createPhotoDto: CreatePhotoDto): Promise<Photo> {
    let userId = createPhotoDto.user_id;
    const user = await this.usersRepository.findOne({
      where: { id: userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const photo = this.photosRepository.create({
      ...createPhotoDto,
      date: new Date(),
      user: user,
    });

    return this.photosRepository.save(photo);
  }

  async findAll(pageNo: number, userId?: number,isFavorite?:boolean): Promise<{ posts: Photo[], hasMore: boolean ,feedOpen:boolean}> {
    const take = 10;
    const skip = (pageNo - 1) * take;
  
    let query = this.photosRepository.createQueryBuilder('photo')
      .leftJoinAndSelect('photo.user', 'owner')
      .skip(skip)
      .take(take);
  
    if (userId) {
      // if(isFavorite){
      //   query = query
      //   .leftJoinAndSelect('photo.favorites', 'favorite')
      //   .where('favorite.user.id = :userId', { userId }) 
      //   .addSelect('CASE WHEN user.id = :userId THEN true ELSE false END', 'isFavorite')
      //   .setParameter('userId', userId);
      // }
      // else{
        query = query
        .leftJoinAndSelect('photo.favorites', 'favorite')
        .leftJoinAndSelect('favorite.user', 'user')
        .addSelect('CASE WHEN user.id = :userId THEN true ELSE false END', 'isFavorite')
        .setParameter('userId', userId);
      // }   
    }
  
    const [posts, total] = await query.getManyAndCount();
  
    const hasMore = skip + take < total;
    
    let result = posts;
    
    if(userId){
      result = posts.map(photo => {
        let fav = photo.favorites
        let liked = fav.find((item)=>item?.user?.id==userId)
        return {
          ...photo,
          isFavorite: liked?.id?true:false,
          username: photo.user?.username
        };
      });
      if(isFavorite){
        result = result.filter((photo:any) => photo.isFavorite);
      }
    }

    else{
      result = posts.map(photo => {
        return {
          ...photo,
          isFavorite: false,
          username: photo.user?.username
        };
      });
    }
  
    return { posts:result, hasMore,feedOpen:userId?false:true };
  }
  
  async favorite(photoId: number, userId: number): Promise<Photo> {
    const photo = await this.photosRepository.findOne({
      where: { id: photoId },
      relations: ['favorites'],
    });
    
    if (!photo) {
      throw new NotFoundException('Photo not found');
    }

    const favorite = await this.favoritesRepository.findOne({
      where: { photo: { id: photoId }, user: { id: userId } },
    });

    if (favorite) {
      await this.favoritesRepository.remove(favorite);
    } else {
      const newFavorite = this.favoritesRepository.create({
        user: { id: userId } as any,   
        photo: { id: photoId } as any,
      });
      await this.favoritesRepository.save(newFavorite);
    }

    return this.photosRepository.findOne({
      where: { id: photoId },
      relations: ['favorites'],
    });
  }

}