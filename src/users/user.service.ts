import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { Order } from "src/orders/entities/order.entity";
import { OrderService } from "../orders/order.service";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @Inject(forwardRef(() => OrderService))
    private orderService: OrderService
  ) {}

  async findOne(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async findOneById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const user = this.userRepository.create(userData);
    return this.userRepository.save(user);
  }

  async placeOrder(
    userId: string,
    createOrderDto: CreateOrderDto
  ): Promise<Order> {
    return this.orderService.placeOrder(userId, createOrderDto);
  }

  async trackOrders(userId: string): Promise<Order[]> {
    return this.orderService.trackOrders(userId);
  }
}
