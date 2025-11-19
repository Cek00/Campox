import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseUUIDPipe,
    Patch,
    Post,
    UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';
import { UpdateOrderDto } from './dto/update-order.dto';

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}
    @Get('getOrderById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener una orden por ID' })
    @ApiBearerAuth()
    getOrderById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderService.getOrderByIdService(uuid);
    }

    @Post('createOrder')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Crear una orden' })
    @ApiBearerAuth()
    createOrder(@Body() dto: CreateOrderDto) {
        return this.orderService.createOrderService(dto);
    }

    @Patch('updateOrder/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Actualizar una orden' })
    @ApiBearerAuth()
    updateOrder(
        @Param('uuid', ParseUUIDPipe) uuid: string,
        @Body() dto: UpdateOrderDto,
    ) {
        return this.orderService.updateOrderService(uuid, dto);
    }

    @Delete('deleteOrder/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Eliminar una orden' })
    @ApiBearerAuth()
    deleteOrder(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.orderService.deleteOrderService(uuid);
    }
}
