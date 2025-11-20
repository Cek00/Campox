import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatedProductDto } from './Dtos/createProduct.dto';
import { UpdateProductDto } from './Dtos/updateProduct.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Ruta para obtener todos los productos
    
    @ApiOperation({ summary: 'Obtener todos los productos'})
    @ApiResponse({ status: 200, description: 'Lista de productos obtenida'})
    @Get('getAllProducts')
    getAllProducts() {
        return this.productsService.getAllProductsService();
    }

    // Ruta para crear un producto
    
    @ApiOperation({ summary: 'Crear un nuevo producto'})
    @ApiResponse({ status: 201, description: 'Producto creado correctamente'})
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Post('createProduct')
    createdProduct(@Body() createProductDto: CreatedProductDto) {
        return this.productsService.createProductService(createProductDto)

    }

    // Ruta para actualizar un producto

    @ApiOperation({ summary: 'Actualizar un producto'})
    @ApiResponse({
        status: 200,
        description: 'Producto actualizado correctamente'
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Put('updateProduct/:uuid')
    UpdateProduct(
        @Param('uuid', ParseUUIDPipe) uuid: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.updateProductService(uuid, updateProductDto);
    }

    // Ruta para eliminar un producto

    @ApiOperation({ summary: 'Eliminar un producto'})
    @ApiResponse({
        status: 200,
        description: 'Producto eliminado correctamente '
    })
    @ApiBearerAuth()
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @Delete('delete/:uuid')
    deleteProduct(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.productsService.deleteProductsService(uuid);
    }

}
