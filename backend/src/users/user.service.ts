import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
import { Order } from 'src/orders/entities/order.entity';
import { OrderItem } from 'src/orders/entities/order-item.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(MenuItem) private menuRepository: Repository<MenuItem>,
    @InjectRepository(Order) private orderRepository: Repository<Order>,
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async placeOrder(
    userId: string,
    createOrderDto: CreateOrderDto,
  ): Promise<Order> {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const menuItem = await this.menuRepository.findOneBy({
      name: createOrderDto.itemName,
    });

    if (!menuItem) {
      throw new NotFoundException(
        `Menu item ${createOrderDto.itemName} not found`,
      );
    }

    // Validate item availability
    if (menuItem?.isAvailable === false) {
      throw new Error(`${menuItem.name} is not available`);
    }

    const orderItem = new OrderItem();
    orderItem.menuItem = menuItem;
    orderItem.unitPrice = menuItem.price;
    orderItem.quantity = createOrderDto.quantity;

    const order = new Order();
    order.user = user;
    order.orderItems = [orderItem];
    order.totalPrice = orderItem.unitPrice * orderItem.quantity;

    return this.orderRepository.save(order);
  }

  async trackOrders(userId: string): Promise<Order[]> {
    return this.orderRepository.find({
      where: { user: { id: userId } },
      relations: ['orderItems', 'orderItems.menuItem'],
      order: { createdAt: 'DESC' },
    });
  }
}
