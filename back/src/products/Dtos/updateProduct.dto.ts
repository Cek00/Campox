import { PartialType } from "@nestjs/swagger";
import { CreatedProductDto } from "./createProduct.dto";

export class UpdateProductDto extends PartialType(CreatedProductDto) {}
