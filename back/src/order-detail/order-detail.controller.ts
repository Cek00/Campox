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
import { OrderDetailService } from './order-detail.service';
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

@ApiTags('Order Details')
@Controller('order-detail')
export class OrderDetailController {
  constructor(private readonly service: OrderDetailService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.USER, RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Crear detalle de pedido' })
  @ApiResponse({ status: 201, description: 'Detalle creado.' })
  @ApiBearerAuth()
  create(@Body() dto: CreateOrderDetailDto) {
    return this.service.create(dto);
  }

  @Get('getAll')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Obtener todos los detalles' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  findAll() {
    return this.service.findAll();
  }

  @Get(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Obtener detalle por id' })
  @ApiResponse({ status: 200 })
  @ApiNotFoundResponse({ description: 'No existe' })
  @ApiBearerAuth()
  findOne(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.service.findOne(uuid);
  }

  @Get('by-order')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiQuery({ name: 'orderUuid', required: true })
  @ApiOperation({ summary: 'Obtener detalles por pedido' })
  @ApiBearerAuth()
  findByOrder(@Query('orderUuid') orderUuid: string) {
    return this.service.findByOrder(orderUuid);
  }

  @Put(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN, RolesEnum.USER)
  @ApiOperation({ summary: 'Actualizar detalle' })
  @ApiBearerAuth()
  update(@Param('uuid', ParseUUIDPipe) uuid: string, @Body() dto: UpdateOrderDetailDto) {
    return this.service.update(uuid, dto);
  }

  @Delete(':uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiOperation({ summary: 'Eliminar detalle' })
  @ApiBearerAuth()
  remove(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.service.remove(uuid);
  }
}
