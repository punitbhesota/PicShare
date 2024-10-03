import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async login(username: string): Promise<{ user_id: number }> {
    let user = await this.usersService.findByUsername(username);
    if (!user) {
      user = await this.usersService.create({ username });
    }
    return { user_id: user.id };
  }
}