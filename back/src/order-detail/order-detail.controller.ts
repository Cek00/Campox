import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Put,
    Query,
    ParseUUIDPipe,
    UseGuards,
} from '@nestjs/common';
//import { OrderDetailService } from './order-detail.service';
import { CreateOrderDetailDto } from './dto/create-order-detail.dto';
import { UpdateOrderDetailDto } from './dto/update-order-detail.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
    ApiQuery,
    ApiNotFoundResponse,
} from '@nestjs/swagger';

@ApiTags('Detalle de Pedido')
@Controller('order-detail')
export class OrderDetailController {
    constructor(private readonly orderDetailService: OrderDetailService) {}

    @Get('getById/:uuid')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener detalle de pedido por su id' })
    @ApiResponse({
        status: 200,
        description: 'Detalle de pedido obtenido exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Detalle de pedido no existe',
    })
    @ApiBearerAuth()
    getById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderDetailService.getByIdService(uuid);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Crear detalle de un pedido' })
    @ApiResponse({
        status: 200,
        description: 'Detalle pedido creado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este pedido no existe',
    })
    @ApiBearerAuth()
    create(@Body() data: CreateOrderDetailDto) {
        return this.orderDetailService.createService(data);
    }

    @Put('update')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Actualizar un detalle de pedido' })
    @ApiResponse({
        status: 200,
        description: 'Detalle de pedido actualizado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Este detalle de pedido no existe',
    })
    @ApiBearerAuth()
    update(@Body() data: UpdateOrderDetailDto) {
        return this.orderDetailService.updateService(data);
    }

    @Delete('delete/:uuid')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Eliminar detalle pedido' })
    @ApiResponse({
        status: 200,
        description: 'Detalle de pedido eliminado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Detalle de pedido no existe',
    })
    @ApiBearerAuth()
    remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderDetailService.deleteService(uuid);
    }
}
