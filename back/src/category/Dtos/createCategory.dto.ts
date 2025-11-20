import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        description: 'Nombre de la categoria',
        example: 'Derivados artesanales',
        minLength: 5,
        maxLength: 30,
    
    })
    @IsNotEmpty({ message: 'El nombre de la categoria es obligatorio'})
    @IsString({ message: 'El nombre deber ser una cadena de caracteres'})
    @MinLength(5,{ message: 'El nombre debe tener minimo 5 caracteres'})
    @MaxLength(30,{
        message: 'El nombre no puede contener mas de 30 caracteres',
    })
    name: string;
}