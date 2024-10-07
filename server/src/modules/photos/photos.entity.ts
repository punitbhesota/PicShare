import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/users.entity';
import { Favorite } from '../favorites/favorite.entity';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @Column()
  title: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, user => user.photos, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Favorite, favorite => favorite.photo)
  favorites: Favorite[];
}