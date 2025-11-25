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
import { PaymentService } from './payment.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { RolesEnum } from 'src/enum/roles.enum';
import { CreatePaymentDto } from './Dtos/createPayment.dto';
import { UpdatePaymentDto } from './Dtos/updatePayment.dto';

import {
  ApiBearerAuth,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Pagos')
@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  // Ruta para obtener todos los pagos
  @Get('getAllPayment')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiBearerAuth()
  getAllPayment() {
    return this.paymentService.getAllPaymentsService();
  }

  // Ruta para obtener un pago por su UUID
  @Get('getPaymentById/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiBearerAuth()
  getPaymentById(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.paymentService.getPaymentByIdService(uuid);
  }

  // Ruta para crear un nuevo pago
  @Post('createPayment')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiBearerAuth()
  createPayment(@Body() data: CreatePaymentDto) {
    return this.paymentService.createPaymentService(data);
  }

  // Ruta para actualizar un pago existente
  @Put('updatePayment/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiBearerAuth()
  updatePayment(
    @Param('uuid', ParseUUIDPipe) uuid: string,
    @Body() data: UpdatePaymentDto,
  ) {
    return this.paymentService.updatePaymentService(uuid, data);
  }

  // Ruta para eliminar un pago por su UUID
  @Delete('deletePayment/:uuid')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesEnum.ADMIN)
  @ApiBearerAuth()
  deletePayment(@Param('uuid', ParseUUIDPipe) uuid: string) {
    return this.paymentService.deletePaymentService(uuid);
  }
}