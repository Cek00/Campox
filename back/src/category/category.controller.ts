import { Body, Controller, Get, Post, Put, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { CreateCategoryDto } from './Dtos/createCategory.dto';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { RolesEnum } from 'src/enum/roles.enum';
import { UpdateCategoryDto } from './Dtos/updateCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}

    // Ruta para obtener todas las categorias
    @ApiOperation({ summary: 'Obtener todas las categorias'})
    @ApiResponse({
        status: 200,
        description: 'Categorias obtenidas exitosamente',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('allCategories')
    findAll() {
        return this.categoryService.findAllServices();
    }

    // Ruta para obtener una categoria por su id
    @ApiOperation({ summary: 'Obtener una categoria por su id'})
    @ApiResponse({
        status: 200,
        description: 'Categorias obtenidas por id',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get('getCategory')
    getCategory() {
        return 'Devuelve su categoria por id';
    }

    // Ruta para crear una categoria
    @ApiOperation({ summary: 'Crear una categoria'})
    @ApiResponse({
        status: 201,
        description: 'Categoria creada exitosamente',
    })
     @ApiBearerAuth()
     @UseGuards(AuthGuard, RolesGuard)
     @Roles(RolesEnum.ADMIN)
     @Post('createCategory')
     create(@Body() createCategoryDto: CreateCategoryDto) {
       return this.categoryService.createCategory(createCategoryDto);
    }

    // Ruta para actualizar una categoria
    @ApiOperation({ summary: 'Actualizar una categoria'})
    @ApiResponse({
        status: 200,
        description: 'Categoria actualizada exitosamente',
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Put('updateCategory')
    update(@Body() UpdateCategoryDto) {
        return this.categoryService.updateCategory(UpdateCategoryDto);
    }

}
