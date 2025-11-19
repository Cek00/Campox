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
} from '@nestjs/common';
import { OrderHistoryService } from './order-history.service';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';

@ApiTags('Order History')
@Controller('order-history')
export class OrderHistoryController {
  constructor(private readonly service: OrderHistoryService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Crear registro en el historial de un pedido' })
  @ApiBearerAuth()
  create(@Body() dto: CreateOrderHistoryDto) {
    return this.service.create(dto);
  }

  @Get('getAll')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los historiales' })
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }

  @Get(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Obtener historial por id' })
  @ApiBearerAuth()
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.service.findOne(uuid);
  }

  @Get('by-order')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiQuery({ name: 'orderUuid', required: true })
  @ApiOperation({ summary: 'Obtener historial por pedido' })
  @ApiBearerAuth()
  findByOrder(@Query('orderUuid') orderUuid: string) {
    return this.service.findByOrder(orderUuid);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar registro de historial' })
  @ApiBearerAuth()
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.service.remove(uuid);
  }
}
