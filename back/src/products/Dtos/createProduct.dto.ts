import { IsInt, IsNotEmpty, IsNumber, IsString, IsUrl, MaxLength, Min, MinLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty({ 
        message: 'El nombre del producto es obligatorio'})

    @IsString({
        message: 'El nombre debe ser una cadena de texto'})

    @MinLength(10,
        { message: 'El nombre debe tener al menos 10 caracteres'})

    @MaxLength(55,
        { message:'El nombre no puede tener mas de 55 caracteres'})
        name: string;

    @IsUrl({}, { message: 'La URL de la imagen no es valida'})
    @IsString({ message: 'La URL debe ser una cadena de caracteres'})
        imgUrl?: string;

    @IsString({
        message: 'La descripcion debe ser una cadena de texto'})
        description: string;
    
    @IsNotEmpty({
        message: 'El precio del producto es obligatorio'})
    @IsNumber({},
        {message: 'El precio debe ser un número'})
        price: number;

    @IsNotEmpty({ message: 'El stock es requerido'})
    @IsInt({ message: 'El stock debe ser un número entero'})
    @Min(0, {message: 'El stock no puede ser negativo'})
    stock: number;

}