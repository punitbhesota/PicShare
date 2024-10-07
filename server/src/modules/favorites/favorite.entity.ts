import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Photo } from '../photos/photos.entity';

@Entity()
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Photo, photo => photo.favorites, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'photo_id' })
  photo: Photo;
}
