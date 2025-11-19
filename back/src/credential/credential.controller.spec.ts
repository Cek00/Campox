import { Test, TestingModule } from '@nestjs/testing';
import { CredentialController } from './credential.controller';
import { CredentialService } from './credential.service';
import { AuthGuard } from 'src/auth/Guards/auth.guard';
import { RolesGuard } from 'src/auth/Guards/roles.guard';

describe('CredentialController', () => {
    let controller: CredentialController;
    let service: CredentialService;

    const mockCredentialService = {
        getAllCredentialsService: jest.fn(),
        getCredentialByUsernameService: jest.fn(),
        getCredentialByIdService: jest.fn(),
    };

    const mockAuthGuard = { canActivate: jest.fn(() => true) };
    const mockRolesGuard = { canActivate: jest.fn(() => true) };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [CredentialController],
            providers: [
                {
                    provide: CredentialService,
                    useValue: mockCredentialService,
                },
            ],
        })
            .overrideGuard(AuthGuard)
            .useValue(mockAuthGuard)
            .overrideGuard(RolesGuard)
            .useValue(mockRolesGuard)
            .compile();

        controller = module.get<CredentialController>(CredentialController);
        service = module.get<CredentialService>(CredentialService);
    });

    it('Debe estar definido', () => {
        expect(controller).toBeDefined();
    });

    it('Debe llamar al servicio para obtener todas las credenciales', () => {
        const mockResult = [{ id: 1, userName: 'paola' }];
        mockCredentialService.getAllCredentialsService.mockReturnValue(
            mockResult,
        );

        const result = controller.getAllCredentials();

        expect(result).toBe(mockResult);
        expect(service.getAllCredentialsService).toHaveBeenCalled();
    });

    it('Debe obtener credencial por username', () => {
        const mockResult = { id: 1, userName: 'paola' };
        mockCredentialService.getCredentialByUsernameService.mockReturnValue(
            mockResult,
        );

        const result = controller.getCredentialByUsername('paola');

        expect(result).toBe(mockResult);
        expect(service.getCredentialByUsernameService).toHaveBeenCalledWith(
            'paola',
        );
    });

    it('Debe obtener credencial por ID', () => {
        const uuid = '9dfd1c0e-b438-4bde-bb02-14728c7c6323';
        const mockResult = { id: uuid, userName: 'paola' };

        mockCredentialService.getCredentialByIdService.mockReturnValue(
            mockResult,
        );

        const result = controller.getCredentialById(uuid);

        expect(result).toBe(mockResult);
        expect(service.getCredentialByIdService).toHaveBeenCalledWith(uuid);
    });
});
