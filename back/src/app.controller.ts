import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('General')
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @ApiOperation({ summary: 'Mensaje de bienvenida' })
    @ApiResponse({ status: 200, description: 'Mensaje de bienvenida exitoso.' })
    @Get()
    getHello(): string {
        return this.appService.getHello();
    }
}
