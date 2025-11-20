import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
   // Metodo para obtener todas las categorias
  async findAllRepository() {
    return await this.categoryRepository.find();
  }
 
   // Metodo para buscar una categoria por su nombre
  async findByNameRepository(name: string) {
    return await this.categoryRepository.findOne({ where: { name: name } });
  }

   // Metodo para crear una categoria
  async createRepository(createCategoryDto: CreateCategoryDto) {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

   // Metodo para buscar una categoria por su id
  async findByIdRepository(id: string) {
    return await this.categoryRepository.findOne({ where: { uuid: id } });
  }

   // Metodo para actualizar una categoria
  async updateRepository(
    categoryToUpdate: Category,
    updateCategoryDto: UpdateCategoryDto,
  ) {
    categoryToUpdate.name = updateCategoryDto.name || categoryToUpdate.name;
    await this.categoryRepository.save(categoryToUpdate);
    return 'Categoria actualizada exitosamente';
  }
}