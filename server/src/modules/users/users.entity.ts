import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Photo } from '../photos/photos.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @OneToMany(() => Photo, photo => photo.user)
  photos: Photo[];

  @OneToMany(() => Favorite, favorite => favorite.user)
  favorites: Favorite[];
}
