import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Products } from 'src/entities/products.entity';
import { Repository } from 'typeorm';
import { CreatedProductDto } from './Dtos/createProduct.dto';
import { UpdateProductDto } from './Dtos/updateProduct.dto';

@Injectable()
export class ProductRepository {

  constructor(
    @InjectRepository(Products)
    private readonly productsDataBase: Repository<Products>,
  ) {}
  
   //metodo para obtener todos los productos

  async getAllProductsRepository() {
    return await this.productsDataBase.find();
  }

   //metodo para obtener el producto por su id

  async getProductById(uuid: string) {
    return await this.productsDataBase.findOne({ where: { uuid: uuid } });
  }

   //metodo para hacer un softDelete de un producto

  async deleteProductsRepository(productExisting: Products) {
    productExisting.isActive = false;
    await this.productsDataBase.save(productExisting);
    return {
      message: `Este Producto ${productExisting.name} ha sido eliminado`,
    };
  }

   //metodo para buscar un producto por su nombre

  async getProductByName(name: string) {
    return await this.productsDataBase.findOne({ where: { name: name } });
  }

  //metodo para crear un nuevo producto
  async createProductRepository(createProductDto: CreatedProductDto) {
    const newProduct = this.productsDataBase.create({
      ...createProductDto,
      createAt: new Date(),
    });
    await this.productsDataBase.save(newProduct);
    return newProduct;
  } 

   //metodo para actualizar un producto

  async updateProductRepository(
    productExisting: Products,
    updateProductDto: UpdateProductDto,
  ) {
    productExisting.name = updateProductDto.name || productExisting.name;
    productExisting.description =
    updateProductDto.description || productExisting.description;
    productExisting.price = updateProductDto.price || productExisting.price;
    productExisting.stock = updateProductDto.stock || productExisting.stock;

    await this.productsDataBase.save(productExisting);
    return productExisting;
  }
}