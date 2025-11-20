import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductRepository } from './products.repository';
import { CreatedProductDto } from './Dtos/createProduct.dto';
import { UpdateProductDto } from './Dtos/updateProduct.dto';

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductRepository) {}

   //servicio para obtener todos los productos

  async getAllProductsService() {
    return await this.productRepository.getAllProductsRepository();
  }

   //servicio para eliminar un producto

  async deleteProductsService(uuid: string) {
    const productExisting = await this.productRepository.getProductById(uuid);
    if (!productExisting) {
      throw new NotFoundException('Este producto no existe');
    }

    if (productExisting.isActive === false) {
      throw new BadRequestException('Este producto esta inactivo');
    }

    return this.productRepository.deleteProductsRepository(productExisting);
  }

   //servicio para crear un nuevo producto

  async createProductService(createProductDto: CreatedProductDto) {
    const nameExists = await this.productRepository.getProductByName(
      createProductDto.name,
    );
    if (nameExists) {
      throw new BadRequestException(
        'Ya existe un producto registrado con este nombre',
      );
    }
    if (createProductDto.price <= 0) {
      throw new BadRequestException(
        'El precio del producto debe ser mayor a cero',
      );
    }
    if (createProductDto.stock < 0) {
      throw new BadRequestException(
        'El stock del producto no puede ser negativo',
      );
    }
    return await this.productRepository.createProductRepository(
      createProductDto,
    );
  }

   //servicio para actualizar un producto
  
  async updateProductService(uuid: string, updateProductDto: UpdateProductDto) {
    const productExisting = await this.productRepository.getProductById(uuid);
    if (!productExisting) {
      throw new NotFoundException('Este producto no existe');
    }

    if (updateProductDto.price !== undefined && updateProductDto.price <= 0) {
      throw new BadRequestException(
        'El precio del producto debe ser mayor a cero',
      );
    }
    if (updateProductDto.stock !== undefined && updateProductDto.stock < 0) {
      throw new BadRequestException(
        'El stock del producto no puede ser negativo',
      );
    }

    if (updateProductDto.name) {
      const nameExists = await this.productRepository.getProductByName(
        updateProductDto.name,
      );
      if (nameExists && nameExists.uuid !== uuid) {
        throw new BadRequestException(
          'Ya existe un producto registrado con este nombre',
        );
      }
    }
    return await this.productRepository.updateProductRepository(
      productExisting,
      updateProductDto,
    );
  }
}
