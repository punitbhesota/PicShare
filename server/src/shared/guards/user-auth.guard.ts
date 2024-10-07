import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/modules/users/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthGuard implements CanActivate {
  @InjectRepository(User) 
    private usersRepository: Repository<User>

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.headers.user_id;

    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    const user = await this.usersRepository.findOne({ where: { id:Number(userId) } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    request.user = user;

    return true;
  }
}