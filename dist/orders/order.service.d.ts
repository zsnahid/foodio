import { UpdateOrderStatusDto } from "./dto/update-order-status.dto";
import { Order } from "./entities/order.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UserService } from "src/users/user.service";
import { MenuItemService } from "src/menu-items/menu-item.service";
export declare class OrderService {
    private orderRepository;
    private userService;
    private menuItemService;
    constructor(orderRepository: Repository<Order>, userService: UserService, menuItemService: MenuItemService);
    getOrders(): Promise<Order[]>;
    updateOrderStatus(id: string, updateOrderStatusDto: UpdateOrderStatusDto): Promise<Order>;
    placeOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    trackOrders(userId: string): Promise<Order[]>;
}
