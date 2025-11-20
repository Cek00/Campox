import { CredentialRepository } from './credential.repository';
import { Repository } from 'typeorm';
import { CredentialsEntity } from 'src/entities/credentials.entity';

describe('CredentialRepository', () => {
    let credentialRepository: CredentialRepository;
    let credentialDataBase: Repository<CredentialsEntity>;

    beforeEach(() => {
        credentialDataBase = {
            find: jest.fn(),
            findOne: jest.fn(),
        } as unknown as Repository<CredentialsEntity>;

        credentialRepository = new CredentialRepository(credentialDataBase);
    });

    describe('getAllCredentialsRepository', () => {
        it('debe devolver todas las credenciales con relación de usuario', async () => {
            const mockCredentials = [{ uuid: '1' }, { uuid: '2' }];
            (credentialDataBase.find as jest.Mock).mockResolvedValue(
                mockCredentials,
            );

            const result =
                await credentialRepository.getAllCredentialsRepository();
            expect(result).toEqual(mockCredentials);
            expect(credentialDataBase.find).toHaveBeenCalledWith({
                relations: ['user'],
            });
        });
    });

    describe('getCredentialByUsernameRepository', () => {
        it('debe devolver la credencial por nombre de usuario', async () => {
            const mockCredential = { username: 'user1', uuid: '123' };
            (credentialDataBase.findOne as jest.Mock).mockResolvedValue(
                mockCredential,
            );

            const result =
                await credentialRepository.getCredentialByUsernameRepository(
                    'user1',
                );
            expect(result).toEqual(mockCredential);
            expect(credentialDataBase.findOne).toHaveBeenCalledWith({
                where: { username: 'user1' },
                relations: ['user'],
            });
        });
    });

    describe('getCredentialByIdRepository', () => {
        it('debe devolver la credencial por uuid', async () => {
            const mockCredential = { uuid: 'uuid1', username: 'user2' };
            (credentialDataBase.findOne as jest.Mock).mockResolvedValue(
                mockCredential,
            );

            const result =
                await credentialRepository.getCredentialByIdRepository('uuid1');
            expect(result).toEqual(mockCredential);
            expect(credentialDataBase.findOne).toHaveBeenCalledWith({
                where: { uuid: 'uuid1' },
                relations: ['user'],
            });
        });
    });
});
