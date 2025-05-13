import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, AdminModule, AuthModule],
  controllers: [],
})
export class AppModule {}
