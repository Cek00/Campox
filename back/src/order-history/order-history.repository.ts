import { InjectRepository } from '@nestjs/typeorm';
import { OrderHistoryEntity } from 'src/entities/order-history.entity';
import { Repository } from 'typeorm';


export class OrderHistoryRepository {
  constructor(
    @InjectRepository(OrderHistoryEntity)
    private readonly repo: Repository<OrderHistoryEntity>,
  ) {}

  async createAndSave(data: Partial<OrderHistoryEntity>) {
    const e = this.repo.create(data);
    return this.repo.save(e);
  }

  async findAll() {
    return this.repo.find({ relations: ['order', 'changedBy'] });
  }
  async update(uuid : string, data: Partial<OrderHistoryEntity>) {
  }
  async findById(uuid: string) {
    return this.repo.findOne({ where: { uuid }, relations: ['order', 'changedBy'] });
  }

  async findByOrder(orderUuid: string) {
    return this.repo.find({
      where: { order: { uuid: orderUuid } } as any,
      relations: ['order', 'changedBy'],
      order: { changedAt: 'DESC' },
    });
  }

  async delete(uuid: string) {
    return this.repo.delete({ uuid });
  }
}
