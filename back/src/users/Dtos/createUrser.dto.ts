import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';

export class CreatedUserDto {
    @ApiProperty({
        description: 'Nombre del usuario',
        example: 'Juan',
        minLength: 3,
        maxLength: 25,
    })
    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({
        message: 'El nombre debe ser una cadena de caracteres',
    })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, {
        message: 'El nombre solo puede contener letras y espacios',
    })
    @MinLength(3, {
        message: 'El nombre debe tener minimo 3 caracteres',
    })
    @MaxLength(25, {
        message: 'El nombre no puede contener mas de 25 caracteres',
    })
    name: string;

    @ApiProperty({
        description: 'Apellido del usuario',
        example: 'Florez',
        minLength: 3,
        maxLength: 25,
    })
    @IsNotEmpty({
        message: 'El apellido es requerido',
    })
    @IsString({
        message: 'El apellido debe ser una cadena de caracteres',
    })
    @Matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$/, {
        message: 'El apellido solo puede contener letras y espacios',
    })
    @MinLength(3, {
        message: 'El apellido debe tener minimo 3 caracteres',
    })
    @MaxLength(25, {
        message: 'El apellido no puede contener mas de 25 caracteres',
    })
    lastName: string;

    @ApiProperty({
        description: 'Correo del usuario',
        example: 'juan@gmail.com',
    })
    @IsNotEmpty({
        message: 'El correo electronico es requerido',
    })
    @IsEmail(
        {},
        {
            message: 'El email debe tener un formato de correo electronico',
        },
    )
    email: string;

    @ApiProperty({
        description: 'Telefono del usuario',
        example: 3146687436,
    })
    @IsNotEmpty({
        message: 'El numero telefonico es requerido',
    })
    @IsNumber({}, { message: 'El numero telefonico debe ser un numero' })
    @IsPositive({
        message: 'El numero telefonico debe ser mayor que cero',
    })
    phoneNumber: number;

    @ApiProperty({
        description: 'Direccion del usuario',
        example: 'carrera 45 # 23-67',
        minLength: 8,
    })
    @IsNotEmpty({
        message: 'La direccion es requerida',
    })
    @IsString({
        message: 'La direccion debe ser una cadena de caracteres',
    })
    @MinLength(8, {
        message: 'La direccion debe tener minimo 8 caracteres',
    })
    adress: string;

    @ApiProperty({
        description: 'Fecha de nacimiento del usuario',
        example: '13/08/2025',
        pattern: 'dd/mm/aaaa',
    })
    @IsNotEmpty({
        message: 'La fecha de cumpleaños es requerida',
    })
    @Matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, {
        message: 'La fecha de cumpleaños debe estar en formato dd/mm/aaaa',
    })
    birthDate: Date;

    @ApiProperty({
        description: 'Nombre de usuario para autenticación',
        example: 'angy12',
    })
    @IsNotEmpty({
        message: 'El nombre de usuario es requerido',
    })
    @IsString({
        message: 'El nombre de usuario debe ser una cadena caracteres',
    })
    userName: string;

    @ApiProperty({
        description:
            'Contraseña del usuario (mínimo 8 caracteres, debe incluir mayúsculas, minúsculas, números y caracteres especiales)',
        example: 'Angypao12_',
    })
    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de caracteres' })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
        {
            message:
                'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula, un número y un carácter especial',
        },
    )
    password: string;
}
