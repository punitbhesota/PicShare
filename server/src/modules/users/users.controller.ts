import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { GetUser } from '../../shared/decorators/get-user.decorator';
import { UserAuthGuard } from '../../shared/guards/user-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(UserAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: any) {
    return this.usersService.findById(user.userId);
  }
}