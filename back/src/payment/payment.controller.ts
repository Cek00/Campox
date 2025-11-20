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

    @Get('getAllPayment')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener todos los pagos' })
    @ApiResponse({ status: 200, description: 'Pagos obtenidos exitosamente' })
    @ApiBearerAuth()
    getAllPayment() {
        return this.paymentService.getAllPaymentsService();
    }

    @Get('getPaymentById/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Obtener un pago por ID' })
    @ApiResponse({ status: 200, description: 'Pago obtenido exitosamente' })
    @ApiNotFoundResponse({ description: 'El pago no existe' })
    @ApiBearerAuth()
    getPaymentById(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.paymentService.getPaymentByIdService(uuid);
    }

    @Post('createPayment')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Crear un pago' })
    @ApiResponse({ status: 201, description: 'Pago creado exitosamente' })
    @ApiBearerAuth()
    createPayment(@Body() data: CreatePaymentDto) {
        return this.paymentService.createPaymentService(data);
    }

    @Put('updatePayment')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Actualizar un pago' })
    @ApiResponse({ status: 200, description: 'Pago actualizado exitosamente' })
    @ApiNotFoundResponse({ description: 'El pago no existe' })
    @ApiBearerAuth()
    updatePayment(@Body() data: UpdatePaymentDto) {
        return this.paymentService.updatePaymentService(data);
    }

    @Delete('deletePayment/:uuid')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(RolesEnum.ADMIN)
    @ApiOperation({ summary: 'Eliminar un pago' })
    @ApiResponse({ status: 200, description: 'Pago eliminado exitosamente' })
    @ApiNotFoundResponse({ description: 'El pago no existe' })
    @ApiBearerAuth()
    deletePayment(@Param('uuid', ParseUUIDPipe) uuid: string) {
        return this.paymentService.deletePaymentService(uuid);
    }
}
