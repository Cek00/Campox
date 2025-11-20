import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsPositive, IsString, IsUrl, MaxLength, Min, MinLength } from "class-validator";

export class CreatedProductDto {
    @ApiProperty({
        description: 'Nombre del producto',
        example: 'Huevos campesinos',
        maxLength: 100,
        minLength: 5,
    })
    @IsNotEmpty({ message: 'El nombre del producto es obligatorio'})
    @IsString({message: 'El nombre debe ser una cadena de texto'})
    @MinLength(5,{ message: 'El nombre debe tener al menos 5 caracteres'})
    @MaxLength(100,{ message:'El nombre no puede tener mas de 55 caracteres'})
        name: string;

    @ApiProperty({
        description: 'URL de la imagen del producto',
        example: 'https://i.postimg.cc/4xcZd713/huevos-campesinos.jpg',
        required: false,
        default: 'https://postimg.cc/NKBCrXGm'
    })
    @IsOptional()
    @IsUrl({}, { message: 'La URL de la imagen no es valida'})
    @IsString({ message: 'La URL debe ser una cadena de caracteres'})
        imgUrl?: string;

    @ApiProperty({
        description: 'Descripcion detallada del producto',
        example: 'Huevos campesinos frescos, producidos por gallinas criadas en el campo con alimentación natural',
        minLength: 10,

    })
    @IsNotEmpty({ message: 'La descripción es requerida'})
    @IsString({message: 'La descripcion debe ser una cadena de caracteres'})
    @MinLength(10,{message: 'La descripción debe tener mínimo 10 caracteres'})
        description: string;
    
    @ApiProperty({
        description:'Precio del producto',
        example: 15000.99,
        minimum: 0.01,
    })
    @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
    @IsNumber( 
        {maxDecimalPlaces: 2}, 
        {message: 'El precio debe ser un número máximo de 2 decimales'},
    )
    @IsPositive({ message: 'El precio debe ser un número positivo'})
        price: number;

    @ApiProperty({
        description: 'Cantidad de productos disponibles en stock',
        example: 50,
        minimum: 0,
    })
    @IsNotEmpty({ message: 'El stock es requerido'})
    @IsInt({ message: 'El stock debe ser un número entero'})
    @Min(0, {message: 'El stock no puede ser negativo'})
    stock: number;

}