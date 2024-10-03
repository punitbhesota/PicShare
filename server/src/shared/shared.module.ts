import { Module } from '@nestjs/common';
import { UserAuthGuard } from './guards/user-auth.guard';
import { UsersModule } from '../modules/users/users.module';

@Module({
  imports: [UsersModule],
  providers: [UserAuthGuard],
  exports: [UserAuthGuard],
})
export class SharedModule {}