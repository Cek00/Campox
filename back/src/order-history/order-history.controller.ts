import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    ParseUUIDPipe,
    UseGuards,
    Put,
} from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import {
    ApiTags,
    ApiOperation,
    ApiBearerAuth,
    ApiQuery,
    ApiNotFoundResponse,
    ApiResponse,
} from '@nestjs/swagger';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';

@ApiTags('Historial de Pedidos')
@Controller('order-history')
export class OrderHistoryController {
    constructor(private readonly orderHistoryService: OrderHistoryService) {}

    @Get('getById/:uuid')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener historial de pedido por su id' })
    @ApiResponse({
        status: 200,
        description: 'Historial de pedido obtenido exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Historial de pedido no existe',
    })
    @ApiBearerAuth()
    getById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderHistoryService.getByIdService(uuid);
    }

    @Post('create')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Crear historial de un pedido' })
    @ApiResponse({
        status: 200,
        description: 'Historial pedido creado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este pedido no existe',
    })
    @ApiBearerAuth()
    create(@Body() data: CreateOrderHistoryDto) {
        return this.orderHistoryService.createService(data);
    }

    @Put('update')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Actualizar un historial de pedido' })
    @ApiResponse({
        status: 200,
        description: 'Historial de pedido actualizado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Este historial de pedido no existe',
    })
    @ApiBearerAuth()
    update(@Body() data: UpdateOrderHistoryDto) {
        return this.orderHistoryService.updateService(data);
    }

    @Delete('delete/:uuid')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Eliminar registro de historial' })
    @ApiResponse({
        status: 200,
        description: 'Historial de pedido eliminado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Historial de pedido no existe',
    })
    @ApiBearerAuth()
    remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderHistoryService.deleteService(uuid);
    }
}
