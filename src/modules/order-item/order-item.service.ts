import { Injectable } from '@nestjs/common';
import { OrderItemRepository } from './order-item.repository';

@Injectable()
export class OrderItemService {

    constructor(private readonly orderItemRepository: OrderItemRepository) { }
}
