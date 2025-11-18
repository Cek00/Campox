import { PickType } from '@nestjs/swagger';
import { CreatedUserDto } from './createUrser.dto';

export class LoginUserDto extends PickType(CreatedUserDto, [
    'userName',
    'password',
]) {}
