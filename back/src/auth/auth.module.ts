import { Module } from '@nestjs/common';
import { CredentialModule } from 'src/credential/credential.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [CredentialModule],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
