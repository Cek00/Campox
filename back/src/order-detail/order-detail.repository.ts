import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetailEntity } from 'src/entities/order-detail.entity';
import { Repository } from 'typeorm';


export class OrderDetailRepository {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly repo: Repository<OrderDetailEntity>,
  ) {}

  async createAndSave(orderDetail: Partial<OrderDetailEntity>) {
    const entity = this.repo.create(orderDetail);
    return this.repo.save(entity);
  }

  async findAll() {
    return this.repo.find({ relations: ['order', 'product'] });
  }

  async findById(uuid: string) {
    return this.repo.findOne({ where: { uuid }, relations: ['order', 'product'] });
  }

  async findByOrder(orderUuid: string) {
    return this.repo.find({
      where: { order: { uuid: orderUuid } } as any,
      relations: ['order', 'product'],
    });
  }

  async update(uuid: string, patch: Partial<OrderDetailEntity>) {
    await this.repo.update({ uuid }, patch);
    return this.findById(uuid);
  }

  async delete(uuid: string) {
    return this.repo.delete({ uuid });
  }
}
