import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderDto } from "src/orders/dto/create-order.dto";
import { Order } from "src/orders/entities/order.entity";
import { OrderService } from "../orders/order.service";
export declare class UserService {
    private userRepository;
    private orderService;
    constructor(userRepository: Repository<User>, orderService: OrderService);
    findOne(email: string): Promise<User | null>;
    findOneById(id: string): Promise<User | null>;
    createUser(userData: Partial<User>): Promise<User>;
    placeOrder(userId: string, createOrderDto: CreateOrderDto): Promise<Order>;
    trackOrders(userId: string): Promise<Order[]>;
}
