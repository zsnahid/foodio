import { UserService } from './user.service';
import { CreateOrderDto } from 'src/orders/dto/create-order.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    placeOrder(req: any, createOrderDto: CreateOrderDto): Promise<import("../orders/entities/order.entity").Order>;
    trackOrders(req: any): Promise<import("../orders/entities/order.entity").Order[]>;
}
