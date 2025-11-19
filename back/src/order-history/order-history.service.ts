import { Injectable, NotFoundException } from '@nestjs/common';
import { OrderHistoryRepository } from './order-history.repository';
import { CreateOrderHistoryDto } from './dto/create-order-history.dto';
import { UpdateOrderHistoryDto } from './dto/update-order-history.dto';

@Injectable()
export class OrderHistoryService {
  constructor(private readonly repo: OrderHistoryRepository) {}

  async create(dto: CreateOrderHistoryDto) {
    const toSave: Partial<any> = {
      status: dto.status,
      note: dto.note,
      order: { uuid: dto.orderUuid },
      changedBy: dto.changedByUuid ? { uuid: dto.changedByUuid } : undefined,
    };
    return this.repo.createAndSave(toSave);
  }

  findAll() {
    return this.repo.findAll();
  }

  async findOne(uuid: string) {
    const found = await this.repo.findById(uuid);
    if (!found) throw new NotFoundException('OrderHistory no existe');
    return found;
  }

  async findByOrder(orderUuid: string) {
    return this.repo.findByOrder(orderUuid);
  }

  async remove(uuid: string) {
    const found = await this.repo.findById(uuid);
    if (!found) throw new NotFoundException('OrderHistory no existe');
    await this.repo.delete(uuid);
    return { deleted: true };
  }

  async update(uuid: string, dto: UpdateOrderHistoryDto) {
    const found = await this.repo.findById(uuid);
    if (!found) throw new NotFoundException('OrderHistory no existe');
    // normalmente solo se añade un nuevo registro de historial; actualizarlo es permitido aquí:
    await this.repo.update(uuid , dto as any);
    return this.repo.findById(uuid);
  }
}
