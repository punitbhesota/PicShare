import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../modules/users/users.service';

@Injectable()
export class UserAuthGuard implements CanActivate {
//   constructor(public usersService: UsersService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const userId = request.query.user_id;

    if (!userId) {
      throw new UnauthorizedException('User ID is required');
    }

    // const user = await this.usersService.findById(Number(userId));
    // if (!user) {
    //   throw new UnauthorizedException('User not found');
    // }

    // request.user = user;

    return true;
  }
}