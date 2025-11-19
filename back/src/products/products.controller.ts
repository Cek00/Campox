import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { RolesEnum } from 'src/enum/roles.enum';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    // Ruta para obtener todos los productos

    @Get('getAllProducts')
    getAllProducts() {
   //     return this.productsService.getAllProductsService();
    }

    // Ruta para obtener un producto por su id

    @Get('getProductById/:uuid')
    getProductById(@Param('uuid', ParseUUIDPipe) uuid: string) {
     //   return this.productsService.getProductByIdService(uuid);
    }

    // Ruta para crear un producto

    //@Post('createProduct')
    //@UseGuards(AuthGuard, RolesGuard)
    //@Roles(RolesEnum.ADMIN)
    //postCreateProduct(@Body() createProductDto: CreateProductDto); {

    }
//}
