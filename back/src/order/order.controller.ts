import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
    UseGuards,
} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiNotFoundResponse,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@ApiTags('Pedidos')
@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Get('getOrderById/:uuid')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Obtener un pedido por su ID' })
    @ApiResponse({
        status: 200,
        description: 'Pedido obtenido exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este pedido no existe',
    })
    @ApiBearerAuth()
    getOrderById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderService.getOrderByIdService(uuid);
    }

    @Post('createOrder')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Crear un pedido' })
    @ApiResponse({
        status: 200,
        description: 'Pedido creado exitosamente',
    })
    @ApiNotFoundResponse({
        description: 'Este usuario no existe',
    })
    @ApiBearerAuth()
    createOrder(@Body() data: CreateOrderDto) {
        return this.orderService.createOrderService(data);
    }

    @Put('updateOrder')
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Actualizar un pedido' })
    @ApiResponse({
        status: 200,
        description: 'Pedido actualizado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Este pedido no existe',
    })
    @ApiBearerAuth()
    updateOrder(@Body() data: UpdateOrderDto) {
        return this.orderService.updateOrderService(data);
    }

    @Delete('deleteOrder/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Eliminar un pedido' })
    @ApiResponse({
        status: 200,
        description: 'Pedido eliminado con exito.',
    })
    @ApiNotFoundResponse({
        description: 'Este pedido no existe',
    })
    @ApiBearerAuth()
    deleteOrder(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderService.deleteOrderService(uuid);
    }
}
