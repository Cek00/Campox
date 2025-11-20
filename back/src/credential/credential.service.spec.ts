import { CredentialService } from './credential.service';
import { CredentialRepository } from './credential.repository';
import { NotFoundException } from '@nestjs/common';

describe('CredentialService', () => {
    let credentialService: CredentialService;
    let credentialRepository: CredentialRepository;

    beforeEach(() => {
        credentialRepository = {
            getAllCredentialsRepository: jest.fn(),
            getCredentialByUsernameRepository: jest.fn(),
            getCredentialByIdRepository: jest.fn(),
        } as unknown as CredentialRepository;

        credentialService = new CredentialService(credentialRepository);
    });

    describe('getAllCredentialsService', () => {
        it('Debe devolver todas las credenciales', () => {
            const mockCredentials = [{ id: '1' }, { id: '2' }];
            (
                credentialRepository.getAllCredentialsRepository as jest.Mock
            ).mockReturnValue(mockCredentials);

            const result = credentialService.getAllCredentialsService();
            expect(result).toEqual(mockCredentials);
            expect(
                credentialRepository.getAllCredentialsRepository,
            ).toHaveBeenCalledTimes(1);
        });
    });

    describe('getCredentialByUsernameService', () => {
        it('Debe devolver la credencial por nombre de usuario', async () => {
            const mockCredential = { username: 'user1', id: '123' };
            (
                credentialRepository.getCredentialByUsernameRepository as jest.Mock
            ).mockResolvedValue(mockCredential);

            const result =
                await credentialService.getCredentialByUsernameService('user1');

            expect(result).toEqual(mockCredential);
            expect(
                credentialRepository.getCredentialByUsernameRepository,
            ).toHaveBeenCalledWith('user1');
        });

        it('Debería lanzar una excepción NotFoundException si la credencial no existe.', async () => {
            (
                credentialRepository.getCredentialByUsernameRepository as jest.Mock
            ).mockResolvedValue(null);

            await expect(
                credentialService.getCredentialByUsernameService(
                    'nonexistentuser',
                ),
            ).rejects.toThrow(NotFoundException);
            expect(
                credentialRepository.getCredentialByUsernameRepository,
            ).toHaveBeenCalledWith('nonexistentuser');
        });
    });

    describe('getCredentialByIdService', () => {
        it('Debe devolver la credencial por id', async () => {
            const mockCredential = { id: 'uuid1', username: 'user2' };
            (
                credentialRepository.getCredentialByIdRepository as jest.Mock
            ).mockResolvedValue(mockCredential);
            const result =
                await credentialService.getCredentialByIdService('uuid1');
            expect(result).toEqual(mockCredential);
            expect(
                credentialRepository.getCredentialByIdRepository,
            ).toHaveBeenCalledWith('uuid1');
        });

        it('Debería lanzar una excepción NotFoundException si la credencial no existe.', async () => {
            (
                credentialRepository.getCredentialByIdRepository as jest.Mock
            ).mockResolvedValue(null);
            await expect(
                credentialService.getCredentialByIdService('nonexistent-id'),
            ).rejects.toThrow(NotFoundException);
            expect(
                credentialRepository.getCredentialByIdRepository,
            ).toHaveBeenCalledWith('nonexistent-id');
        });
    });
});
