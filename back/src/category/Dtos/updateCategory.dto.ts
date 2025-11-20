import { ApiProperty, PartialType } from "@nestjs/swagger";
import { CreateCategoryDto } from "./createCategory.dto";
import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    @ApiProperty({
        description: 'UUID de la categoria a actualizar',
    })
    @IsNotEmpty({ message: 'El id de la categoria es obligatorio'})
    @IsString({ message: 'El id debe ser una cadena de caracteres' })
    @IsUUID('4', { message: 'El id de la categoria debe tener un formato UUID' })
    id: string;
}