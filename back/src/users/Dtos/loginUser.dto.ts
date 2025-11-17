import { PickType } from '@nestjs/mapped-types';
import { CreatedUserDto } from './createUrser.dto';

export class LoginUserDto extends PickType(CreatedUserDto, [
    'userName',
    'password',
]) {}
