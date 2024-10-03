import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';

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

  @ManyToOne(() => User, user => user.photos)
  user: User;

  @ManyToMany(() => User)
  @JoinTable()
  favorites: User[];
}