import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserService } from "src/users/user.service";
import { OrderItem } from "./entities/order-item.entity";
import { MenuItemService } from "src/menu-items/menu-item.service";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @Inject(forwardRef(() => UserService))
    private userService: UserService,
    private menuItemService: MenuItemService
  ) {}

  async getOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ["orderItems"] });
  }

  async updateOrderStatus(
    id: string,
    updateOrderStatusDto: UpdateOrderStatusDto
  ): Promise<Order> {
    const order = await this.orderRepository.preload({
      id,
      ...updateOrderStatusDto,
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return this.orderRepository.save(order);
  }

  async placeOrder(
    userId: string,
    createOrderDto: CreateOrderDto
  ): Promise<Order> {
    const user = await this.userService.findOneById(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const menuItem = await this.menuItemService.findOneByName(
      createOrderDto.itemName
    );

    if (!menuItem) {
      throw new NotFoundException(
        `Menu item ${createOrderDto.itemName} not found`
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
      relations: ["orderItems", "orderItems.menuItem"],
      order: { createdAt: "DESC" },
    });
  }
}
