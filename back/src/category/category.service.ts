import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  // Servicio para obtener todas las categorias
  findAllServices() {
    return this.categoryRepository.findAllRepository();
  }

  // Servicio para crear una categoria
  async createCategory(createCategoryDto: CreateCategoryDto) {
    const categoryExists = await this.categoryRepository.findByNameRepository(
      createCategoryDto.name,
    );
    if (categoryExists) {
      throw new ConflictException('La categoria ya existe');
    }
    return this.categoryRepository.createRepository(createCategoryDto);
  }

  // Servicio para actualizar una categoria
  async updateCategory(updateCategoryDto: UpdateCategoryDto) {
    const categoryToUpdate = await this.categoryRepository.findByIdRepository(
      updateCategoryDto.id,
    );
    if (!categoryToUpdate) {
      throw new NotFoundException('La categoria no existe');
    }
    return this.categoryRepository.updateRepository(
      categoryToUpdate,
      updateCategoryDto,
    );
  }
}
